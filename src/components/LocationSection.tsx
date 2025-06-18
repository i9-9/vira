"use client"

export function LocationSection() {
  return (
    <section id="ubicacion" className="w-full bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#222] text-center mb-2 font-sans uppercase tracking-tight">UBICACIÓN</h2>
        <p className="text-base md:text-lg text-[#444] text-center mb-8">Donde convergen Villa Urquiza, Villa Ortúzar y Parque Chas, cerca de Colegiales y Belgrano R.</p>
        <div className="w-full h-64 bg-neutral-200 flex items-center justify-center mb-8 rounded">
          <span className="text-neutral-400 text-lg">Mapa aquí</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#222] mb-2">Urbano y accesible, familiar y profesional en una ubicación que cubre todas las necesidades.</h3>
          </div>
          <div className="flex-1 text-sm text-[#444] flex flex-col gap-2">
            <span>VIVIENDA MULTIFAMILIAR</span>
            <span>APTO PROFESIONAL</span>
            <span>LOCALES COMERCIALES</span>
          </div>
        </div>
      </div>
    </section>
  )
} 