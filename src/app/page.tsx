import { Suspense } from 'react'
import { Header } from "@/components/Header"
import { HeroSection, HeroTextBlock } from "@/components/HeroSection"
import { LocationSection } from "@/components/LocationSection"
import { LifestyleSection } from "@/components/LifestyleSection"
import { AmenitiesSection } from "@/components/AmenitiesSection"
import { GallerySection } from "@/components/GallerySection"
import { TypologiesSection } from "@/components/TypologiesSection"
import { ContactForm } from "@/components/ContactForm"
import { Footer } from "@/components/Footer"
import { getLandingAssets, convertToContentfulAssets } from "@/lib/contentful"
import { ClientContentfulProvider } from "@/components/ClientContentfulProvider"

// Configuración de ISR para Vercel
export const revalidate = 300 // Revalidar cada 5 minutos

export default async function Home() {
  // En Vercel: Cargar datos server-side para ISR
  // En static export: getLandingAssets retorna null, se usa client-side
  const serverAssets = await getLandingAssets()
  const contentfulAssets = serverAssets ? convertToContentfulAssets(serverAssets) : null

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* En Vercel: Usar datos server-side */}
      {/* En static export: Usar ClientContentfulProvider */}
      {contentfulAssets ? (
        <>
          <HeroSection contentfulAssets={contentfulAssets} />
          <HeroTextBlock />
          <LocationSection />
          <LifestyleSection contentfulAssets={contentfulAssets} />
          <AmenitiesSection />
          <GallerySection contentfulAssets={contentfulAssets} />
          <TypologiesSection contentfulAssets={contentfulAssets} />
          <ContactForm />
          <Footer />
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <ClientContentfulProvider />
        </Suspense>
      )}
    </main>
  )
}
