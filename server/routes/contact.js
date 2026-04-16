const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

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

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos requeridos incompletos.' })
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"Sitio Web Polifracturas" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nuevo mensaje de contacto - ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Error enviando email de contacto:', err.message, err.code, err.response)
    res.status(500).json({ error: 'Error al enviar el mensaje.' })
  }
})

module.exports = router
