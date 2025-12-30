import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono } = body

    // Validate required fields
    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Validate API key is configured
    const apiKey = process.env.TOKKO_API_KEY
    if (!apiKey) {
      console.error('TOKKO_API_KEY no está configurada')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    // Prepare data for Tokko Broker WebContact API
    // Based on Tokko documentation: https://developers.tokkobroker.com/docs/contact-form
    const tokkoData = {
      name: nombre,
      email: email,
      phone: telefono || '',
      cellphone: telefono || '',
      text: `Consulta desde VIRA Landing - ${nombre} (${email})`,
      tags: ['VIRA_LANDING']
    }

    console.log('📤 Enviando a Tokko Broker...')
    console.log('Endpoint: https://www.tokkobroker.com/api/v1/webcontact/')
    console.log('Data:', JSON.stringify(tokkoData, null, 2))

    // Send to Tokko Broker WebContact endpoint
    // IMPORTANT: Use HTTPS and www subdomain
    const tokkoResponse = await fetch(
      `https://www.tokkobroker.com/api/v1/webcontact/?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(tokkoData),
      }
    )

    const responseText = await tokkoResponse.text()
    console.log('📥 Tokko Broker response status:', tokkoResponse.status)
    console.log('📥 Tokko Broker response headers:', Object.fromEntries(tokkoResponse.headers.entries()))
    console.log('📥 Tokko Broker response body:', responseText)

    if (!tokkoResponse.ok) {
      console.error('❌ Tokko Broker error:', {
        status: tokkoResponse.status,
        statusText: tokkoResponse.statusText,
        body: responseText
      })
      throw new Error(`Error al enviar a Tokko Broker: ${tokkoResponse.status} - ${responseText}`)
    }

    // Try to parse JSON, but handle empty responses
    let tokkoResult
    try {
      tokkoResult = responseText ? JSON.parse(responseText) : { success: true }
    } catch {
      console.warn('Could not parse Tokko response as JSON:', responseText)
      tokkoResult = { success: true, raw: responseText }
    }

    console.log('✅ Contacto enviado exitosamente a Tokko Broker')

    return NextResponse.json({
      success: true,
      tokko: tokkoResult,
      message: 'Contacto enviado exitosamente'
    })

  } catch (error) {
    console.error('❌ Error en API contact:', error)
    return NextResponse.json(
      {
        error: 'Error al procesar la solicitud',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
