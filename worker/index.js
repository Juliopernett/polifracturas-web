// Cloudflare Worker: sirve el build de React (assets) y atiende /api/* (formularios vía Brevo).
// Reemplaza al servidor Express de server/ — mismas rutas, mismos correos, mismas respuestas.

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const multiline = (v) => esc(v).replace(/\n/g, '<br>')

const oneLine = (v) => String(v ?? '').replace(/[\r\n]+/g, ' ')

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(bin)
}

async function sendEmail(env, { senderName, to, subject, html, attachment }) {
  const res = await fetch(env.BREVO_API_URL || BREVO_URL, {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: senderName, email: env.EMAIL_USER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      ...(attachment ? { attachment } : {}),
    }),
  })
  if (!res.ok) throw new Error(await res.text())
}

// Devuelve { error } si el archivo no cumple, { attachment } si es válido, {} si no hay archivo.
async function readFile(file, { maxBytes, mimes, mimeError }) {
  if (!file || typeof file === 'string' || !file.size) return {}
  if (file.size > maxBytes) return { error: `El archivo supera ${maxBytes / 1024 / 1024} MB.` }
  if (!mimes.includes(file.type)) return { error: mimeError }
  const safeName = (file.name || 'archivo').replace(/[^a-zA-Z0-9._-]/g, '_')
  return { attachment: [{ content: toBase64(await file.arrayBuffer()), name: safeName }] }
}

const str = (form, key) => {
  const v = form.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

// ── /api/contact ─────────────────────────────────────────────
async function contact(request, env) {
  const body = await request.json().catch(() => ({}))
  const { name, email, phone, message } = body
  if (!name || !email || !message) return json({ error: 'Campos requeridos incompletos.' }, 400)

  try {
    await sendEmail(env, {
      senderName: 'Sitio Web Polifracturas',
      to: env.ADMIN_EMAIL,
      subject: `Nuevo mensaje de contacto - ${oneLine(name)}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Teléfono:</strong> ${esc(phone) || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${multiline(message)}</p>
      `,
    })
    return json({ ok: true })
  } catch (err) {
    console.error('Error enviando email de contacto:', err.message)
    return json({ error: 'Error al enviar el mensaje.' }, 500)
  }
}

// ── /api/jobs ────────────────────────────────────────────────
async function jobs(request, env) {
  const form = await request.formData().catch(() => null)
  if (!form) return json({ error: 'Campos requeridos incompletos o archivo faltante.' }, 400)
  const name = str(form, 'name')
  const email = str(form, 'email')
  const position = str(form, 'position')
  const message = str(form, 'message')

  const cv = await readFile(form.get('cv'), {
    maxBytes: 5 * 1024 * 1024,
    mimes: ['application/pdf'],
    mimeError: 'Solo se aceptan archivos PDF.',
  })
  if (cv.error) return json({ error: cv.error }, 400)
  if (!name || !email || !position || !cv.attachment) {
    return json({ error: 'Campos requeridos incompletos o archivo faltante.' }, 400)
  }

  try {
    await sendEmail(env, {
      senderName: 'Sitio Web Polifracturas',
      to: env.ADMIN_EMAIL,
      subject: oneLine(`Nueva postulación - ${position} - ${name}`),
      html: `
        <h2>Nueva postulación recibida</h2>
        <p><strong>Nombre:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Cargo:</strong> ${esc(position)}</p>
        <p><strong>Mensaje:</strong> ${esc(message) || 'Sin mensaje'}</p>
        <p>La hoja de vida se adjunta a este correo.</p>
      `,
      attachment: cv.attachment,
    })
    return json({ ok: true })
  } catch (err) {
    console.error('Error enviando postulación:', err.message)
    return json({ error: 'Error al procesar la postulación.' }, 500)
  }
}

// ── /api/pqrs ────────────────────────────────────────────────
const typeLabels = { peticion: 'Petición', queja: 'Queja', reclamo: 'Reclamo', sugerencia: 'Sugerencia', felicitacion: 'Felicitación' }
const responseInfo = {
  peticion: '15 días hábiles (10 días hábiles si es solicitud de copias o información puntual), conforme a la Ley 1755 de 2015.',
  queja: '15 días hábiles, conforme a la Ley 1755 de 2015.',
  reclamo: '15 días hábiles, conforme a la Ley 1755 de 2015.',
  sugerencia: 'Será revisada y tenida en cuenta por el área correspondiente. No tiene un término de respuesta legal obligatorio.',
  felicitacion: '¡Gracias por tu mensaje! No requiere una respuesta formal, pero será compartido con el equipo.',
}
const priorityByType = { reclamo: 'Alta', queja: 'Alta', peticion: 'Media', sugerencia: 'Baja', felicitacion: 'Baja' }
const userTypeLabels = { paciente: 'Paciente', familiar: 'Familiar', acudiente: 'Acudiente', eps: 'EPS', particular: 'Particular', otro: 'Otro' }
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
const channelLabels = { presencial: 'Presencial', telefono: 'Teléfono', whatsapp: 'WhatsApp', pagina_web: 'Página web', correo: 'Correo' }
const preferredChannelLabels = { correo: 'Correo electrónico', telefono: 'Teléfono', direccion: 'Dirección física' }

const PQRS_MIMES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function generateTrackingNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = (crypto.getRandomValues(new Uint32Array(1))[0] % 9000) + 1000
  return `PQRS-${datePart}-${random}`
}

