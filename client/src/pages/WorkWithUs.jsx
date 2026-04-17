import { useState } from 'react'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'
import axios from 'axios'

const vacancies = [
  { title: 'Médico Especialista en Ortopedia', area: 'Área Médica', type: 'Tiempo Completo', desc: 'Se requiere especialista en ortopedia y traumatología con experiencia mínima de 2 años.' },
  { title: 'Fisioterapeuta', area: 'Rehabilitación', type: 'Tiempo Completo', desc: 'Profesional en fisioterapia con conocimiento en rehabilitación musculoesquelética y neurológica.' },
  { title: 'Enfermero/a Jefe', area: 'Urgencias', type: 'Turnos Rotativos', desc: 'Enfermero/a jefe con experiencia en urgencias y manejo de pacientes críticos.' },
  { title: 'Auxiliar de Enfermería', area: 'Hospitalización', type: 'Turnos Rotativos', desc: 'Auxiliar de enfermería con experiencia en atención hospitalaria y cuidado del paciente.' },
]

const initialForm = { name: '', email: '', position: '', message: '' }

export default function WorkWithUs() {
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [fileError, setFileError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleFile = e => {
    const f = e.target.files[0]
    if (!f) return
    if (f.type !== 'application/pdf') {
      setFileError('Solo se aceptan archivos PDF.')
      setFile(null)
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setFileError('El archivo no debe superar 5 MB.')
      setFile(null)
      return
    }
    setFileError('')
    setFile(f)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!file) { setFileError('Por favor adjunta tu hoja de vida en PDF.'); return }
    setStatus('loading')
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    data.append('cv', file)
    try {
      await axios.post('/api/jobs', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      setStatus('success')
      setForm(initialForm)
      setFile(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Trabaja con Nosotros — Vacantes en Ciénaga, Magdalena"
        description="Trabaja con Polifracturas Ciénaga IPS S.A.S. Vacantes para médicos especialistas en ortopedia, fisioterapeutas y enfermeros en Ciénaga, Magdalena. Envía tu hoja de vida."
        keywords="vacantes ortopedia Ciénaga, trabajo fisioterapeuta Magdalena, empleo IPS Ciénaga, trabajo médico ortopedista Santa Marta"
        path="/trabaja"
      />
      <PageHero
        title="Trabaja con Nosotros"
        subtitle="Únete a nuestro equipo de profesionales comprometidos con la salud en Ciénaga, Magdalena."
      />

      <section className="py-16 px-6 max-w-6xl mx-auto">
        {/* Vacantes */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8 text-center">Vacantes Disponibles en Ciénaga</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vacancies.map(v => (
              <article key={v.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-[#1E3A5F] text-lg leading-tight">{v.title}</h3>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-1 rounded-full font-medium">{v.area}</span>
                  <span className="text-xs bg-[#00A896]/10 text-[#00A896] px-2 py-1 rounded-full font-medium">{v.type}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">Envía tu hoja de vida</h2>
          <p className="text-gray-500 text-sm mb-6">Completa el formulario y adjunta tu CV en formato PDF (máx. 5 MB).</p>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="job-name">Nombre completo *</label>
              <input id="job-name" name="name" value={form.name} onChange={handleChange} required autoComplete="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="job-email">Correo electrónico *</label>
              <input id="job-email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                placeholder="correo@ejemplo.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="job-position">Cargo al que aplica *</label>
              <input id="job-position" name="position" value={form.position} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                placeholder="Ej: Fisioterapeuta, Médico Especialista..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="job-message">Mensaje (opcional)</label>
              <textarea id="job-message" name="message" value={form.message} onChange={handleChange} rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896] resize-none"
                placeholder="Cuéntanos sobre ti..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="job-cv">Hoja de vida (PDF) *</label>
              <input id="job-cv" type="file" accept=".pdf" onChange={handleFile}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E3A5F] file:text-white hover:file:bg-[#162d4a] file:cursor-pointer" />
              {fileError && <p className="text-red-500 text-xs mt-1" role="alert">{fileError}</p>}
              {file && <p className="text-green-600 text-xs mt-1">✅ {file.name}</p>}
            </div>
            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors">
              {status === 'loading' ? 'Enviando...' : 'Enviar postulación'}
            </button>
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm text-center" role="alert">
                ✅ Postulación recibida. Nos pondremos en contacto si tu perfil califica.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm text-center" role="alert">
                ❌ Error al enviar. Por favor intenta de nuevo.
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
