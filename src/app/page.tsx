import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { LocationSection } from "@/components/LocationSection"
import { LifestyleSection } from "@/components/LifestyleSection"
import { AmenitiesSection } from "@/components/AmenitiesSection"
import { GallerySection } from "@/components/GallerySection"
import { TypologiesSection } from "@/components/TypologiesSection"
import { ContactForm } from "@/components/ContactForm"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LocationSection />
      <LifestyleSection />
      <AmenitiesSection />
      <GallerySection />
      <TypologiesSection />
      <ContactForm />
      <Footer />
    </main>
  )
}
