"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
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
        <div className="w-full max-w-7xl mx-auto px-[15px] py-4 md:py-8 flex items-center justify-between relative h-[80px] md:h-[120px]">
          {/* Logo VIRA - Center */}
          <a 
            href="#inicio" 
            className="absolute left-1/2 -translate-x-1/2 block h-16 md:h-24 w-auto"
          >
            <Image 
              src="/logos/vira_1.svg" 
              alt="VIRA" 
              width={120}
              height={48}
              className="h-16 md:h-24 w-auto object-contain"
              priority
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-12 h-12 flex items-center justify-center z-50"
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