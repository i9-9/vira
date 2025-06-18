"use client"

export function LocationSection() {
  return (
    <section id="ubicacion" className="w-full">
      {/* Header */}
      <div className="w-full bg-black py-12 text-center px-[30px]">
        <h2 className="text-4xl md:text-6xl font-light text-white uppercase mb-4 tracking-tight">UBICACIÓN</h2>
        <p className="text-lg md:text-2xl text-white font-light max-w-4xl mx-auto">
          Donde convergen Villa Urquiza, Villa Ortuzar y Parque Chas, cerca de Colegiales y Belgrano R.
        </p>
      </div>
      {/* Map Placeholder */}
      <div className="w-full h-[420px] md:h-[520px] bg-neutral-200 flex items-center justify-center">
        <span className="text-neutral-400 text-2xl md:text-3xl">Mapa aquí</span>
      </div>
    </section>
  )
} 