"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import type { FormData } from "@/types/forms"
import { formSchema } from "@/types/forms"
import { submitToGoogleSheets } from "@/lib/google-sheets"

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitStatus('loading')
      await submitToGoogleSheets(data)
      setSubmitStatus('success')
      reset()
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el formulario')
      // Reset error after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <section id="contacto" className="w-full bg-[#c0b8ab] py-16 border-t border-black">
      <div className="px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-12 w-full">
            <span className="block text-3xl md:text-5xl font-light text-[#9b9a96] text-center md:text-left" style={{ fontFamily: 'Beatrice, Arial, sans-serif', fontWeight: 300 }}>
              Solicitá más información
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
            <div className="flex flex-col md:flex-row items-end gap-8 w-full">
              <div className="w-full md:flex-1 flex flex-col">
                <input
                  {...register("nombre")}
                  type="text"
                  placeholder="Nombre y Apellido*"
                  className={`bg-transparent border-0 border-b ${errors.nombre ? 'border-red-500' : 'border-[#444]'} focus:outline-none focus:border-black text-lg text-[#222] py-2 font-light placeholder:text-[#222] placeholder:font-normal w-full`}
                  autoComplete="name"
                />
                {errors.nombre && (
                  <span className="text-red-500 text-sm mt-1">{errors.nombre.message}</span>
                )}
              </div>
              <div className="w-full md:flex-1 flex flex-col">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email*"
                  className={`bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-[#444]'} focus:outline-none focus:border-black text-lg text-[#222] py-2 font-light placeholder:text-[#222] placeholder:font-normal w-full`}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                )}
              </div>
              <div className="w-full md:min-w-[120px] md:w-1/4 flex flex-col">
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className={`bg-transparent border border-[#444] text-[#222] text-lg font-light py-2 px-4 hover:text-black hover:border-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center md:text-left w-full`}
                  style={{ fontFamily: 'Beatrice, Arial, sans-serif', borderRadius: '0' }}
                >
                  {submitStatus === 'loading' ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-green-800 text-sm text-center">
                ¡Mensaje enviado correctamente!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
        {/* Right: Logo */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center mt-12 md:mt-0">
          <Image
            src="/logos/vira_2.png"
            alt="VIRA logo"
            width={240}
            height={120}
            className="mb-2"
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  )
}