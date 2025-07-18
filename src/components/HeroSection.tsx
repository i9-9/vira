"use client"

import Image from "next/image"
import type { ContentfulAssets } from "@/lib/contentful-client"

interface HeroSectionProps {
  contentfulAssets: ContentfulAssets | null
}

export function HeroSection({ contentfulAssets }: HeroSectionProps) {
  // Debug: verificar qué imágenes se están usando
  console.log('🖼️ HeroSection - URLs de imágenes:')
  console.log('   Left:', contentfulAssets?.heroImages?.left ? '✅ Contentful' : '❌ Fallback')
  console.log('   Right:', contentfulAssets?.heroImages?.right ? '✅ Contentful' : '❌ Fallback')
  
  return (
    <section
      id="inicio"
      className="w-full bg-[#c0b8ab]"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Imagen izquierda */}
        <div className="flex-1 min-h-[240px] h-full relative">
          <Image
            src={contentfulAssets?.heroImages?.left || '/images/hero/2_interior.jpg'}
            alt="Interior de unidad funcional"
            fill
            className="object-cover"
            priority
            draggable={false}
          />
        </div>
        {/* Imagen derecha */}
        <div className="flex-1 min-h-[240px] h-full relative overflow-hidden">
          <Image
            src={contentfulAssets?.heroImages?.right || '/images/hero/2_pileta.jpg'}
            alt="Vista de la pileta y espacios comunes"
            fill
            className="object-cover object-[0%_100%]"
            priority
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}

export function HeroTextBlock() {
  return (
    <section className="w-full bg-[#c0b8ab] px-0 py-8">
      <h1
        className="text-3xl md:text-6xl font-light text-white uppercase leading-[1.1] md:leading-[1.1] tracking-tight text-left px-6 md:px-16"
        style={{ fontFamily: 'Beatrice, Arial, sans-serif', fontWeight: 300 }}
      >
        QUE TU VIDA VIRE<br />A LA COMODIDAD<br />QUE NECESITÁS
      </h1>
    </section>
  )
} 