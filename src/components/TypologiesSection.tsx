"use client"

export function TypologiesSection() {
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
          <div className="flex-1 flex md:justify-end md:items-center">
            <a
              href="/pdf/brochure_vira.pdf"
              className="bg-[#f3f3f3] text-[#444] text-lg font-medium rounded-md px-8 py-4 shadow transition hover:bg-white hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              VER BROCHURE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 