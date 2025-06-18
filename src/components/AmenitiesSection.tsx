"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useAnimationInView } from "@/hooks/useAnimationInView"

const amenities = [
  {
    id: 1,
    icon: "🚗",
    title: "Estacionamiento",
    description: "Estacionamiento privado y seguro"
  },
  {
    id: 2,
    icon: "🚲",
    title: "Bicicletas",
    description: "Espacio para bicicletas"
  },
  {
    id: 3,
    icon: "🔒",
    title: "Seguridad 24/7",
    description: "Sistema de seguridad integral"
  },
  {
    id: 4,
    icon: "🌳",
    title: "Espacios Verdes",
    description: "Jardines y áreas verdes"
  },
  {
    id: 5,
    icon: "💪",
    title: "Gimnasio",
    description: "Gimnasio completamente equipado"
  },
  {
    id: 6,
    icon: "🏊",
    title: "Piscina",
    description: "Piscina con vista panorámica"
  },
  {
    id: 7,
    icon: "☀️",
    title: "Terraza",
    description: "Terraza con vista a la ciudad"
  },
  {
    id: 8,
    icon: "🏋️",
    title: "Sala de Eventos",
    description: "Espacio para eventos sociales"
  },
  {
    id: 9,
    icon: "🚿",
    title: "Spa",
    description: "Área de spa y relajación"
  },
  {
    id: 10,
    icon: "👶",
    title: "Sala de Juegos",
    description: "Espacio recreativo para niños"
  },
  {
    id: 11,
    icon: "📚",
    title: "Biblioteca",
    description: "Sala de lectura y estudio"
  },
  {
    id: 12,
    icon: "🍽️",
    title: "Cocina Gourmet",
    description: "Cocina compartida para eventos"
  }
]

export function AmenitiesSection() {
  const { ref, fadeInUp, staggerContainer, staggerItem } = useAnimationInView({
    threshold: 0.4,
    triggerOnce: true,
  })

  return (
    <section
      id="amenidades"
      ref={ref}
      className="py-20 bg-vira-white"
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
            COMODIDADES DISEÑADAS PARA EL BIENESTAR
          </h2>
          <p className="text-xl text-vira-medium-gray max-w-3xl mx-auto">
            Cada amenidad está pensada para mejorar tu calidad de vida y 
            crear un entorno donde puedas disfrutar al máximo.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.id}
              variants={staggerItem}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-vira-beige/20 hover:border-vira-beige/40">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">
                    {amenity.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-vira-black mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-sm text-vira-medium-gray">
                    {amenity.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-vira-light-gray p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-vira-black mb-4">
              Más que Amenidades, un Estilo de Vida
            </h3>
            <p className="text-vira-medium-gray leading-relaxed mb-6">
              En VIRA, las amenidades no son solo servicios adicionales, 
              sino parte integral de una experiencia de vida superior. 
              Cada espacio está diseñado para fomentar la comunidad, 
              el bienestar y el disfrute de la vida cotidiana.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Bienestar Físico
                </h4>
                <p className="text-vira-medium-gray">
                  Gimnasio, piscina y espacios deportivos
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Bienestar Mental
                </h4>
                <p className="text-vira-medium-gray">
                  Spa, biblioteca y áreas de relajación
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Bienestar Social
                </h4>
                <p className="text-vira-medium-gray">
                  Salas de eventos y espacios comunes
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 