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
      sender: { name: 'Polifracturas Ciénaga IPS', email: process.env.EMAIL_USER },
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

function generateTrackingNumber() {
  const date = new Date()
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 9000) + 1000
  return `PQRS-${datePart}-${random}`
}

const typeLabels = {
  peticion: 'Petición',
  queja: 'Queja',
  reclamo: 'Reclamo',
  sugerencia: 'Sugerencia',
}

router.post('/', async (req, res) => {
  const { type, name, email, phone, message } = req.body
  if (!type || !name || !email || !message) {
    return res.status(400).json({ error: 'Campos requeridos incompletos.' })
  }

  const trackingNumber = generateTrackingNumber()
  const typeLabel = typeLabels[type] || type

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nueva PQRS [${typeLabel}] - Radicado: ${trackingNumber}`,
      html: `
        <h2>Nueva PQRS recibida</h2>
        <p><strong>Radicado:</strong> ${trackingNumber}</p>
        <p><strong>Tipo:</strong> ${typeLabel}</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Descripción:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    await sendEmail({
      to: email,
      subject: `Confirmación de PQRS - Radicado: ${trackingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E3A5F; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">Polifracturas Ciénaga IPS S.A.S.</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #1E3A5F;">Tu solicitud fue radicada</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Hemos recibido tu <strong>${typeLabel}</strong>. Número de radicado:</p>
            <div style="background: white; border: 2px solid #00A896; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="color: #666; margin: 0 0 8px;">Número de Radicado</p>
              <p style="font-size: 28px; font-weight: bold; color: #1E3A5F; font-family: monospace; margin: 0;">${trackingNumber}</p>
            </div>
            <p>Tiempo de respuesta: máximo <strong>15 días hábiles</strong>.</p>
            <p>Contacto: <strong>(605) 4102804</strong></p>
          </div>
          <div style="background: #1E3A5F; color: white; padding: 15px; text-align: center; font-size: 12px;">
            Carrera 21 #21-24, Ciénaga, Magdalena, Colombia
          </div>
        </div>
      `,
    })

    res.json({ ok: true, trackingNumber })
  } catch (err) {
    console.error('Error procesando PQRS:', err.message)
    res.status(500).json({ error: 'Error al radicar la solicitud.' })
  }
})

module.exports = router
