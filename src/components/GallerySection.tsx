"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAnimationInView } from "@/hooks/useAnimationInView"

const premiumImages = [
  {
    id: 1,
    src: "/placeholder-pool.jpg",
    alt: "Piscina en rooftop con vista panorámica",
    title: "Piscina Rooftop",
    description: "Disfruta de la piscina con vistas espectaculares de la ciudad"
  },
  {
    id: 2,
    src: "/placeholder-gym.jpg",
    alt: "Gimnasio moderno",
    title: "Gimnasio Premium",
    description: "Equipamiento de última generación para tu entrenamiento"
  },
  {
    id: 3,
    src: "/placeholder-common.jpg",
    alt: "Espacios comunes de diseño",
    title: "Espacios Comunes",
    description: "Áreas de convivencia con diseño arquitectónico excepcional"
  },
  {
    id: 4,
    src: "/placeholder-terrace.jpg",
    alt: "Terraza con vista panorámica",
    title: "Terraza Panorámica",
    description: "Terraza con vistas únicas y espacios de relax"
  },
  {
    id: 5,
    src: "/placeholder-spa.jpg",
    alt: "Spa y área de relajación",
    title: "Spa & Wellness",
    description: "Área de spa para relajación y bienestar"
  },
  {
    id: 6,
    src: "/placeholder-lounge.jpg",
    alt: "Sala de estar premium",
    title: "Sala de Estar",
    description: "Espacios elegantes para reuniones y eventos"
  }
]

export function GallerySection() {
  const { ref, fadeInUp, fadeInScale, fadeIn } = useAnimationInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section
      id="galeria"
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
            GALERÍA PREMIUM
          </h2>
          <p className="text-xl text-vira-medium-gray max-w-3xl mx-auto">
            Descubre los espacios más exclusivos de VIRA, 
            donde cada detalle refleja la excelencia en diseño y funcionalidad.
          </p>
        </motion.div>

        {/* Premium Gallery */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4 min-w-max">
              {premiumImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex-shrink-0 w-96"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-0">
                          <div className="h-80 bg-vira-beige/20 flex items-center justify-center group-hover:bg-vira-beige/30 transition-colors duration-300">
                            <div className="text-center">
                              <div className="text-6xl mb-4">🏊</div>
                              <p className="text-vira-medium-gray text-sm">
                                {image.alt}
                              </p>
                              <p className="text-xs text-vira-medium-gray mt-2">
                                Click para ampliar
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
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="p-6">
                        <div className="h-96 bg-vira-beige/20 flex items-center justify-center mb-4">
                          <div className="text-center">
                            <div className="text-8xl mb-4">🏊</div>
                            <p className="text-vira-medium-gray">
                              {image.alt}
                            </p>
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-vira-black mb-2">
                          {image.title}
                        </h3>
                        <p className="text-vira-medium-gray">
                          {image.description}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Gallery Navigation */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex justify-center space-x-2 mb-8">
            {premiumImages.map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full bg-vira-beige/30"
              />
            ))}
          </div>
          <p className="text-vira-medium-gray text-sm">
            Desliza para ver más imágenes • Click para ampliar
          </p>
        </motion.div>

        {/* Gallery Description */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-vira-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-vira-black mb-4 text-center">
              Experiencia Visual Excepcional
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-vira-black mb-3">
                  Diseño Arquitectónico
                </h4>
                <p className="text-vira-medium-gray text-sm leading-relaxed">
                  Cada espacio en VIRA está diseñado con atención al detalle, 
                  combinando funcionalidad con elegancia. Los materiales de 
                  primera calidad y la distribución inteligente crean 
                  ambientes únicos y acogedores.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vira-black mb-3">
                  Amenidades Premium
                </h4>
                <p className="text-vira-medium-gray text-sm leading-relaxed">
                  Desde la piscina rooftop hasta el gimnasio de última 
                  generación, cada amenidad está pensada para ofrecer 
                  una experiencia de vida superior y promover el 
                  bienestar integral de nuestros residentes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 