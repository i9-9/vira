"use client"

import Image from "next/image"

export function ContactForm() {
  return (
    <section id="contacto" className="w-full bg-[#c0b8ab] py-16 border-t border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-between px-[30px] gap-12">
        {/* Left: Form */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="mb-12">
            <span className="block text-3xl md:text-5xl font-light text-[#9b9a96] text-left" style={{ fontFamily: 'Beatrice, Arial, sans-serif', fontWeight: 300 }}>
              Solicitá más información
            </span>
          </div>
          <form className="flex flex-col gap-8 w-full">
            <div className="flex flex-col md:flex-row items-end gap-8 w-full">
              <div className="flex-1 flex flex-col">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre y Apellido*"
                  className="bg-transparent border-0 border-b border-[#444] focus:outline-none focus:border-black text-lg text-[#222] py-2 font-light placeholder:text-[#222] placeholder:font-normal"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email*"
                  className="bg-transparent border-0 border-b border-[#444] focus:outline-none focus:border-black text-lg text-[#222] py-2 font-light placeholder:text-[#222] placeholder:font-normal"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="flex flex-col min-w-[120px] w-1/4">
                <button
                  type="submit"
                  className="bg-transparent border-0 border-b border-[#444] text-[#222] text-lg font-light py-2 px-0 hover:text-black hover:border-black transition-all w-full text-left"
                  style={{ fontFamily: 'Beatrice, Arial, sans-serif' }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Right: Logo */}
        <div className="flex-1 flex flex-col items-center md:items-end justify-center w-full">
          <Image
            src="/logos/vira_2.svg"
            alt="VIRA logo"
            width={240}
            height={120}
            className="mb-2"
          />
        </div>
      </div>
    </section>
  )
} 