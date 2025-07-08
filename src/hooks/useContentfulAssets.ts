'use client'

import { useState, useEffect, useCallback } from 'react'
import { ContentfulAssets, getLandingAssetsClient } from '@/lib/contentful-client'

interface UseContentfulAssetsResult {
  assets: ContentfulAssets | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  forceReload: () => void
}

export function useContentfulAssets(): UseContentfulAssetsResult {
  const [assets, setAssets] = useState<ContentfulAssets | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadAssets = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true)
      setError(null)
      
      const contentfulAssets = await getLandingAssetsClient()
      
      if (contentfulAssets) {
        setAssets(contentfulAssets)
        setLastUpdated(new Date())
        
        if (isInitial) {
          console.log('✅ Contentful assets cargados inicialmente')
          console.log('📊 Assets cargados:', {
            heroImages: Object.keys(contentfulAssets.heroImages).length,
            galleryImages: contentfulAssets.galleryImages?.length || 0,
            lifestyleImages: contentfulAssets.lifestyleImages?.length || 0
          })
        } else {
          console.log('🔄 Contenido actualizado desde Contentful:', new Date().toLocaleTimeString())
        }
      } else if (isInitial) {
        console.warn('⚠️ No se pudieron cargar assets de Contentful, usando fallbacks')
      }
      
    } catch (err) {
      console.error('❌ Error cargando Contentful assets:', err)
      if (isInitial) {
        setError('Error cargando imágenes del CMS')
      }
    } finally {
      if (isInitial) setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    
    // Carga inicial
    loadAssets(true)

    // Polling solo en static export o desarrollo
    // En Vercel con ISR, no necesitamos polling porque se regenera automáticamente
    const isStaticExport = process.env.STATIC_EXPORT === 'true'
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    if (isStaticExport || isDevelopment) {
      const pollInterval = setInterval(() => {
        if (mounted) {
          loadAssets(false)
        }
      }, 5 * 60 * 1000) // 5 minutos

      console.log('🔄 Polling automático configurado cada 5 minutos')

      // Cleanup
      return () => {
        mounted = false
        clearInterval(pollInterval)
      }
    } else {
      console.log('🚀 Modo Vercel detectado - sin polling (ISR automático)')
      return () => {
        mounted = false
      }
    }
  }, [loadAssets])

  const forceReload = useCallback(() => {
    console.log('🔄 Forzando recarga manual de Contentful...')
    loadAssets(true)
  }, [loadAssets])

  return { assets, loading, error, lastUpdated, forceReload }
} 