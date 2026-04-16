const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const nodemailer = require('nodemailer')
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

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

router.post('/', upload.single('cv'), async (req, res) => {
  const { name, email, position, message } = req.body
  if (!name || !email || !position || !req.file) {
    return res.status(400).json({ error: 'Campos requeridos incompletos o archivo faltante.' })
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"Sitio Web Polifracturas" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nueva postulación - ${position} - ${name}`,
      html: `
        <h2>Nueva postulación recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cargo:</strong> ${position}</p>
        <p><strong>Mensaje:</strong> ${message || 'Sin mensaje'}</p>
        <p>La hoja de vida se adjunta a este correo.</p>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Error enviando postulación:', err.message)
    res.status(500).json({ error: 'Error al procesar la postulación.' })
  }
})

module.exports = router
