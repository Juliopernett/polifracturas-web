const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${Date.now()}_${safe}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Solo se aceptan archivos PDF.'))
  },
})

async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Sitio Web Polifracturas', email: process.env.EMAIL_USER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
}

router.post('/', upload.single('cv'), async (req, res) => {
  const { name, email, position, message } = req.body
  if (!name || !email || !position || !req.file) {
    return res.status(400).json({ error: 'Campos requeridos incompletos o archivo faltante.' })
  }

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nueva postulación - ${position} - ${name}`,
      html: `
        <h2>Nueva postulación recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cargo:</strong> ${position}</p>
        <p><strong>Mensaje:</strong> ${message || 'Sin mensaje'}</p>
        <p><em>La hoja de vida fue guardada en el servidor.</em></p>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Error enviando postulación:', err.message)
    res.status(500).json({ error: 'Error al procesar la postulación.' })
  }
})

module.exports = router
