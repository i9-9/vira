"use client"

import { Map } from './Map'

export function LocationSection() {
  return (
    <section id="ubicacion" className="w-full">
      {/* Header */}
      <div className="w-full bg-black py-12 text-center px-[30px]">
        <h2 className="text-4xl md:text-6xl font-light text-white uppercase mb-4 tracking-tight">UBICACIÓN</h2>
        <div className="flex justify-center">
          <p className="text-lg md:text-2xl text-white font-light text-wrap">
            Donde convergen Villa Urquiza, Villa Ortuzar y Parque Chas, cerca de Colegiales y Belgrano R.
          </p>
        </div>
      </div>
      {/* Map */}
      <div className="w-full h-[420px] md:h-[520px]">
        <Map />
      </div>
    </section>
  )
} 