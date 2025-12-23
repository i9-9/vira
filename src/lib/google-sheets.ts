import type { FormData } from '@/types/forms';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function submitToGoogleSheets(formData: FormData): Promise<boolean> {
  try {
    if (!SCRIPT_URL) {
      throw new Error('Error de configuración del formulario');
    }

    // Create FormData for proper form submission
    const data = new FormData();
    
    // Add each field individually
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    // Add additional data
    data.append('utmSource', window.location.href);
    data.append('userAgent', navigator.userAgent);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      body: data,
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