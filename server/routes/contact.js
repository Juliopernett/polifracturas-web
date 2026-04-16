const express = require('express')
const router = express.Router()

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

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos requeridos incompletos.' })
  }

  try {
    await sendEmail({
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
    console.error('Error enviando email de contacto:', err.message)
    res.status(500).json({ error: 'Error al enviar el mensaje.' })
  }
})

module.exports = router
