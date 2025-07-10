"use client"

import type { ContentfulAssets } from "@/lib/contentful-client"

interface TypologiesSectionProps {
  contentfulAssets?: ContentfulAssets | null
}

export function TypologiesSection({ contentfulAssets }: TypologiesSectionProps) {
  // URLs de fallback para cuando no hay datos de Contentful
  const fallbackUrls = {
    brochure: "/pdf/brochure_vira.pdf",
    typologies: "/pdf/tipologias.pdf"
  }

  // Usar URLs de Contentful o fallbacks
  const brochureUrl = contentfulAssets?.documents?.brochure || fallbackUrls.brochure
  const typologiesUrl = contentfulAssets?.documents?.typologies || fallbackUrls.typologies

  // Debug: mostrar qué URLs se están usando
  console.log('📄 TypologiesSection - URLs de documentos:')
  console.log('   Brochure:', brochureUrl.includes('ctfassets.net') ? '✅ Contentful' : '❌ Fallback')
  console.log('   Typologies:', typologiesUrl.includes('ctfassets.net') ? '✅ Contentful' : '❌ Fallback')

  return (
    <section id="tipologias" className="w-full bg-black py-20">
      <div className="px-6 md:px-16">
        <h2 className="text-4xl md:text-6xl font-light text-white text-center mb-20 tracking-tight uppercase">TIPOLOGÍAS</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1">
            <p className="text-xl md:text-3xl font-light text-white leading-tight">
              LA VIDA SE TRANSFORMA EN<br />
              VIRA TRIUNVIRATO UNIDADES<br />
              SIMPLES & DUPLEX 1 / 2 / 3 / 4<br />
              AMBIENTES
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href={brochureUrl}
              className="bg-[#f3f3f3] text-[#444] text-lg font-medium rounded-md px-8 py-4 shadow transition hover:bg-white hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              VER BROCHURE
            </a>
            <a
              href={typologiesUrl}
              className="bg-[#f3f3f3] text-[#444] text-lg font-medium rounded-md px-8 py-4 shadow transition hover:bg-white hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              VER PLANTAS
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 