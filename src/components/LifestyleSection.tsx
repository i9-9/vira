"use client"

import Image from "next/image"
import React from "react"

const images = [
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_PATIOINTERNO_F.jpg",
    alt: "Patio interno con vegetación y espacios de encuentro"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_HALL_F.jpg",
    alt: "Hall de entrada con diseño moderno"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_INT GYM_F01.jpg",
    alt: "Gimnasio equipado con vista al exterior"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_SUM PARRILLA_F.jpg",
    alt: "SUM con parrilla y espacio de entretenimiento"
  },
  {
    src: "/images/gallery/3C_FORMA_TRIUNVIRATO_PILETA_F.jpg",
    alt: "Pileta con solarium y áreas de descanso"
  }
]

export function LifestyleSection() {
  return (
    <section
      id="lifestyle"
      className="bg-[#f5f4f2] py-20"
    >
      {/* Full width gallery */}
      <div className="px-6 md:px-16 mb-10 overflow-hidden">
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 md:-mx-16 px-6 md:px-16"
          tabIndex={0}
          aria-label="Galería de imágenes estilo de vida"
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