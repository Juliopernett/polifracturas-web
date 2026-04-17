import { useState } from 'react'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'
import axios from 'axios'

const types = [
  { value: 'peticion', label: 'Petición', icon: '📝', desc: 'Solicitud de información, documentos o servicios.' },
  { value: 'queja', label: 'Queja', icon: '😞', desc: 'Manifestación de inconformidad con la prestación del servicio.' },
  { value: 'reclamo', label: 'Reclamo', icon: '⚠️', desc: 'Exigencia de reconocimiento o cumplimiento de un derecho.' },
  { value: 'sugerencia', label: 'Sugerencia', icon: '💡', desc: 'Propuesta para mejorar nuestros servicios.' },
]

const initialForm = { type: '', name: '', email: '', phone: '', message: '' }

export default function PQRS() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await axios.post('/api/pqrs', form)
      setTrackingNumber(res.data.trackingNumber)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="PQRS — Peticiones, Quejas, Reclamos y Sugerencias"
        description="Radica tu Petición, Queja, Reclamo o Sugerencia en Polifracturas Ciénaga IPS S.A.S. Respuesta garantizada en máximo 15 días hábiles. Atención al usuario en Ciénaga, Magdalena."
        keywords="PQRS Polifracturas Ciénaga, petición queja reclamo IPS Magdalena, atención al usuario clínica Ciénaga"
        path="/pqrs"
      />
      <PageHero
        title="PQRS"
        subtitle="Peticiones, Quejas, Reclamos y Sugerencias — Polifracturas Ciénaga IPS S.A.S."
      />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" role="group" aria-label="Tipo de solicitud">
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

        {status === 'success' ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center max-w-lg mx-auto" role="alert">
            <div className="text-5xl mb-4" aria-hidden="true">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">PQRS Radicada</h2>
            <p className="text-gray-600 mb-4">Tu solicitud ha sido recibida. Hemos enviado una confirmación a tu correo electrónico.</p>
            <div className="bg-white border border-green-300 rounded-xl p-6">
              <p className="text-sm text-gray-500 mb-1">Número de radicado</p>
              <p className="text-2xl font-bold text-[#1E3A5F] font-mono tracking-widest">{trackingNumber}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">Guarda este número para hacer seguimiento de tu solicitud.</p>
            <button
              onClick={() => { setStatus(null); setTrackingNumber('') }}
              className="mt-6 bg-[#1E3A5F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#162d4a] transition-colors"
            >
              Nueva solicitud
            </button>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-name">Nombre completo *</label>
                <input id="pqrs-name" name="name" value={form.name} onChange={handleChange} required autoComplete="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  placeholder="Tu nombre completo" />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pqrs-message">Descripción detallada *</label>
                <textarea id="pqrs-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896] resize-none"
                  placeholder="Describe detalladamente tu solicitud..." />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
                Al enviar este formulario, recibirás un correo con tu número de radicado para hacer seguimiento a tu solicitud. Tiempo de respuesta: máximo 15 días hábiles.
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors">
                {status === 'loading' ? 'Enviando...' : 'Radicar solicitud'}
              </button>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm text-center" role="alert">
                  ❌ Error al radicar. Por favor intenta de nuevo.
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  )
}
