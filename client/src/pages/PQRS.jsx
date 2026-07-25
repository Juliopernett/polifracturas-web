import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'
import axios from 'axios'

const DRAFT_KEY = 'pqrs_draft'

const types = [
  { value: 'peticion', label: 'Petición', icon: '📝', desc: 'Solicitud de información, documentos o servicios.' },
  { value: 'queja', label: 'Queja', icon: '😞', desc: 'Manifestación de inconformidad con la atención recibida.' },
  { value: 'reclamo', label: 'Reclamo', icon: '⚠️', desc: 'Solicitud para corregir una situación que afectó un derecho.' },
  { value: 'sugerencia', label: 'Sugerencia', icon: '💡', desc: 'Propuesta para mejorar nuestros servicios.' },
  { value: 'felicitacion', label: 'Felicitación', icon: '🎉', desc: 'Reconocimiento por la atención o el servicio recibido.' },
]

const responseTimes = {
  peticion: '15 días hábiles (10 días hábiles si es solicitud de copias o información puntual)',
  queja: '15 días hábiles',
  reclamo: '15 días hábiles',
  sugerencia: 'Sin término legal obligatorio, será revisada a la brevedad',
  felicitacion: 'No requiere respuesta formal',
}

const userTypes = [
  { value: 'paciente', label: 'Paciente' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'acudiente', label: 'Acudiente' },
  { value: 'eps', label: 'EPS' },
  { value: 'particular', label: 'Particular' },
  { value: 'otro', label: 'Otro' },
]

const services = [
  { value: 'consulta_externa', label: 'Consulta externa' },
  { value: 'urgencias', label: 'Urgencias' },
  { value: 'hospitalizacion', label: 'Hospitalización' },
  { value: 'laboratorio', label: 'Laboratorio' },
  { value: 'imagenes', label: 'Imágenes diagnósticas' },
  { value: 'facturacion', label: 'Facturación' },
  { value: 'autorizaciones', label: 'Autorizaciones' },
  { value: 'citas', label: 'Citas' },
  { value: 'farmacia', label: 'Farmacia' },
  { value: 'otro', label: 'Otro' },
]

const channels = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'telefono', label: 'Teléfono' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'pagina_web', label: 'Página web' },
  { value: 'correo', label: 'Correo' },
]

const preferredChannels = [
  { value: 'correo', label: 'Correo electrónico' },
  { value: 'telefono', label: 'Teléfono' },
  { value: 'direccion', label: 'Dirección física' },
]

const initialForm = {
  type: '', name: '', email: '', phone: '',
  userType: '', service: '', channel: '', preferredChannel: 'correo',
  eventDate: '', involvedOfficial: '', message: '',
  dataConsent: false, truthConsent: false, attachment: null,
}

