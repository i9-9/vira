"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useAnimationInView } from "@/hooks/useAnimationInView"

export function Footer() {
  const { ref, fadeIn } = useAnimationInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <footer
      ref={ref}
      className="bg-vira-black text-vira-white py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">VIRA</h3>
            <p className="text-vira-light-gray mb-6 max-w-md">
              Un proyecto inmobiliario único que combina diseño moderno, 
              ubicación privilegiada y amenidades de primer nivel para 
              crear el hogar de tus sueños.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-vira-light-gray hover:text-vira-beige transition-colors"
                aria-label="Facebook"
              >
                <div className="text-2xl">📘</div>
              </a>
              <a
                href="#"
                className="text-vira-light-gray hover:text-vira-beige transition-colors"
                aria-label="Instagram"
              >
                <div className="text-2xl">📷</div>
              </a>
              <a
                href="#"
                className="text-vira-light-gray hover:text-vira-beige transition-colors"
                aria-label="LinkedIn"
              >
                <div className="text-2xl">💼</div>
              </a>
              <a
                href="#"
                className="text-vira-light-gray hover:text-vira-beige transition-colors"
                aria-label="WhatsApp"
              >
                <div className="text-2xl">💬</div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-vira-light-gray hover:text-vira-beige transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  className="text-vira-light-gray hover:text-vira-beige transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("ubicacion")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Ubicación
                </a>
              </li>
              <li>
                <a
                  href="#tipologias"
                  className="text-vira-light-gray hover:text-vira-beige transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("tipologias")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Tipologías
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-vira-light-gray hover:text-vira-beige transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="text-vira-beige mt-1">📍</div>
                <p className="text-vira-light-gray text-sm">
                  Villa Urquiza, Buenos Aires, Argentina
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-vira-beige mt-1">📞</div>
                <p className="text-vira-light-gray text-sm">
                  +54 11 1234-5678
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-vira-beige mt-1">✉️</div>
                <p className="text-vira-light-gray text-sm">
                  info@vira.com.ar
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Separator className="my-8 bg-vira-medium-gray" />

        {/* Bottom Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-center md:text-left">
            <p className="text-vira-light-gray text-sm">
              © 2024 VIRA. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-vira-light-gray text-sm">
              Desarrollado por{" "}
              <span className="text-vira-beige font-semibold">
                VIRA Development
              </span>
            </p>
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-wrap justify-center space-x-6 text-xs text-vira-light-gray">
            <a
              href="#"
              className="hover:text-vira-beige transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="hover:text-vira-beige transition-colors"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="hover:text-vira-beige transition-colors"
            >
              Información Legal
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 