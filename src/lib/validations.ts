import * as z from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  interest: z.enum(["1-ambiente", "2-ambientes", "3-ambientes", "4-ambientes", "duplex", "local-comercial", "apto-profesional"]),
})

export type ContactFormData = z.infer<typeof contactFormSchema> 