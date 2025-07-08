# Guía de Deploy - Vira Landing

Este proyecto está configurado para funcionar tanto en **static export** como en **Vercel con ISR**. Aquí te explico las diferencias y cómo configurar cada uno.

## 🚀 Deploy en Vercel (Recomendado)

### Ventajas
- **ISR (Incremental Static Regeneration)**: Las páginas se regeneran automáticamente cada 5 minutos
- **Mejor Performance**: Los assets de Contentful se cargan server-side
- **SEO Optimizado**: Los datos están disponibles en el HTML inicial
- **Funcionalidad Completa**: Aprovecha todas las features de Next.js 15

### Configuración

1. **Variables de Entorno en Vercel**:
   ```bash
   CONTENTFUL_SPACE_ID=tu_space_id
   CONTENTFUL_ACCESS_TOKEN=tu_access_token
   ```

2. **Deploy Automático**:
   - Conecta tu repo a Vercel
   - El proyecto se detectará automáticamente como Next.js
   - Usará `npm run build:vercel` por defecto

3. **ISR Configurado**:
   - Revalidación cada 5 minutos (`revalidate = 300`)
   - Los cambios en Contentful se reflejan automáticamente
   - No necesita polling client-side

### Comandos
```bash
# Desarrollo local (simula Vercel)
npm run dev

# Build para Vercel
npm run build:vercel

# Deploy
vercel --prod
```

## 📦 Static Export (Alternativa)

### Cuándo Usar
- Hosting en servicios que no soportan SSR/ISR
- CDN estático (Netlify, GitHub Pages, etc.)
- Necesitas archivos estáticos

### Ventajas
- **Portabilidad**: Funciona en cualquier hosting
- **Simplicidad**: Solo archivos estáticos
- **Costo**: Generalmente más barato

### Desventajas
- **Polling Client-side**: Necesita recargar cada 5 minutos
- **Performance**: Los assets se cargan después del HTML
- **SEO Limitado**: Los datos no están en el HTML inicial

### Configuración

1. **Variables de Entorno**:
   ```bash
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token
   ```

2. **Build**:
   ```bash
   npm run build:static
   ```

3. **Deploy**:
   - Sube la carpeta `out/` a tu hosting
   - Configura tu servidor para servir archivos estáticos

## 🔧 Diferencias Técnicas

### Vercel (ISR)
```typescript
// Server Component - datos cargados server-side
export default async function Home() {
  const serverAssets = await getLandingAssets()
  const contentfulAssets = convertToContentfulAssets(serverAssets)
  
  return <HeroSection contentfulAssets={contentfulAssets} />
}
```

### Static Export
```typescript
// Client Component - datos cargados client-side
'use client'
export default function Home() {
  const { assets } = useContentfulAssets()
  
  return <HeroSection contentfulAssets={assets} />
}
```

## 📊 Comparación de Performance

| Métrica | Vercel (ISR) | Static Export |
|---------|--------------|---------------|
| **First Contentful Paint** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Actualización de Contenido** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Costo** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Simplicidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🛠️ Troubleshooting

### Vercel
- **Error de build**: Verifica las variables de entorno
- **ISR no funciona**: Asegúrate de que `revalidate` esté configurado
- **Timeout**: Aumenta `maxDuration` en `vercel.json`

### Static Export
- **Assets no cargan**: Verifica las credenciales públicas
- **Polling no funciona**: Revisa la consola del navegador
- **Build falla**: Usa `npm run build:static`

## 🔄 Migración

### De Static Export a Vercel
1. Cambia las variables de entorno de `NEXT_PUBLIC_*` a privadas
2. Usa `npm run build:vercel` en lugar de `build:static`
3. Deploy en Vercel

### De Vercel a Static Export
1. Cambia las variables de entorno a `NEXT_PUBLIC_*`
2. Usa `npm run build:static`
3. Deploy la carpeta `out/`

## 📝 Notas Importantes

- **Credenciales**: En Vercel usa credenciales privadas, en static export usa públicas
- **Polling**: Solo funciona en static export, Vercel usa ISR automático
- **Performance**: Vercel es significativamente más rápido para el usuario final
- **Costo**: Static export es más barato pero con limitaciones

## 🎯 Recomendación

**Usa Vercel** si:
- Quieres la mejor performance
- Necesitas SEO optimizado
- Tu presupuesto lo permite
- Quieres actualizaciones automáticas

**Usa Static Export** si:
- Tu hosting no soporta SSR
- Necesitas máxima portabilidad
- El presupuesto es muy limitado
- No necesitas actualizaciones frecuentes 