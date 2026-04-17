const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, 'client/public')

const images = [
  'ayudas_diagnosticas.png',
  'banner.png',
  'camilla.png',
  'cirugia.png',
  'fachada.png',
  'fachada2.png',
  'mapa-procesos.jpeg',
  'medicos-juntos.png',
  'ortopedia.png',
  'rehabilitacion.png',
  'urgencias.png',
]

async function convert() {
  for (const file of images) {
    const input = path.join(publicDir, file)
    const output = path.join(publicDir, file.replace(/\.(png|jpeg|jpg)$/, '.webp'))
    const sizeBefore = fs.statSync(input).size
    await sharp(input).webp({ quality: 82 }).toFile(output)
    const sizeAfter = fs.statSync(output).size
    const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0)
    console.log(`✓ ${file} → ${path.basename(output)} (${saved}% menos)`)
  }
  console.log('\nListo. Ahora actualiza las referencias en el código.')
}

convert().catch(console.error)
