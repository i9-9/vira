import { createClient } from 'contentful'

interface ContentfulAsset {
  fields: {
    file: {
      url: string
      details: {
        image: {
          width: number
          height: number
        }
      }
    }
    title?: string
    description?: string
  }
}

interface LandingAssetsFields {
  name: string
  heroLeftImage: ContentfulAsset
  heroRightImage: ContentfulAsset
  lifestyleImages?: ContentfulAsset[]
  galleryImages?: ContentfulAsset[]
  brochurePdf: ContentfulAsset
  typologiesPdf: ContentfulAsset
}

// Solo crear el cliente en el servidor
export const contentfulClient = (() => {
  if (typeof window !== 'undefined') {
    // Estamos en el navegador, retornar null
    return null
  }
  
  const spaceId = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  
  if (!spaceId || !accessToken) {
    console.error('❌ Variables de entorno de Contentful no configuradas')
    return null
  }
  
  return createClient({
    space: spaceId,
    accessToken: accessToken,
  })
})()

export const getLandingAssets = async (): Promise<LandingAssetsFields | null> => {
  try {
    // Verificar que el cliente existe (solo en servidor)
    if (!contentfulClient) {
      console.warn('⚠️ Cliente de Contentful no disponible')
      return null
    }
    
    const response = await contentfulClient.getEntries({
      content_type: 'landingAssets',
      limit: 1
    })
    
    const entry = response.items[0]
    if (!entry?.fields) return null
    
    return entry.fields as unknown as LandingAssetsFields
  } catch (error) {
    console.error('Error fetching from Contentful:', error)
    return null
  }
}

// Helper function para generar URLs optimizadas con fallback
export function getOptimizedImageUrl(
  asset: ContentfulAsset | undefined, 
  params: string = 'fm=webp&q=90',
  fallback: string = '/images/placeholder.jpg'
): string {
  if (!asset?.fields?.file?.url) {
    return fallback
  }
  
  return `https:${asset.fields.file.url}?${params}`
}

export type { ContentfulAsset, LandingAssetsFields } 