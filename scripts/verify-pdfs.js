#!/usr/bin/env node

/**
 * Script para verificar que los PDFs de Contentful se pueden descargar
 * Uso: node scripts/verify-pdfs.js
 */

const fs = require('fs')
const https = require('https')

// Función para leer variables de entorno desde .env.local
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  
  const content = fs.readFileSync(filePath, 'utf8')
  const env = {}
  
  content.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        env[key] = valueParts.join('=').replace(/^["']|["']$/g, '')
      }
    }
  })
  
  return env
}

// Cargar variables de entorno
const envLocal = loadEnvFile('.env.local')
const env = loadEnvFile('.env')
Object.assign(process.env, env, envLocal)

const { createClient } = require('contentful')

// Función para verificar si una URL es accesible
function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({
        status: res.statusCode,
        accessible: res.statusCode === 200,
        contentType: res.headers['content-type']
      })
    })
    
    req.on('error', () => {
      resolve({
        status: 'ERROR',
        accessible: false,
        contentType: null
      })
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        status: 'TIMEOUT',
        accessible: false,
        contentType: null
      })
    })
  })
}

async function verifyPDFs() {
  console.log('🔍 Verificando PDFs de Contentful...\n')

  const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

  if (!spaceId || !accessToken) {
    console.error('❌ Variables de entorno no configuradas')
    process.exit(1)
  }

  try {
    const client = createClient({
      space: spaceId,
      accessToken: accessToken,
    })

    console.log('🔄 Conectando a Contentful...')
    const entries = await client.getEntries({
      content_type: 'landingAssets',
      limit: 1,
    })

    if (entries.items.length === 0) {
      console.error('❌ No se encontraron landing assets')
      process.exit(1)
    }

    const fields = entries.items[0].fields
    console.log('✅ Landing assets encontrados\n')

    // Verificar PDFs
    console.log('📄 Verificando PDFs:')
    
    const pdfs = [
      {
        name: 'Brochure',
        field: fields.brochurePdf,
        url: fields.brochurePdf?.fields?.file?.url
      },
      {
        name: 'Typologies',
        field: fields.typologiesPdf,
        url: fields.typologiesPdf?.fields?.file?.url
      }
    ]

    for (const pdf of pdfs) {
      console.log(`\n🔍 ${pdf.name}:`)
      
      if (!pdf.field) {
        console.log('   ❌ No configurado en Contentful')
        continue
      }

      if (!pdf.url) {
        console.log('   ❌ Sin URL')
        continue
      }

      const fullUrl = `https:${pdf.url}`
      console.log(`   📍 URL: ${fullUrl}`)
      
      console.log('   🔄 Verificando accesibilidad...')
      const result = await checkUrl(fullUrl)
      
      if (result.accessible) {
        console.log(`   ✅ Accesible (${result.status})`)
        console.log(`   📋 Content-Type: ${result.contentType}`)
        
        if (result.contentType && result.contentType.includes('pdf')) {
          console.log('   ✅ Es un PDF válido')
        } else {
          console.log('   ⚠️  No es un PDF (content-type inesperado)')
        }
      } else {
        console.log(`   ❌ No accesible (${result.status})`)
      }
    }

    console.log('\n🎉 Verificación de PDFs completada!')
    console.log('\n📝 Para verificar en el navegador:')
    console.log('1. Abre el proyecto: npm run dev')
    console.log('2. Ve a la sección "TIPOLOGÍAS"')
    console.log('3. Haz click en "VER BROCHURE" y "VER PLANTAS"')
    console.log('4. Verifica que se descarguen los PDFs de Contentful')

  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message)
    process.exit(1)
  }
}

verifyPDFs() 