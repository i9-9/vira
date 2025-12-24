"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { smoothScrollTo } from "@/lib/utils"

const navigationItems = [
  { name: "Inicio", href: "inicio" },
  { name: "Ubicación", href: "ubicacion" },
  { name: "Lifestyle", href: "lifestyle" },
  { name: "Amenidades", href: "amenidades" },
  { name: "Galería", href: "galeria" },
  { name: "Tipologías", href: "tipologias" },
  { name: "Contacto", href: "contacto" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (href: string) => {
    smoothScrollTo(href)
    setIsOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 shadow-sm border-b border-[#c0b8ab]/30 backdrop-blur-md">
        {/* Logo P&G - Left - Positioned relative to header */}
        <a 
          href="https://www.pygdesarrollos.com.ar" 
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 block h-14 md:h-20 w-auto z-10 hover:opacity-80 transition-opacity duration-300"
        >
          <Image 
            src="/logos/p-g.png"
            alt="P&G Desarrollos" 
            width={80}
            height={40}
            className="h-14 md:h-20 w-auto object-contain"
            priority
          />
        </a>

        {/* Contact Button - Desktop Only - Positioned relative to header */}
        <button
          onClick={() => handleNavigation("contacto")}
          className="hidden md:flex items-center justify-center px-6 py-3 bg-[#c0b8ab] text-white text-sm font-medium hover:bg-[#a89d8f] hover:cursor-pointer transition-all duration-300 rounded-sm absolute right-6 md:right-16 top-1/2 -translate-y-1/2"
          style={{ fontFamily: 'Beatrice, Arial, sans-serif' }}
        >
          Contacto
        </button>

        {/* Mobile Menu Button - Positioned relative to header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-50"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Línea superior */}
            <motion.span
              className="absolute h-0.5 w-6 bg-[#c0b8ab] rounded-full origin-center"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -8,
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            />
            
            {/* Línea del medio */}
            <motion.span
              className="absolute h-0.5 w-6 bg-[#c0b8ab] rounded-full origin-center"
              animate={{
                opacity: isOpen ? 0 : 1,
                scaleX: isOpen ? 0 : 1,
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            />
            
            {/* Línea inferior */}
            <motion.span
              className="absolute h-0.5 w-6 bg-[#c0b8ab] rounded-full origin-center"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 8,
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            />
          </div>
        </button>

        {/* Container for VIRA logo - centered */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-4 md:py-8 flex items-center justify-center h-[80px] md:h-[120px]">
          {/* Logo VIRA - Center */}
          <a 
            href="#inicio" 
            className="block h-16 md:h-24 w-auto"
          >
            <Image 
              src="/logos/vira_1.png"
              alt="VIRA" 
              width={120}
              height={48}
              className="h-16 md:h-24 w-auto object-contain"
              priority
            />
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-white"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ 
              duration: 0.5, 
              ease: [0, 0, 0.2, 1] 
            }}
          >
            {/* Menu Content */}
            <div className="w-full h-full flex flex-col items-center justify-center max-w-lg mx-auto px-4">
              <nav className="flex flex-col items-center space-y-8 w-full">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4 + (index * 0.08) 
                    }}
                    onClick={() => handleNavigation(item.href)}
                    className="text-center text-2xl font-semibold text-[#222] transition-all duration-300 py-3 px-6 rounded-lg w-full max-w-xs hover:text-[#c0b8ab] hover:bg-[#c0b8ab]/5"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}