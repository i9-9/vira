"use client"

import Image from "next/image"

export function HeroSection() {
  const HEADER_HEIGHT = 64 // px

  return (
    <section
      id="inicio"
      className={`w-full pt-[${HEADER_HEIGHT}px] bg-[#c0b8ab]`}
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)]">
        {/* Imagen izquierda */}
        <div className="flex-1 min-h-[240px] h-full relative">
          <Image
            src="/images/hero/2.png"
            alt="Hero izquierda"
            fill
            className="object-cover"
            priority
            draggable={false}
          />
        </div>
        {/* Imagen derecha */}
        <div className="flex-1 min-h-[240px] h-full relative">
          <Image
            src="/images/hero/1.png"
            alt="Hero derecha"
            fill
            className="object-cover"
            priority
            draggable={false}
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <h1 className="text-2xl md:text-4xl font-light text-white leading-tight font-sans uppercase tracking-tight mb-2 text-center" style={{letterSpacing: '-0.01em', fontFamily: 'Beatrice, Arial, sans-serif', fontWeight: 300}}>QUE TU VIDA VIRE<br/>A LA COMODIDAD<br/>QUE NECESITÁS</h1>
        <div className="h-1 w-16 bg-[#c0b8ab] mb-4" />
      </div>
    </section>
  )
} 