async function pqrs(request, env) {
  const form = await request.formData().catch(() => null)
  if (!form) return json({ error: 'Campos requeridos incompletos.' }, 400)

  const type = str(form, 'type')
  const name = str(form, 'name')
  const email = str(form, 'email')
  const phone = str(form, 'phone')
  const message = str(form, 'message')
  const userType = str(form, 'userType')
  const service = str(form, 'service')
  const channel = str(form, 'channel')
  const preferredChannel = str(form, 'preferredChannel')
  const eventDate = str(form, 'eventDate')
  const involvedOfficial = str(form, 'involvedOfficial')

  if (
    !type || !name || !email || !message || !userType || !service || !channel || !preferredChannel ||
    str(form, 'dataConsent') !== 'true' || str(form, 'truthConsent') !== 'true'
  ) {
    return json({ error: 'Campos requeridos incompletos.' }, 400)
  }

  const file = await readFile(form.get('attachment'), {
    maxBytes: 10 * 1024 * 1024,
    mimes: PQRS_MIMES,
    mimeError: 'Solo se aceptan archivos PDF, JPG, PNG o Word.',
  })
  if (file.error) return json({ error: file.error }, 400)

  const trackingNumber = generateTrackingNumber()
  const typeLabel = typeLabels[type] || type
  const priority = priorityByType[type] || 'Media'
  const submittedAt = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'long', timeStyle: 'short' })

  try {
    await sendEmail(env, {
      senderName: 'Polifracturas Ciénaga IPS',
      to: env.ADMIN_EMAIL,
      subject: oneLine(`Nueva PQRS [${typeLabel}] - Prioridad ${priority} - Radicado: ${trackingNumber}`),
      html: `
        <h2>Nueva PQRS recibida</h2>
        <p><strong>Radicado:</strong> ${trackingNumber}</p>
        <p><strong>Fecha y hora:</strong> ${esc(submittedAt)}</p>
        <p><strong>Tipo:</strong> ${esc(typeLabel)}</p>
        <p><strong>Prioridad:</strong> ${priority}</p>
        <p><strong>Nombre:</strong> ${esc(name)}</p>
        <p><strong>Tipo de usuario:</strong> ${esc(userTypeLabels[userType] || userType)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Teléfono:</strong> ${esc(phone) || 'No proporcionado'}</p>
        <p><strong>Servicio relacionado:</strong> ${esc(serviceLabels[service] || service)}</p>
        <p><strong>Canal por el que ocurrió el hecho:</strong> ${esc(channelLabels[channel] || channel)}</p>
        <p><strong>Canal de respuesta preferido:</strong> ${esc(preferredChannelLabels[preferredChannel] || preferredChannel)}</p>
        <p><strong>Fecha del evento:</strong> ${esc(eventDate) || 'No especificada'}</p>
        <p><strong>Funcionario involucrado:</strong> ${esc(involvedOfficial) || 'No especificado'}</p>
        <p><strong>Descripción:</strong></p>
        <p>${multiline(message)}</p>
        ${file.attachment ? '<p>Se adjunta soporte enviado por el usuario.</p>' : ''}
      `,
      attachment: file.attachment,
    })

    await sendEmail(env, {
      senderName: 'Polifracturas Ciénaga IPS',
      to: email,
      subject: `Confirmación de PQRS - Radicado: ${trackingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E3A5F; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">Polifracturas Ciénaga IPS S.A.S.</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #1E3A5F;">Tu solicitud fue radicada</h2>
            <p>Hola <strong>${esc(name)}</strong>,</p>
            <p>Hemos recibido tu <strong>${esc(typeLabel)}</strong> el ${esc(submittedAt)}. Número de radicado:</p>
            <div style="background: white; border: 2px solid #00A896; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="color: #666; margin: 0 0 8px;">Número de Radicado</p>
              <p style="font-size: 28px; font-weight: bold; color: #1E3A5F; font-family: monospace; margin: 0;">${trackingNumber}</p>
            </div>
            <p><strong>Tiempo de respuesta:</strong> ${esc(responseInfo[type] || 'Máximo 15 días hábiles.')}</p>
            <p>Te responderemos por el canal que indicaste: <strong>${esc(preferredChannelLabels[preferredChannel] || preferredChannel)}</strong>.</p>
            <p>Contacto: <strong>(605) 4102804</strong></p>
          </div>
          <div style="background: #1E3A5F; color: white; padding: 15px; text-align: center; font-size: 12px;">
            Carrera 21 #21-24, Ciénaga, Magdalena, Colombia
          </div>
        </div>
      `,
    })

    return json({ ok: true, trackingNumber, submittedAt })
  } catch (err) {
    console.error('Error procesando PQRS:', err.message)
    return json({ error: 'Error al radicar la solicitud.' }, 500)
  }
}

const routes = { '/api/contact': contact, '/api/jobs': jobs, '/api/pqrs': pqrs }

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/health') return json({ ok: true })

    const handler = routes[pathname]
    if (handler) {
      if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405)
      return handler(request, env)
    }
    if (pathname.startsWith('/api/')) return json({ error: 'No encontrado.' }, 404)
    return env.ASSETS.fetch(request)
  },
}
