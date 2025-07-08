#!/usr/bin/env node

/**
 * Script para verificar la conexión con Contentful y los assets disponibles
 * Uso: node scripts/verify-contentful.js
 */

const fs = require('fs')
const path = require('path')

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

// Combinar variables (local tiene prioridad)
Object.assign(process.env, env, envLocal)

const { createClient } = require('contentful')

async function verifyContentful() {
  console.log('🔍 Verificando conexión con Contentful...\n')

  // Verificar variables de entorno
  const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

  if (!spaceId || !accessToken) {
    console.error('❌ Error: Variables de entorno no configuradas')
    console.log('')
    console.log('Verificando archivos de entorno:')
    console.log('  .env.local: ' + (fs.existsSync('.env.local') ? '✅ Existe' : '❌ No existe'))
    console.log('  .env: ' + (fs.existsSync('.env') ? '✅ Existe' : '❌ No existe'))
    console.log('')
    console.log('Variables encontradas:')
    console.log('  CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID ? '✅' : '❌')
    console.log('  CONTENTFUL_ACCESS_TOKEN:', process.env.CONTENTFUL_ACCESS_TOKEN ? '✅' : '❌')
    console.log('  NEXT_PUBLIC_CONTENTFUL_SPACE_ID:', process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ? '✅' : '❌')
    console.log('  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? '✅' : '❌')
    console.log('')
    console.log('Para Vercel (recomendado):')
    console.log('  CONTENTFUL_SPACE_ID=tu_space_id')
    console.log('  CONTENTFUL_ACCESS_TOKEN=tu_access_token')
    console.log('')
    console.log('Para Static Export:')
    console.log('  NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id')
    console.log('  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token')
    process.exit(1)
  }

  console.log('✅ Variables de entorno encontradas')
  console.log(`   Space ID: ${spaceId}`)
  console.log(`   Access Token: ${accessToken.substring(0, 10)}...`)
  console.log('')

  try {
    // Crear cliente
    const client = createClient({
      space: spaceId,
      accessToken: accessToken,
    })

    console.log('🔄 Conectando a Contentful...')

    // Verificar conexión básica
    const space = await client.getSpace()
    console.log(`✅ Conectado al espacio: "${space.name}"`)
    console.log('')

    // Buscar landing assets
    console.log('🔍 Buscando landing assets...')
    const entries = await client.getEntries({
      content_type: 'landingAssets',
      limit: 1,
    })

    if (entries.items.length === 0) {
      console.error('❌ No se encontraron landing assets')
      console.log('')
      console.log('Asegúrate de que:')
      console.log('1. Existe un content type llamado "landingAssets"')
      console.log('2. Hay al menos una entrada de este tipo')
      console.log('3. Los campos están configurados correctamente')
      process.exit(1)
    }

    const entry = entries.items[0]
    const fields = entry.fields

    console.log(`✅ Landing assets encontrados: "${fields.name || 'Sin nombre'}"`)
    console.log('')

    // Mostrar todos los campos disponibles para debugging
    console.log('🔍 Campos disponibles en el content type:')
    Object.keys(fields).forEach(key => {
      const value = fields[key]
      if (value && typeof value === 'object' && value.fields) {
        console.log(`   📁 ${key}: Asset (${value.fields.file?.url ? '✅ Con URL' : '❌ Sin URL'})`)
      } else if (Array.isArray(value)) {
        console.log(`   📁 ${key}: Array (${value.length} items)`)
      } else {
        console.log(`   📄 ${key}: ${typeof value} (${value})`)
      }
    })
    console.log('')

    // Verificar campos específicos
    console.log('📊 Verificando campos:')
    
    // Hero Images
    console.log('')
    console.log('🖼️  Hero Images:')
    if (fields.heroLeftImage) {
      console.log(`   ✅ Left: ${fields.heroLeftImage.fields.file.url}`)
    } else {
      console.log('   ❌ Left: No configurado')
    }
    
    if (fields.heroRightImage) {
      console.log(`   ✅ Right: ${fields.heroRightImage.fields.file.url}`)
    } else {
      console.log('   ❌ Right: No configurado')
    }

    // Gallery Images
    console.log('')
    console.log('📸 Gallery Images:')
    if (fields.galleryImages && fields.galleryImages.length > 0) {
      console.log(`   ✅ ${fields.galleryImages.length} imágenes configuradas`)
      fields.galleryImages.forEach((img, i) => {
        console.log(`      ${i + 1}. ${img.fields.file.url}`)
      })
    } else {
      console.log('   ❌ No configuradas')
    }

    // Lifestyle Images
    console.log('')
    console.log('🏠 Lifestyle Images:')
    if (fields.lifestyleImages && fields.lifestyleImages.length > 0) {
      console.log(`   ✅ ${fields.lifestyleImages.length} imágenes configuradas`)
      fields.lifestyleImages.forEach((img, i) => {
        console.log(`      ${i + 1}. ${img.fields.file.url}`)
      })
    } else {
      console.log('   ❌ No configuradas')
    }

    // Documents
    console.log('')
    console.log('📄 Documents:')
    if (fields.brochurePdf) {
      console.log(`   ✅ Brochure: ${fields.brochurePdf.fields.file.url}`)
    } else {
      console.log('   ❌ Brochure: No configurado')
    }
    
    if (fields.typologiesPdf) {
      console.log(`   ✅ Typologies: ${fields.typologiesPdf.fields.file.url}`)
    } else {
      console.log('   ❌ Typologies: No configurado')
    }

    console.log('')
    console.log('🎉 Verificación completada exitosamente!')
    console.log('')
    console.log('📝 Próximos pasos:')
    console.log('1. Ejecuta el proyecto: npm run dev')
    console.log('2. Presiona Ctrl+Shift+D para abrir el debugger')
    console.log('3. Verifica que todos los assets se muestren en verde')

  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message)
    
    if (error.message.includes('401')) {
      console.log('')
      console.log('💡 Posible solución: Verifica que el access token sea correcto')
    } else if (error.message.includes('404')) {
      console.log('')
      console.log('💡 Posible solución: Verifica que el space ID sea correcto')
    }
    
    process.exit(1)
  }
}

// Ejecutar verificación
verifyContentful() 