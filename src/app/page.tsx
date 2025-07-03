'use client'

import { useEffect } from 'react'
import { Header } from "@/components/Header"
import { HeroSection, HeroTextBlock } from "@/components/HeroSection"
import { LocationSection } from "@/components/LocationSection"
import { LifestyleSection } from "@/components/LifestyleSection"
import { AmenitiesSection } from "@/components/AmenitiesSection"
import { GallerySection } from "@/components/GallerySection"
import { TypologiesSection } from "@/components/TypologiesSection"
import { ContactForm } from "@/components/ContactForm"
import { Footer } from "@/components/Footer"
import { useContentfulAssets } from "@/hooks/useContentfulAssets"

export default function Home() {
  // Cargar datos de Contentful desde client-side
  const { assets: contentfulAssets, loading, forceReload } = useContentfulAssets()

  // Exponer función de recarga manual en la consola para debugging (solo desarrollo)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // @ts-expect-error - Agregando función global para debugging
      window.reloadContentful = forceReload
      console.log('🔧 Debug: Usa window.reloadContentful() para forzar recarga de imágenes')
    }
  }, [forceReload])

  // Loading state opcional - las imágenes fallback se muestran mientras carga
  if (loading) {
    console.log('🔄 Cargando assets de Contentful...')
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection contentfulAssets={contentfulAssets} />
      <HeroTextBlock />
      <LocationSection />
      <LifestyleSection contentfulAssets={contentfulAssets} />
      <AmenitiesSection />
      <GallerySection contentfulAssets={contentfulAssets} />
      <TypologiesSection />
      <ContactForm />
      <Footer />
    </main>
  )
}
