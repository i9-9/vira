"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAnimationInView } from "@/hooks/useAnimationInView"

const typologies = [
  {
    id: "1-ambiente",
    name: "1 Ambiente",
    description: "Ideal para solteros o parejas jóvenes",
    surface: "35-45 m²",
    features: [
      "Living-comedor integrado",
      "Cocina equipada",
      "Dormitorio principal",
      "Baño completo",
      "Balcón o terraza"
    ],
    price: "Desde USD 85,000"
  },
  {
    id: "2-ambientes",
    name: "2 Ambientes",
    description: "Perfecto para parejas o pequeños grupos familiares",
    surface: "55-70 m²",
    features: [
      "Living-comedor amplio",
      "Cocina equipada con barra",
      "Dormitorio principal con placard",
      "Dormitorio secundario o estudio",
      "Baño completo",
      "Balcón o terraza"
    ],
    price: "Desde USD 120,000"
  },
  {
    id: "3-ambientes",
    name: "3 Ambientes",
    description: "Ideal para familias pequeñas",
    surface: "75-90 m²",
    features: [
      "Living-comedor con balcón",
      "Cocina equipada con comedor diario",
      "Dormitorio principal en suite",
      "Dormitorio secundario",
      "Dormitorio terciario o estudio",
      "Baño completo",
      "Lavadero"
    ],
    price: "Desde USD 180,000"
  },
  {
    id: "4-ambientes",
    name: "4 Ambientes",
    description: "Para familias que buscan espacio y comodidad",
    surface: "95-120 m²",
    features: [
      "Living-comedor con balcón",
      "Cocina equipada con comedor diario",
      "Dormitorio principal en suite",
      "Dormitorio secundario",
      "Dormitorio terciario",
      "Dormitorio cuaternario o estudio",
      "Baño completo",
      "Lavadero",
      "Terraza privada"
    ],
    price: "Desde USD 250,000"
  },
  {
    id: "duplex",
    name: "Dúplex",
    description: "Exclusividad y privacidad en dos niveles",
    surface: "120-150 m²",
    features: [
      "Living-comedor con doble altura",
      "Cocina gourmet equipada",
      "Dormitorio principal en suite",
      "Dormitorio secundario",
      "Dormitorio terciario",
      "Baño completo",
      "Lavadero",
      "Terraza privada",
      "Vista panorámica"
    ],
    price: "Desde USD 350,000"
  },
  {
    id: "local-comercial",
    name: "Local Comercial",
    description: "Oportunidad de inversión en ubicación estratégica",
    surface: "80-150 m²",
    features: [
      "Espacio comercial amplio",
      "Fachada vidriada",
      "Baño de clientes",
      "Depósito",
      "Acceso independiente",
      "Estacionamiento incluido"
    ],
    price: "Desde USD 200,000"
  },
  {
    id: "apto-profesional",
    name: "Apto Profesional",
    description: "Espacio de trabajo moderno y funcional",
    surface: "60-100 m²",
    features: [
      "Oficina principal",
      "Sala de reuniones",
      "Recepción",
      "Cocina office",
      "Baño completo",
      "Estacionamiento incluido"
    ],
    price: "Desde USD 150,000"
  }
]

export function TypologiesSection() {
  const { ref, fadeInUp, fadeIn } = useAnimationInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section
      id="tipologias"
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
            TIPOLOGÍAS
          </h2>
          <p className="text-xl text-vira-medium-gray max-w-4xl mx-auto">
            LA VIDA SE TRANSFORMA EN VIRA TRIUNVIRATO
          </p>
          <p className="text-lg text-vira-medium-gray mt-2">
            UNIDADES SIMPLES & DUPLEX • 1/2/3/4 AMBIENTES
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Tabs defaultValue="1-ambiente" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              {typologies.map((typology) => (
                <TabsTrigger
                  key={typology.id}
                  value={typology.id}
                  className="text-xs md:text-sm"
                >
                  {typology.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {typologies.map((typology) => (
              <TabsContent
                key={typology.id}
                value={typology.id}
                className="mt-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-lg">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Typology Info */}
                        <div>
                          <h3 className="text-3xl font-bold text-vira-black mb-4">
                            {typology.name}
                          </h3>
                          <p className="text-vira-medium-gray mb-6">
                            {typology.description}
                          </p>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">📐</div>
                              <div>
                                <p className="font-semibold text-vira-black">
                                  Superficie
                                </p>
                                <p className="text-vira-medium-gray">
                                  {typology.surface}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">💰</div>
                              <div>
                                <p className="font-semibold text-vira-black">
                                  Precio
                                </p>
                                <p className="text-vira-medium-gray">
                                  {typology.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="text-xl font-semibold text-vira-black mb-4">
                            Características
                          </h4>
                          <ul className="space-y-2">
                            {typology.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-vira-beige mt-1">•</span>
                                <span className="text-vira-medium-gray">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Mobile Accordion */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="lg:hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            {typologies.map((typology) => (
              <AccordionItem key={typology.id} value={typology.id}>
                <AccordionTrigger className="text-left">
                  <div>
                    <h3 className="font-semibold text-vira-black">
                      {typology.name}
                    </h3>
                    <p className="text-sm text-vira-medium-gray">
                      {typology.surface} • {typology.price}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-vira-medium-gray">
                      {typology.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-vira-black mb-2">
                        Características
                      </h4>
                      <ul className="space-y-1">
                        {typology.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="text-vira-beige mt-1">•</span>
                            <span className="text-vira-medium-gray text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-vira-light-gray p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-vira-black mb-4">
              Flexibilidad y Personalización
            </h3>
            <p className="text-vira-medium-gray leading-relaxed mb-6">
              Cada tipología en VIRA está diseñada para adaptarse a diferentes 
              estilos de vida y necesidades. Desde unidades compactas hasta 
              espacios amplios, todas comparten la misma calidad y atención al detalle.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Financiamiento
                </h4>
                <p className="text-vira-medium-gray">
                  Opciones de financiamiento flexibles disponibles
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Personalización
                </h4>
                <p className="text-vira-medium-gray">
                  Posibilidad de personalizar acabados y equipamiento
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vira-black mb-2">
                  Entrega
                </h4>
                <p className="text-vira-medium-gray">
                  Entrega llave en mano con garantía de calidad
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 