export default function PQRS() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [submission, setSubmission] = useState(null)
  const [draftLoaded, setDraftLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
      if (saved) setForm(f => ({ ...f, ...saved }))
    } catch {
      // borrador corrupto, se ignora
    }
    setDraftLoaded(true)
  }, [])

  useEffect(() => {
    if (!draftLoaded || status === 'success') return
    const { attachment, dataConsent, truthConsent, ...draft } = form
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [form, status, draftLoaded])

  const handleChange = e => {
    const { name, value, type: inputType, checked, files } = e.target
    if (inputType === 'checkbox') setForm(f => ({ ...f, [name]: checked }))
    else if (inputType === 'file') setForm(f => ({ ...f, [name]: files[0] || null }))
    else setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'attachment') {
          if (value) fd.append('attachment', value)
        } else {
          fd.append(key, value)
        }
      })
      const res = await axios.post('/api/pqrs', fd)
      setSubmission({
        trackingNumber: res.data.trackingNumber,
        submittedAt: res.data.submittedAt,
        type: form.type,
        name: form.name,
      })
      setStatus('success')
      localStorage.removeItem(DRAFT_KEY)
      setForm(initialForm)
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Error al radicar. Por favor intenta de nuevo.')
      setStatus('error')
    }
  }

  const downloadReceipt = () => {
    if (!submission) return
    const typeLabel = types.find(t => t.value === submission.type)?.label || submission.type
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Polifracturas Ciénaga IPS S.A.S.', 20, 20)
    doc.setFontSize(12)
    doc.text('Comprobante de radicación de PQRS', 20, 30)
    doc.line(20, 34, 190, 34)
    doc.text(`Número de radicado: ${submission.trackingNumber}`, 20, 48)
    doc.text(`Tipo de solicitud: ${typeLabel}`, 20, 58)
    doc.text(`Nombre: ${submission.name}`, 20, 68)
    doc.text(`Fecha y hora de radicación: ${submission.submittedAt}`, 20, 78)
    doc.text('Tiempo de respuesta estimado:', 20, 92)
    doc.text(doc.splitTextToSize(responseTimes[submission.type] || 'Máximo 15 días hábiles.', 170), 20, 100)
    doc.setFontSize(10)
    doc.text('Carrera 21 #21-24, Ciénaga, Magdalena · (605) 4102804', 20, 280)
    doc.save(`${submission.trackingNumber}.pdf`)
  }

  return (
    <>
      <SEO
        title="PQRS — Peticiones, Quejas, Reclamos y Sugerencias"
        description="Radica tu Petición, Queja, Reclamo, Sugerencia o Felicitación en Polifracturas Ciénaga IPS S.A.S. Respuesta conforme a la Ley 1755 de 2015. Atención al usuario en Ciénaga, Magdalena."
        keywords="PQRS Polifracturas Ciénaga, petición queja reclamo IPS Magdalena, atención al usuario clínica Ciénaga"
        path="/pqrs"
      />
      <PageHero
        title="PQRS"
        subtitle="Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones — Polifracturas Ciénaga IPS S.A.S."
      />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8" role="group" aria-label="Tipo de solicitud">
          {types.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setForm(f => ({ ...f, type: t.value }))}
              aria-pressed={form.type === t.value}
              className={`rounded-xl p-5 text-left border-2 transition-colors ${
                form.type === t.value
                  ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                  : 'border-gray-200 bg-white hover:border-[#1E3A5F]/40'
              }`}
            >
              <div className="text-3xl mb-2" aria-hidden="true">{t.icon}</div>
              <div className={`font-bold text-sm mb-1 ${form.type === t.value ? 'text-white' : 'text-[#1E3A5F]'}`}>{t.label}</div>
              <div className={`text-xs leading-relaxed ${form.type === t.value ? 'text-white/80' : 'text-gray-500'}`}>{t.desc}</div>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12 overflow-x-auto">
          <h2 className="font-bold text-[#1E3A5F] mb-3 text-sm uppercase tracking-wide">Términos de respuesta (Ley 1755 de 2015)</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4 font-medium">Tipo de solicitud</th>
                <th className="py-2 font-medium">Tiempo de respuesta</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Solicitud de información o copia de documentos</td>
                <td className="py-2">10 días hábiles</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Petición general, queja o reclamo</td>
                <td className="py-2">15 días hábiles</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Consulta</td>
                <td className="py-2">30 días hábiles</td>
              </tr>
            </tbody>
          </table>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center max-w-lg mx-auto" role="alert">
            <div className="text-5xl mb-4" aria-hidden="true">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">PQRS Radicada</h2>
            <p className="text-gray-600 mb-4">Tu solicitud ha sido recibida. Hemos enviado una confirmación a tu correo electrónico.</p>
            <div className="bg-white border border-green-300 rounded-xl p-6">
              <p className="text-sm text-gray-500 mb-1">Número de radicado</p>
              <p className="text-2xl font-bold text-[#1E3A5F] font-mono tracking-widest">{submission.trackingNumber}</p>
              <p className="text-xs text-gray-400 mt-2">{submission.submittedAt}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">Guarda este número para hacer seguimiento de tu solicitud.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <button
                onClick={downloadReceipt}
                className="bg-[#00A896] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00897d] transition-colors"
              >
                Descargar comprobante (PDF)
              </button>
              <button
                onClick={() => { setStatus(null); setSubmission(null) }}
                className="bg-[#1E3A5F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#162d4a] transition-colors"
              >
                Nueva solicitud
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Registrar solicitud</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-type">Tipo de solicitud *</label>
                <select
                  id="pqrs-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                >
                  <option value="">Selecciona el tipo...</option>
                  {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-name">Nombre completo *</label>
                  <input id="pqrs-name" name="name" value={form.name} onChange={handleChange} required autoComplete="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-userType">Tipo de usuario *</label>
                  <select id="pqrs-userType" name="userType" value={form.userType} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]">
                    <option value="">Selecciona...</option>
                    {userTypes.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-email">Correo electrónico *</label>
                  <input id="pqrs-email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    placeholder="correo@ejemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-phone">Teléfono</label>
                  <input id="pqrs-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    placeholder="(+57) 300 000 0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-service">Servicio relacionado *</label>
                  <select id="pqrs-service" name="service" value={form.service} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]">
                    <option value="">Selecciona...</option>
                    {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-channel">Canal por el que ocurrió el hecho *</label>
                  <select id="pqrs-channel" name="channel" value={form.channel} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]">
                    <option value="">Selecciona...</option>
                    {channels.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-preferredChannel">Canal de respuesta preferido *</label>
                  <select id="pqrs-preferredChannel" name="preferredChannel" value={form.preferredChannel} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]">
                    {preferredChannels.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-eventDate">Fecha del evento (opcional)</label>
                  <input id="pqrs-eventDate" name="eventDate" type="date" value={form.eventDate} onChange={handleChange}
                    max={new Date().toISOString().slice(0, 10)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-involvedOfficial">Funcionario involucrado (opcional)</label>
                <input id="pqrs-involvedOfficial" name="involvedOfficial" value={form.involvedOfficial} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  placeholder="Nombre del funcionario, si aplica" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-message">Descripción detallada *</label>
                <textarea id="pqrs-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896] resize-none"
                  placeholder="Describe detalladamente tu solicitud..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-attachment">Adjuntar soporte (opcional)</label>
                <input id="pqrs-attachment" name="attachment" type="file" onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#1E3A5F] file:text-white file:text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]" />
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG o Word — máximo 10 MB.</p>
              </div>

              {form.type && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
                  Tiempo de respuesta estimado para esta solicitud: <strong>{responseTimes[form.type]}</strong>. Las respuestas se emiten conforme a la Ley 1755 de 2015.
                </div>
              )}

              <div className="space-y-3 border-t border-gray-100 pt-5">
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input type="checkbox" name="dataConsent" checked={form.dataConsent} onChange={handleChange} required
                    className="mt-0.5" />
                  <span>
                    Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012. Consulta nuestra{' '}
                    <a href="/politica-tratamiento-datos" target="_blank" rel="noreferrer" className="text-[#00A896] font-semibold hover:underline">
                      Política de Tratamiento de Datos
                    </a>. *
                  </span>
                </label>
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input type="checkbox" name="truthConsent" checked={form.truthConsent} onChange={handleChange} required
                    className="mt-0.5" />
                  <span>Declaro que la información suministrada en este formulario es veraz. *</span>
                </label>
              </div>

              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors">
                {status === 'loading' ? 'Enviando...' : 'Radicar solicitud'}
              </button>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm text-center" role="alert">
                  ❌ {errorMsg}
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  )
}
