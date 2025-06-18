"use client"

import Image from "next/image"

const amenities = [
  {
    icon: "/icons/cocheras.svg",
    label: "Cocheras"
  },
  {
    icon: "/icons/bicicleteros.svg",
    label: "Bicicleteros"
  },
  {
    icon: "/icons/bauleras.svg",
    label: "Bauleras"
  },
  {
    icon: "/icons/jardinurbano.svg",
    label: "Jardín urbano",
    sub: "con Doble Acceso Peatonal"
  },
  {
    icon: "/icons/frontdesk.svg",
    label: "Front Desk",
    sub: "para Guardia y\nRecepción de paquetería\npor Triunvirato"
  },
  {
    icon: "/icons/gimnasio.svg",
    label: "Gimnasio"
  },
  {
    icon: "/icons/sum.svg",
    label: "SUM"
  },
  {
    icon: "/icons/terraza.svg",
    label: "Terraza",
    sub: "con Parrilla\ny pérgola"
  },
  {
    icon: "/icons/pileta.svg",
    label: "Pileta"
  },
  {
    icon: "/icons/solarium.svg",
    label: "Solárium",
    sub: "Con duchas"
  },
  {
    icon: "/icons/camaras.svg",
    label: "Cámaras",
    sub: "de seguridad"
  },
  {
    icon: "/icons/controldeacceso.svg",
    label: "Control de acceso",
    sub: "inteligente"
  }
]

export function AmenitiesSection() {
  return (
    <section id="amenidades" className="py-20" style={{ background: '#a89e87' }}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-light text-white text-center mb-16 leading-tight">
          COMODIDADES DISEÑADAS<br />PARA EL BIENESTAR
        </h2>
        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6 max-w-5xl mx-auto">
          {amenities.map((a) => (
            <div key={a.label} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image src={a.icon} alt={a.label} width={64} height={64} className="w-16 h-16 object-contain" />
              </div>
              <span className="text-lg md:text-xl text-[#363636] font-normal mb-1">
                {a.label}
              </span>
              {a.sub && (
                <span className="text-xs md:text-sm text-[#5a5a5a] whitespace-pre-line leading-tight font-normal mt-1">
                  {a.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 