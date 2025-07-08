# 🔍 Verificación de Assets de Contentful

Esta guía te ayudará a **asegurarte** de que todos los assets (imágenes + PDFs) están siendo traídos de Contentful y no son los fallbacks.

## 🚀 Verificación Rápida

### 1. Script Automático
```bash
# Ejecutar verificación completa
npm run verify:contentful
```

Este script verificará:
- ✅ Conexión con Contentful
- ✅ Variables de entorno
- ✅ Content type "landingAssets"
- ✅ Todos los campos configurados
- ✅ URLs de los assets

### 2. Debugger Visual
```bash
# Ejecutar el proyecto
npm run dev
```

Luego:
1. Abre el navegador
2. Presiona `Ctrl+Shift+D` (o `Cmd+Shift+D` en Mac)
3. Revisa el panel de debug

**Verde** = Datos de Contentful ✅  
**Rojo** = Usando fallbacks ❌

## 🔧 Verificación Manual

### Paso 1: Variables de Entorno

**Para Vercel (Recomendado):**
```bash
CONTENTFUL_SPACE_ID=tu_space_id
CONTENTFUL_ACCESS_TOKEN=tu_access_token
```

**Para Static Export:**
```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token
```

### Paso 2: Verificar en el Código

#### En Vercel (Server-Side)
```typescript
// src/app/page.tsx
export default async function Home() {
  const serverAssets = await getLandingAssets() // ← Se ejecuta en servidor
  const contentfulAssets = serverAssets ? convertToContentfulAssets(serverAssets) : null
  
  // Si contentfulAssets existe, los assets vienen de Contentful
  return <HeroSection contentfulAssets={contentfulAssets} />
}
```

#### En Static Export (Client-Side)
```typescript
// src/components/ClientContentfulProvider.tsx
const { assets: contentfulAssets } = useContentfulAssets() // ← Se ejecuta en cliente

// Si contentfulAssets existe, los assets vienen de Contentful
return <HeroSection contentfulAssets={contentfulAssets} />
```

### Paso 3: Verificar en el Navegador

1. **Inspeccionar Elementos**:
   - Click derecho en una imagen
   - "Inspeccionar elemento"
   - Verificar que el `src` contenga `images.ctfassets.net`

2. **Console Logs**:
   ```javascript
   // En la consola del navegador deberías ver:
   ✅ Contentful assets cargados inicialmente
   📊 Assets cargados: { heroImages: 2, galleryImages: 5, lifestyleImages: 3 }
   ```

3. **Network Tab**:
   - Abrir DevTools → Network
   - Recargar la página
   - Buscar requests a `images.ctfassets.net`

## 📊 Indicadores de Éxito

### ✅ Assets de Contentful
- URLs contienen `images.ctfassets.net` o `assets.ctfassets.net`
- Parámetros de optimización: `?fm=webp&q=90&w=1920&h=1080&fit=fill`
- Console logs muestran "Contentful assets cargados"
- Debugger muestra verde en todos los campos

### ❌ Fallbacks
- URLs contienen `/images/hero/` o `/images/gallery/`
- Console logs muestran "usando fallbacks"
- Debugger muestra rojo en los campos
- Network tab no muestra requests a Contentful

## 🛠️ Troubleshooting

### Error: "Variables de entorno no configuradas"
```bash
# Verificar que las variables estén definidas
echo $CONTENTFUL_SPACE_ID
echo $CONTENTFUL_ACCESS_TOKEN
```

### Error: "No se encontraron landing assets"
1. Verificar que existe el content type `landingAssets`
2. Verificar que hay al menos una entrada
3. Verificar que los campos están configurados

### Error: "401 Unauthorized"
- Verificar que el access token sea correcto
- Verificar que tenga permisos de lectura

### Error: "404 Not Found"
- Verificar que el space ID sea correcto
- Verificar que el content type exista

## 🔄 Verificación Continua

### En Desarrollo
```bash
# Cada vez que hagas cambios
npm run verify:contentful
npm run dev
# Presiona Ctrl+Shift+D para verificar visualmente
```

### En Producción (Vercel)
1. Deploy automático
2. Verificar logs en Vercel Dashboard
3. Usar el debugger en producción (solo desarrollo)

### En Producción (Static Export)
1. Build: `npm run build:static`
2. Verificar que los assets se cargan correctamente
3. Monitorear polling cada 5 minutos

## 📝 Checklist de Verificación

- [ ] Variables de entorno configuradas
- [ ] Script `npm run verify:contentful` pasa sin errores
- [ ] Debugger muestra verde en todos los campos
- [ ] URLs de imágenes contienen `ctfassets.net`
- [ ] Console logs muestran "Contentful assets cargados"
- [ ] Network tab muestra requests a Contentful
- [ ] No hay errores 401/404 en la consola
- [ ] Las imágenes se cargan correctamente
- [ ] Los PDFs se descargan correctamente

## 🎯 Resultado Esperado

Cuando todo funciona correctamente:

1. **Vercel**: Los assets se cargan server-side y están en el HTML inicial
2. **Static Export**: Los assets se cargan client-side después del HTML
3. **Ambos**: Las URLs apuntan a Contentful, no a fallbacks locales

**¡Los assets están siendo traídos de Contentful!** 🎉 