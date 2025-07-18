"use client"

import Image from "next/image"
import React, { useRef, useState, useEffect } from "react"
import type { ContentfulAssets } from "@/lib/contentful-client"

// Fallback images para cuando no hay datos de Contentful
const fallbackImages = [
  {
    src: "/images/gallery/1_a_patio.jpg",
    alt: "Patio interno y espacios comunes"
  },
  {
    src: "/images/gallery/1_fachada.jpg",
    alt: "Fachada principal y acceso al edificio"
  },
  {
    src: "/images/gallery/1_fachada2.jpg",
    alt: "Vista de la fachada sobre Av. Triunvirato"
  },
  {
    src: "/images/gallery/1_fachada3.jpg",
    alt: "Vista de la fachada sobre calle Los Incas"
  },
  {
    src: "/images/gallery/1_fachada4.jpg",
    alt: "Hall de entrada principal"
  }
]

interface LifestyleSectionProps {
  contentfulAssets: ContentfulAssets | null
}

// Componente para las flechas
const ChevronLeft = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function LifestyleSection({ contentfulAssets }: LifestyleSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  // Usar imágenes de lifestyle de Contentful o fallback
  const images = contentfulAssets?.lifestyleImages?.length 
    ? contentfulAssets.lifestyleImages.map((imageUrl, index) => ({
        src: imageUrl,
        alt: fallbackImages[index]?.alt || `Lifestyle image ${index + 1}`
      }))
    : fallbackImages

  // Debug: Mostrar qué imágenes se están usando
  useEffect(() => {
    if (contentfulAssets?.lifestyleImages?.length) {
      console.log('🏠 Lifestyle usando Contentful images:', contentfulAssets.lifestyleImages.length, 'imágenes')
    } else {
      console.log('🏠 Lifestyle usando fallback images:', fallbackImages.length, 'imágenes')
    }
  }, [contentfulAssets])

  // Función para verificar la posición del scroll
  const checkScrollPosition = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement
      
      // Mostrar botón izquierdo si no estamos al inicio (con más margen)
      const isAtStart = scrollLeft <= 5
      setShowLeftButton(!isAtStart)
      
      // Mostrar botón derecho si no estamos al final (con más margen)
      const isAtEnd = scrollLeft >= (scrollWidth - clientWidth - 5)
      setShowRightButton(!isAtEnd)
    }
  }

  // Configurar el listener del scroll
  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      // Usar passive listener para mejor performance
      scrollElement.addEventListener('scroll', checkScrollPosition, { passive: true })
      
      // Verificar posición inicial después de que el componente se monte
      const timer = setTimeout(checkScrollPosition, 100)
      
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollPosition)
        clearTimeout(timer)
      }
    }
  }, [])

  // También verificar cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollPosition, 100)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollLeft = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const scrollAmount = scrollElement.offsetWidth * 0.8
      scrollElement.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const scrollAmount = scrollElement.offsetWidth * 0.8
      scrollElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section
      id="lifestyle"
      className="bg-[#f5f4f2] py-20"
    >
      {/* Full width gallery with navigation buttons */}
      <div className="relative px-6 md:px-16 mb-10 overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className={`absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
          }`}
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-black transition-colors duration-200" />
        </button>
        
        <button
          onClick={scrollRight}
          className={`absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            showRightButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-black transition-colors duration-200" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 md:-mx-16 px-6 md:px-16"
          tabIndex={0}
          aria-label="Galería de imágenes estilo de vida"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="min-w-[70vw] md:min-w-[600px] max-w-[90vw] md:max-w-[700px] h-[340px] md:h-[420px] rounded-2xl overflow-hidden snap-center flex-shrink-0 relative"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover w-full h-full rounded-2xl"
                sizes="(max-width: 768px) 90vw, 700px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Row */}
      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Headline */}
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-black">
              URBANO Y ACCESIBLE, <br />
              FAMILIAR Y PROFESIONAL <br />
              EN UNA UBICACIÓN QUE <br />
              CUBRE TODAS LAS <br />
              NECESIDADES.
            </h2>
          </div>
          {/* List */}
          <div className="flex flex-col items-start gap-6 mt-8 md:mt-0">
            <div className="flex flex-col items-start">
              <div className="text-xl md:text-2xl font-normal tracking-tight">VIVIENDA</div>
              <div className="text-xl md:text-2xl font-normal tracking-tight relative">
                MULTIFAMILIAR
                <div className="absolute bottom-0 left-0 w-[115%] border-b border-black"></div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-xl md:text-2xl font-normal tracking-tight">APTO</div>
              <div className="text-xl md:text-2xl font-normal tracking-tight relative" style={{ minWidth: '11.5ch' }}>
                PROFESIONAL
                <div className="absolute bottom-0 left-0 w-[115%] border-b border-black"></div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-xl md:text-2xl font-normal tracking-tight">LOCALES</div>
              <div className="text-xl md:text-2xl font-normal tracking-tight">
                COMERCIALES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}