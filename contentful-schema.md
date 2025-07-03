# Esquema Contentful - Proyecto Vira (Simplificado)
*Content Types mínimos para manejo de assets*

## 📋 Resumen del Esquema

### Content Types (Solo 4)
1. **Landing Assets** - Assets principales de la landing
2. **Hero Images** - Imágenes del hero
3. **Gallery Images** - Imágenes de la galería  
4. **Documents** - PDFs del proyecto

---

## 🏗️ Content Types Detallados

### 1. Landing Assets (landingAssets)
**Descripción**: Entry único que contiene todos los assets de la landing

| Campo | Tipo | Validaciones | Descripción |
|-------|------|-------------|-------------|
| `name` | Short text | Required, Default: "Vira Landing Assets" | Identificador |
| `hero_left_image` | Media | Required, Image, min 1920x1080 | Imagen izquierda del hero |
| `hero_right_image` | Media | Required, Image, min 1920x1080 | Imagen derecha del hero |
| `lifestyle_images` | Media (Multiple) | Image, min 1200x800, max 10 items | Imágenes lifestyle section |
| `gallery_images` | Media (Multiple) | Image, min 1200x800, max 20 items | Imágenes de galería |
| `brochure_pdf` | Media | Required, PDF, max 20MB | Brochure principal |
| `typologies_pdf` | Media | Required, PDF, max 20MB | Planos de tipologías |

---

### 2. Hero Images (heroImages) 
**Descripción**: Imágenes específicas del hero (alternativa modular)

| Campo | Tipo | Validaciones | Descripción |
|-------|------|-------------|-------------|
| `left_image` | Media | Required, Image, min 1920x1080 | Imagen izquierda |
| `right_image` | Media | Required, Image, min 1920x1080 | Imagen derecha |
| `left_alt_text` | Short text | Required, max 100 chars | Alt text imagen izquierda |
| `right_alt_text` | Short text | Required, max 100 chars | Alt text imagen derecha |

---

### 3. Gallery Images (galleryImages)
**Descripción**: Colección de imágenes para la galería

| Campo | Tipo | Validaciones | Descripción |
|-------|------|-------------|-------------|
| `name` | Short text | Required, max 100 chars | Nombre descriptivo |
| `images` | Media (Multiple) | Required, Image, min 1200x800, max 20 items | Imágenes de la galería |
| `order` | Integer | Min 0, Max 100, Default 1 | Orden de visualización |

---

### 4. Documents (documents)
**Descripción**: PDFs del proyecto

| Campo | Tipo | Validaciones | Descripción |
|-------|------|-------------|-------------|
| `name` | Short text | Required, max 100 chars | Nombre del documento |
| `file` | Media | Required, PDF, max 20MB | Archivo PDF |
| `type` | Short text | Enum: Brochure, Tipologías | Tipo de documento |

---

## 💡 Recomendación de Implementación

### Opción 1: Todo en un Entry (Más Simple)
Usar solo **Landing Assets** con todos los assets en un entry único.

### Opción 2: Modular (Más Flexible)
Usar los 4 content types por separado para mayor organización.

---

## 📁 Assets a Subir

### Imágenes Hero
- `2_interior.jpg` (1920x1080 mín.)
- `2_pileta.jpg` (1920x1080 mín.)

### Imágenes Lifestyle
- Cualquier imagen que tengas para esta sección
- Mín. 1200x800px

### Imágenes Galería
- `1_fachada.jpg`, `1_fachada2.jpg`, `1_fachada3.jpg`, `1_fachada4.jpg`
- `1_a_patio.jpg`
- `2_gym.jpg`, `2_parrilla.jpg`
- `3C_FORMA_TRIUNVIRATO_PILETA_CAM02_01_B.jpg`
- `PHOTO-2025-06-03-11-21-21 3.jpg` (hasta 7.jpg)

### PDFs
- `brochure_vira.pdf`
- `tipologias.pdf`

---

## 🚀 Pasos de Configuración

1. **Crear Content Types** en Contentful
2. **Subir Assets** organizados
3. **Crear Entry/Entries** con los assets
4. **Configurar API** en Next.js
5. **Conectar componentes** con Contentful

---

## 🔌 Integración con Next.js

```typescript
// Ejemplo de uso en tu componente
const { heroLeftImage, heroRightImage } = await contentfulClient.getEntry('landingAssets')

// En HeroSection.tsx
<Image src={heroLeftImage.fields.file.url} ... />
<Image src={heroRightImage.fields.file.url} ... />
```

---

*Esquema minimalista - Solo assets editables desde Contentful* 