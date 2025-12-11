import type { FormData } from '@/types/forms';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function submitToGoogleSheets(formData: FormData): Promise<boolean> {
  try {
    if (!SCRIPT_URL) {
      throw new Error('Error de configuración del formulario');
    }

    // Enviar como URLSearchParams para mejor compatibilidad con Google Apps Script
    const params = new URLSearchParams();
    
    // Agregar campos en el orden correcto
    params.append('nombre', formData.nombre || '');
    params.append('telefono', formData.telefono || '');
    params.append('email', formData.email || '');
    params.append('utmSource', window.location.href);
    params.append('userAgent', navigator.userAgent);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Error al procesar el formulario');
    }

    return true;

  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
} 