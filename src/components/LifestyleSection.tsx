"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAnimationInView } from "@/hooks/useAnimationInView"

const lifestyleImages = [
  {
    id: 1,
    src: "/placeholder-1.jpg",
    alt: "Exterior del edificio con vegetación",
    title: "Exterior Elegante",
    description: "Diseño arquitectónico moderno integrado con la naturaleza"
  },
  {
    id: 2,
    src: "/placeholder-2.jpg",
    alt: "Espacios comunes",
    title: "Espacios Comunes",
    description: "Áreas de convivencia diseñadas para el bienestar"
  },
  {
    id: 3,
    src: "/placeholder-3.jpg",
    alt: "Detalles arquitectónicos",
    title: "Detalles Arquitectónicos",
    description: "Cada detalle pensado para la excelencia"
  },
  {
    id: 4,
    src: "/placeholder-4.jpg",
    alt: "Vista panorámica",
    title: "Vista Panorámica",
    description: "Perspectivas únicas de la ciudad"
  },
  {
    id: 5,
    src: "/placeholder-5.jpg",
    alt: "Jardines y terrazas",
    title: "Jardines y Terrazas",
    description: "Espacios verdes para disfrutar al aire libre"
  }
]

export function LifestyleSection() {
  const { ref, fadeInUp, fadeInLeft, fadeIn } = useAnimationInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section
      id="lifestyle"
      ref={ref}
      className="py-20 bg-vira-light-gray"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-vira-black mb-4">
            URBANO Y ACCESIBLE, FAMILIAR Y PROFESIONAL
          </h2>
          <p className="text-xl text-vira-medium-gray max-w-4xl mx-auto">
            EN UNA UBICACIÓN QUE CUBRE TODAS LAS NECESIDADES
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-vira-medium-gray">
            VIVENDA MULTIFAMILIAR • APTO PROFESIONAL • LOCALES COMERCIALES
          </p>
        </motion.div>

        {/* Horizontal Gallery */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4 min-w-max">
              {lifestyleImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="h-64 bg-vira-beige/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏢</div>
                          <p className="text-vira-medium-gray text-sm">
                            {image.alt}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-vira-black mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm text-vira-medium-gray">
                          {image.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Additional Content */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-vira-black mb-2">
              Vivienda Multifamiliar
            </h3>
            <p className="text-vira-medium-gray">
              Unidades diseñadas para familias que buscan comodidad y elegancia
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-vira-black mb-2">
              Apto Profesional
            </h3>
            <p className="text-vira-medium-gray">
              Espacios de trabajo modernos y funcionales para profesionales
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-vira-black mb-2">
              Locales Comerciales
            </h3>
            <p className="text-vira-medium-gray">
              Oportunidades comerciales en una ubicación estratégica
            </p>
          </div>
        </motion.div>

        {/* Lifestyle Description */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-vira-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-vira-black mb-4">
              Un Estilo de Vida Único
            </h3>
            <p className="text-vira-medium-gray leading-relaxed">
              En VIRA, cada detalle está pensado para crear una experiencia de vida excepcional. 
              Desde la elección de materiales hasta la distribución de espacios, 
              todo está diseñado para maximizar el confort y la funcionalidad. 
              Disfruta de la perfecta combinación entre urbanidad y tranquilidad, 
              donde cada día es una nueva oportunidad para vivir mejor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 