'use client'

import { useEffect, useState } from 'react'
import type { ContentfulAssets } from '@/lib/contentful-client'

interface ContentfulDebuggerProps {
  contentfulAssets: ContentfulAssets | null
  isServerSide?: boolean
}

export function ContentfulDebugger({ contentfulAssets, isServerSide = false }: ContentfulDebuggerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Mostrar debugger solo en desarrollo o si se presiona Ctrl+Shift+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development' || !mounted) {
    return null
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg"
        >
          Debug Contentful
        </button>
      </div>
    )
  }

  const hasContentfulData = !!contentfulAssets
  const heroImages = contentfulAssets?.heroImages
  const galleryImages = contentfulAssets?.galleryImages
  const lifestyleImages = contentfulAssets?.lifestyleImages
  const documents = contentfulAssets?.documents

  return (
    <div className="fixed inset-4 bg-black/90 text-white p-6 rounded-lg z-50 overflow-auto font-mono text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🔍 Contentful Debugger</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Cerrar
        </button>
      </div>

      <div className="space-y-4">
        {/* Estado General */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">📊 Estado General</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>Renderizado:</div>
            <div className={isServerSide ? 'text-green-400' : 'text-yellow-400'}>
              {isServerSide ? 'Server-Side' : 'Client-Side'}
            </div>
            <div>Datos Contentful:</div>
            <div className={hasContentfulData ? 'text-green-400' : 'text-red-400'}>
              {hasContentfulData ? '✅ Disponibles' : '❌ No disponibles'}
            </div>
          </div>
        </div>

        {/* Hero Images */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">🖼️ Hero Images</h3>
          {heroImages ? (
            <div className="space-y-2">
              <div>
                <span className="text-green-400">✅ Left:</span>
                <div className="text-xs break-all mt-1">
                  {heroImages.left || '❌ Vacío'}
                </div>
              </div>
              <div>
                <span className="text-green-400">✅ Right:</span>
                <div className="text-xs break-all mt-1">
                  {heroImages.right || '❌ Vacío'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400">❌ Usando fallbacks</div>
          )}
        </div>

        {/* Gallery Images */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">📸 Gallery Images</h3>
          {galleryImages && galleryImages.length > 0 ? (
            <div>
              <div className="text-green-400 mb-2">
                ✅ {galleryImages.length} imágenes de Contentful
              </div>
              <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
                {galleryImages.map((url, i) => (
                  <div key={i} className="break-all">
                    {i + 1}. {url}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-red-400">❌ Usando fallbacks (5 imágenes)</div>
          )}
        </div>

        {/* Lifestyle Images */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">🏠 Lifestyle Images</h3>
          {lifestyleImages && lifestyleImages.length > 0 ? (
            <div>
              <div className="text-green-400 mb-2">
                ✅ {lifestyleImages.length} imágenes de Contentful
              </div>
              <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
                {lifestyleImages.map((url, i) => (
                  <div key={i} className="break-all">
                    {i + 1}. {url}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-red-400">❌ Usando fallbacks</div>
          )}
        </div>

        {/* Documents */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">📄 Documents</h3>
          {documents ? (
            <div className="space-y-2">
              <div>
                <span className="text-green-400">✅ Brochure:</span>
                <div className="text-xs break-all mt-1">
                  {documents.brochure || '❌ Vacío'}
                </div>
              </div>
              <div>
                <span className="text-green-400">✅ Typologies:</span>
                <div className="text-xs break-all mt-1">
                  {documents.typologies || '❌ Vacío'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400">❌ Usando fallbacks</div>
          )}
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-900 p-4 rounded">
          <h3 className="font-bold mb-2">💡 Instrucciones</h3>
          <ul className="text-xs space-y-1">
            <li>• Presiona <kbd className="bg-gray-700 px-1 rounded">Ctrl+Shift+D</kbd> para mostrar/ocultar</li>
            <li>• <span className="text-green-400">Verde</span> = Datos de Contentful</li>
            <li>• <span className="text-red-400">Rojo</span> = Usando fallbacks</li>
            <li>• <span className="text-yellow-400">Amarillo</span> = Client-side rendering</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 