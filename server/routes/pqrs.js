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

const allowedMimes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Solo se aceptan archivos PDF, JPG, PNG o Word.'))
  },
})

async function sendEmail({ to, subject, html, attachment }) {
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
      ...(attachment ? { attachment } : {}),
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
  felicitacion: 'Felicitación',
}

const responseInfo = {
  peticion: '15 días hábiles (10 días hábiles si es solicitud de copias o información puntual), conforme a la Ley 1755 de 2015.',
  queja: '15 días hábiles, conforme a la Ley 1755 de 2015.',
  reclamo: '15 días hábiles, conforme a la Ley 1755 de 2015.',
  sugerencia: 'Será revisada y tenida en cuenta por el área correspondiente. No tiene un término de respuesta legal obligatorio.',
  felicitacion: '¡Gracias por tu mensaje! No requiere una respuesta formal, pero será compartido con el equipo.',
}

const priorityByType = {
  reclamo: 'Alta',
  queja: 'Alta',
  peticion: 'Media',
  sugerencia: 'Baja',
  felicitacion: 'Baja',
}

const userTypeLabels = {
  paciente: 'Paciente',
  familiar: 'Familiar',
  acudiente: 'Acudiente',
  eps: 'EPS',
  particular: 'Particular',
  otro: 'Otro',
}

const serviceLabels = {
  consulta_externa: 'Consulta externa',
  urgencias: 'Urgencias',
  hospitalizacion: 'Hospitalización',
  laboratorio: 'Laboratorio',
  imagenes: 'Imágenes diagnósticas',
  facturacion: 'Facturación',
  autorizaciones: 'Autorizaciones',
  citas: 'Citas',
  farmacia: 'Farmacia',
  otro: 'Otro',
}

const channelLabels = {
  presencial: 'Presencial',
  telefono: 'Teléfono',
  whatsapp: 'WhatsApp',
  pagina_web: 'Página web',
  correo: 'Correo',
}

const preferredChannelLabels = {
  correo: 'Correo electrónico',
  telefono: 'Teléfono',
  direccion: 'Dirección física',
}

router.post('/', upload.single('attachment'), async (req, res) => {
  const {
    type, name, email, phone, message,
    userType, service, channel, preferredChannel,
    eventDate, involvedOfficial, dataConsent, truthConsent,
  } = req.body

  if (
    !type || !name || !email || !message ||
    !userType || !service || !channel || !preferredChannel ||
    dataConsent !== 'true' || truthConsent !== 'true'
  ) {
    if (req.file) fs.unlinkSync(req.file.path)
    return res.status(400).json({ error: 'Campos requeridos incompletos.' })
  }

  const trackingNumber = generateTrackingNumber()
  const typeLabel = typeLabels[type] || type
  const priority = priorityByType[type] || 'Media'
  const now = new Date()
  const submittedAt = now.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  let attachmentPayload
  try {
    if (req.file) {
      const fileBase64 = fs.readFileSync(req.file.path).toString('base64')
      attachmentPayload = [{ content: fileBase64, name: req.file.originalname }]
    }

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nueva PQRS [${typeLabel}] - Prioridad ${priority} - Radicado: ${trackingNumber}`,
      html: `
        <h2>Nueva PQRS recibida</h2>
        <p><strong>Radicado:</strong> ${trackingNumber}</p>
        <p><strong>Fecha y hora:</strong> ${submittedAt}</p>
        <p><strong>Tipo:</strong> ${typeLabel}</p>
        <p><strong>Prioridad:</strong> ${priority}</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Tipo de usuario:</strong> ${userTypeLabels[userType] || userType}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Servicio relacionado:</strong> ${serviceLabels[service] || service}</p>
        <p><strong>Canal por el que ocurrió el hecho:</strong> ${channelLabels[channel] || channel}</p>
        <p><strong>Canal de respuesta preferido:</strong> ${preferredChannelLabels[preferredChannel] || preferredChannel}</p>
        <p><strong>Fecha del evento:</strong> ${eventDate || 'No especificada'}</p>
        <p><strong>Funcionario involucrado:</strong> ${involvedOfficial || 'No especificado'}</p>
        <p><strong>Descripción:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${req.file ? '<p>Se adjunta soporte enviado por el usuario.</p>' : ''}
      `,
      attachment: attachmentPayload,
    })

    if (req.file) fs.unlinkSync(req.file.path)

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
            <p>Hemos recibido tu <strong>${typeLabel}</strong> el ${submittedAt}. Número de radicado:</p>
            <div style="background: white; border: 2px solid #00A896; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="color: #666; margin: 0 0 8px;">Número de Radicado</p>
              <p style="font-size: 28px; font-weight: bold; color: #1E3A5F; font-family: monospace; margin: 0;">${trackingNumber}</p>
            </div>
            <p><strong>Tiempo de respuesta:</strong> ${responseInfo[type] || 'Máximo 15 días hábiles.'}</p>
            <p>Te responderemos por el canal que indicaste: <strong>${preferredChannelLabels[preferredChannel] || preferredChannel}</strong>.</p>
            <p>Contacto: <strong>(605) 4102804</strong></p>
          </div>
          <div style="background: #1E3A5F; color: white; padding: 15px; text-align: center; font-size: 12px;">
            Carrera 21 #21-24, Ciénaga, Magdalena, Colombia
          </div>
        </div>
      `,
    })

    res.json({ ok: true, trackingNumber, submittedAt })
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
    console.error('Error procesando PQRS:', err.message)
    res.status(500).json({ error: 'Error al radicar la solicitud.' })
  }
})

module.exports = router
