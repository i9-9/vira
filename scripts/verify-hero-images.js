#!/usr/bin/env node

/**
 * Script para verificar que las hero images de Contentful se pueden cargar
 * Uso: node scripts/verify-hero-images.js
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
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length']
      })
    })
    
    req.on('error', () => {
      resolve({
        status: 'ERROR',
        accessible: false,
        contentType: null,
        contentLength: null
      })
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        status: 'TIMEOUT',
        accessible: false,
        contentType: null,
        contentLength: null
      })
    })
  })
}

async function verifyHeroImages() {
  console.log('🔍 Verificando Hero Images de Contentful...\n')

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

    // Verificar Hero Images
    console.log('🖼️ Verificando Hero Images:')
    
    const heroImages = [
      {
        name: 'Left (Interior)',
        field: fields.heroLeftImage,
        url: fields.heroLeftImage?.fields?.file?.url
      },
      {
        name: 'Right (Pileta)',
        field: fields.heroRightImage,
        url: fields.heroRightImage?.fields?.file?.url
      }
    ]

    for (const image of heroImages) {
      console.log(`\n🔍 ${image.name}:`)
      
      if (!image.field) {
        console.log('   ❌ No configurado en Contentful')
        continue
      }

      if (!image.url) {
        console.log('   ❌ Sin URL')
        continue
      }

      const fullUrl = `https:${image.url}`
      console.log(`   📍 URL: ${fullUrl}`)
      
      console.log('   🔄 Verificando accesibilidad...')
      const result = await checkUrl(fullUrl)
      
      if (result.accessible) {
        console.log(`   ✅ Accesible (${result.status})`)
        console.log(`   📋 Content-Type: ${result.contentType}`)
        console.log(`   📏 Tamaño: ${result.contentLength ? Math.round(result.contentLength / 1024) + ' KB' : 'Desconocido'}`)
        
        if (result.contentType && result.contentType.includes('image')) {
          console.log('   ✅ Es una imagen válida')
        } else {
          console.log('   ⚠️  No es una imagen (content-type inesperado)')
        }
      } else {
        console.log(`   ❌ No accesible (${result.status})`)
      }
    }

    // Mostrar URLs optimizadas que usa el código
    console.log('\n🔧 URLs optimizadas que usa el código:')
    const leftOptimized = fields.heroLeftImage?.fields?.file?.url 
      ? `https:${fields.heroLeftImage.fields.file.url}?fm=webp&q=90&w=1920&h=1080&fit=fill`
      : null
    const rightOptimized = fields.heroRightImage?.fields?.file?.url 
      ? `https:${fields.heroRightImage.fields.file.url}?fm=webp&q=90&w=1920&h=1080&fit=fill`
      : null
    
    console.log('   Left optimizada:', leftOptimized ? '✅ Generada' : '❌ No disponible')
    console.log('   Right optimizada:', rightOptimized ? '✅ Generada' : '❌ No disponible')

    console.log('\n🎉 Verificación de Hero Images completada!')
    console.log('\n📝 Para verificar en el navegador:')
    console.log('1. Abre el proyecto: npm run dev')
    console.log('2. Ve a la sección hero (inicio de la página)')
    console.log('3. Verifica que las dos imágenes se carguen correctamente')
    console.log('4. Presiona Ctrl+Shift+D para ver el debugger')

  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message)
    process.exit(1)
  }
}

verifyHeroImages() 