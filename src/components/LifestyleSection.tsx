"use client"

import Image from "next/image"
import React, { useRef, useEffect } from "react"

const images = [
  {
    src: "/images/PHOTO-2025-06-03-11-21-21 3.jpg",
    alt: "Patio interior con vegetación y personas"
  },
  {
    src: "/images/PHOTO-2025-06-03-11-21-21 4.jpg",
    alt: "Terraza con mesa y sillas bajo pérgola"
  },
  // Puedes agregar más imágenes aquí si lo deseas
]

export function LifestyleSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      // Only hijack on desktop (min-width: 768px)
      if (window.innerWidth < 768) return
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <section
      id="lifestyle"
      className="bg-[#f5f4f2] py-20"
    >
      {/* Full width gallery */}
      <div className="w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw] px-0 mb-10">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          tabIndex={0}
          aria-label="Galería de imágenes estilo de vida"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
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
      <div className="container mx-auto px-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
          <div className="flex flex-col gap-2 mt-8 md:mt-0">
            <span className="text-base md:text-lg font-medium tracking-tight border-b border-black pb-1">
              VIVIENDA MULTIFAMILIAR
            </span>
            <span className="text-base md:text-lg font-medium tracking-tight border-b border-black pb-1">
              APTO PROFESIONAL
            </span>
            <span className="text-base md:text-lg font-medium tracking-tight border-b border-black pb-1">
              LOCALES COMERCIALES
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 