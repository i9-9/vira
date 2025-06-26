"use client"

import Image from "next/image"
import React from "react"

const images = [
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_FACHADA ACCESO_F.jpg",
    alt: "Fachada principal y acceso al edificio"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_FACHADA TRIUNVIRATO_F.jpg",
    alt: "Vista de la fachada sobre Av. Triunvirato"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_FACHADAINCAS_F.jpg",
    alt: "Vista de la fachada sobre calle Los Incas"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_UNIDAD FUNC_F.jpg",
    alt: "Interior de unidad funcional modelo"
  }
]

export function GallerySection() {
  return (
    <section id="galeria" className="py-20 bg-[#f5f4f2]">
      {/* Full width gallery */}
      <div className="px-6 md:px-16 overflow-hidden">
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 md:-mx-16 px-6 md:px-16"
          tabIndex={0}
          aria-label="Galería de imágenes"
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
    </section>
  )
} 