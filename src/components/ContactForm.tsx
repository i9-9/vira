"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import { useAnimationInView } from "@/hooks/useAnimationInView"

const interestOptions = [
  { value: "1-ambiente", label: "1 Ambiente" },
  { value: "2-ambientes", label: "2 Ambientes" },
  { value: "3-ambientes", label: "3 Ambientes" },
  { value: "4-ambientes", label: "4 Ambientes" },
  { value: "duplex", label: "Dúplex" },
  { value: "local-comercial", label: "Local Comercial" },
  { value: "apto-profesional", label: "Apto Profesional" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const { ref, fadeInUp, staggerContainer, staggerItem } = useAnimationInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      interest: "1-ambiente",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form data:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      form.reset()
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <section
        id="contacto"
        ref={ref}
        className="py-20 bg-vira-light-gray"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-vira-black mb-4">
                  ¡Gracias por tu interés!
                </h3>
                <p className="text-vira-medium-gray">
                  Nos pondremos en contacto contigo pronto para brindarte 
                  toda la información que necesitas sobre VIRA.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contacto"
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
            CONTACTO
          </h2>
          <p className="text-xl text-vira-medium-gray max-w-3xl mx-auto">
            ¿Te interesa VIRA? Completa el formulario y nos pondremos 
            en contacto contigo para brindarte toda la información.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-vira-black">
                  Solicita Información
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <motion.form
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <motion.div variants={staggerItem}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tu nombre completo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="tu@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+54 11 1234-5678"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interés en</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {interestOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Cuéntanos qué te interesa de VIRA..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Button
                        type="submit"
                        variant="vira"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                      </Button>
                    </motion.div>
                  </motion.form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-vira-black mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-vira-black mb-1">
                      Ubicación
                    </h4>
                    <p className="text-vira-medium-gray">
                      Villa Urquiza, Buenos Aires<br />
                      Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="font-semibold text-vira-black mb-1">
                      Teléfono
                    </h4>
                    <p className="text-vira-medium-gray">
                      +54 11 1234-5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h4 className="font-semibold text-vira-black mb-1">
                      Email
                    </h4>
                    <p className="text-vira-medium-gray">
                      info@vira.com.ar
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h4 className="font-semibold text-vira-black mb-1">
                      Horarios de Atención
                    </h4>
                    <p className="text-vira-medium-gray">
                      Lunes a Viernes: 9:00 - 18:00<br />
                      Sábados: 9:00 - 13:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-vira-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-vira-black mb-4">
                ¿Por qué elegir VIRA?
              </h4>
              <ul className="space-y-2 text-sm text-vira-medium-gray">
                <li>• Ubicación privilegiada en Villa Urquiza</li>
                <li>• Diseño arquitectónico de vanguardia</li>
                <li>• Amenidades premium para tu bienestar</li>
                <li>• Financiamiento flexible disponible</li>
                <li>• Entrega llave en mano garantizada</li>
                <li>• Atención personalizada durante todo el proceso</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 