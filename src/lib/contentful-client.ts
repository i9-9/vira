import { createClient } from 'contentful'

// Cliente para browser (público) - solo se crea en el cliente
const getClient = () => {
  if (typeof window === 'undefined') {
    return null // No crear cliente en server-side
  }
  
  // Credenciales hardcodeadas para build estático
  // En producción estas son seguras porque es solo lectura (Delivery API)
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'qokdi46uzfed'
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || 'Tbuc0hWocwWlNQqzWxYoYmCJKUj5De5x868qrbYR4-E'
  
  if (!spaceId || !accessToken) {
    console.warn('⚠️ Credenciales de Contentful no disponibles')
    return null
  }
  
  return createClient({
    space: spaceId,
    accessToken: accessToken,
  })
}

export interface ContentfulAssets {
  heroImages: {
    left: string
    right: string
  }
  galleryImages: string[]
  lifestyleImages: string[]
  documents: {
    brochure: string
    typologies: string
  }
}

export async function getLandingAssetsClient(): Promise<ContentfulAssets | null> {
  try {
    const client = getClient()
    if (!client) {
      console.warn('⚠️ Contentful client not available (server-side)')
      return null
    }

    const entries = await client.getEntries({
      content_type: 'landingAssets',
      limit: 1,
    })

    if (entries.items.length === 0) {
      console.warn('⚠️ No landing assets found in Contentful')
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = entries.items[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fields = entry.fields as any

    // Procesar imágenes hero
    const heroImages = {
      left: fields.heroImageLeft?.fields?.file?.url 
        ? `https:${fields.heroImageLeft.fields.file.url}?fm=webp&q=90&w=1920&h=1080&fit=fill`
        : '',
      right: fields.heroImageRight?.fields?.file?.url 
        ? `https:${fields.heroImageRight.fields.file.url}?fm=webp&q=90&w=1920&h=1080&fit=fill`
        : '',
    }

    // Debug: Solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Raw galleryImages from Contentful:', fields.galleryImages?.length || 0, 'items')
      console.log('🔍 Raw lifestyleImages from Contentful:', fields.lifestyleImages?.length || 0, 'items')
    }

    // Procesar imágenes gallery
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const galleryImages = fields.galleryImages?.map((img: any) => 
      img.fields?.file?.url 
        ? `https:${img.fields.file.url}?fm=webp&q=90&w=1200&h=800&fit=fill`
        : ''
    ).filter(Boolean) || []

    // Procesar imágenes lifestyle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lifestyleImages = fields.lifestyleImages?.map((img: any) => 
      img.fields?.file?.url 
        ? `https:${img.fields.file.url}?fm=webp&q=85&w=800&h=600&fit=fill`
        : ''
    ).filter(Boolean) || []

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Processed galleryImages:', galleryImages.length, 'items')
      console.log('✅ Processed lifestyleImages:', lifestyleImages.length, 'items')
    }

    // Procesar documentos
    const documents = {
      brochure: fields.brochure?.fields?.file?.url 
        ? `https:${fields.brochure.fields.file.url}`
        : '',
      typologies: fields.typologies?.fields?.file?.url 
        ? `https:${fields.typologies.fields.file.url}`
        : '',
    }

    console.log('✅ Contentful assets cargados desde client-side')
    
    return {
      heroImages,
      galleryImages,
      lifestyleImages,
      documents,
    }

  } catch (error) {
    console.error('❌ Error fetching Contentful assets:', error)
    return null
  }
} 