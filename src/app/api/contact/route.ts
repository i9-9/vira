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

    // Prepare data for Tokko Broker WebContact API
    const tokkoData = {
      name: nombre,
      email: email,
      cellphone: telefono || '',
      tags: ['WEB_CONTACT', 'VIRA_LANDING']
    }

    // Send to Tokko Broker WebContact endpoint
    const tokkoResponse = await fetch(
      `http://tokkobroker.com/api/v1/webcontact/?key=${process.env.TOKKO_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokkoData),
      }
    )

    const responseText = await tokkoResponse.text()
    console.log('Tokko Broker response status:', tokkoResponse.status)
    console.log('Tokko Broker response:', responseText)

    if (!tokkoResponse.ok) {
      console.error('Tokko Broker error:', responseText)
      throw new Error(`Error al enviar a Tokko Broker: ${tokkoResponse.status}`)
    }

    // Try to parse JSON, but handle empty responses
    let tokkoResult
    try {
      tokkoResult = responseText ? JSON.parse(responseText) : { success: true }
    } catch (e) {
      console.warn('Could not parse Tokko response as JSON:', responseText)
      tokkoResult = { success: true, raw: responseText }
    }

    return NextResponse.json({
      success: true,
      tokko: tokkoResult,
      message: 'Contacto enviado exitosamente'
    })

  } catch (error) {
    console.error('Error en API contact:', error)
    return NextResponse.json(
      {
        error: 'Error al procesar la solicitud',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
