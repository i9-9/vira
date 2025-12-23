"use client"

import Image from "next/image"
import { Globe, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-white border-t" style={{ borderColor: '#c0b8ab' }}>
      <div className="px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Logo P&G - Left */}
          <div className="flex-shrink-0">
            <Image
              src="/logos/p-g.png"
              alt="P&G Desarrollos Urbanos"
              width={120}
              height={120}
              className="mb-2"
              priority
              quality={100}
            />
          </div>

          {/* Contact Information */}
          <div className="flex-1 md:ml-auto md:max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-[#8b8070]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#8b8070] mb-4" style={{ fontFamily: 'Beatrice, Arial, sans-serif' }}>
                  Contacto
                </h3>
                <p className="text-sm">Av. de los Incas 4540 – Oficina 802</p>
                <p className="text-sm">Ciudad Autónoma de Buenos Aires</p>
                <p className="text-sm">+54 9 11 2878 0571</p>
                <p className="text-sm">+54 9 11 2885 7821</p>
                <p className="text-sm">comercial@pygdesarrollos.com.ar</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#8b8070] mb-4" style={{ fontFamily: 'Beatrice, Arial, sans-serif' }}>
                  Links
                </h3>
                <a 
                  href="https://www.pygdesarrollos.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8b8070] hover:text-[#6b6152] transition-colors duration-300"
                >
                  <Globe size={20} />
                  <span>Web</span>
                </a>
                <a 
                  href="https://www.instagram.com/pygdesarrollos/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8b8070] hover:text-[#6b6152] transition-colors duration-300"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/pygdesarrollos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8b8070] hover:text-[#6b6152] transition-colors duration-300"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="px-6 md:px-16 mt-8 pt-8 border-t" style={{ borderColor: '#c0b8ab' }}>
          <p className="text-xs text-[#8b8070] text-center">
            © {new Date().getFullYear()} VIRA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 