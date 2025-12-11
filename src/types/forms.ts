import { z } from 'zod';

export const formSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  telefono: z.string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(20, 'El teléfono no puede tener más de 20 caracteres')
    .regex(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números y caracteres especiales'),
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
});

export type FormData = z.infer<typeof formSchema>; 