import { useState } from 'react'
import PageHero from '../components/PageHero'
import axios from 'axios'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <PageHero
        title="Contáctanos"
        subtitle="Estamos para atenderte. Escríbenos o llámanos."
        bgImage="/rehabilitacion.webp"
      />

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  placeholder="(+57) 300 000 0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896] resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm text-center">
                  ✅ Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm text-center">
                  ❌ Ocurrió un error. Por favor intenta de nuevo o llámanos directamente.
                </div>
              )}
            </form>
          </div>

          {/* Info de contacto */}
          <div className="space-y-6">
            {/* Foto de la sede */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src="/fachada.webp"
                alt="Sede Polifracturas Ciénaga IPS"
                className="w-full h-44 object-cover"
              />
            </div>

            <div className="bg-[#1E3A5F] text-white rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Información de contacto</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-white/80 text-sm">Carrera 21 #21-24, Ciénaga, Magdalena, Colombia</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <a href="tel:+6054102804" className="text-[#00A896] text-sm hover:underline">(605) 4102804</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold">Horario Consulta Ambulatoria</p>
                    <p className="text-white/80 text-sm">Lunes a Viernes: 7:00 a.m. – 4:30 p.m.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <p className="font-semibold">Urgencias y Cirugías</p>
                    <p className="text-[#00A896] text-sm font-bold">Disponible 24 horas / 7 días / 365 días</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción rápida */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:+6054102804"
                className="flex flex-col items-center justify-center gap-2 bg-[#1E3A5F] text-white rounded-xl py-6 hover:bg-[#162d4a] transition-colors text-center"
              >
                <span className="text-3xl">📞</span>
                <span className="font-bold text-sm">Llamar ahora</span>
                <span className="text-xs text-white/70">(605) 4102804</span>
              </a>
              <a
                href="https://wa.me/573000000000?text=Hola, quisiera información sobre sus servicios."
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-6 hover:bg-[#1da851] transition-colors text-center"
              >
                <span className="text-3xl">💬</span>
                <span className="font-bold text-sm">WhatsApp</span>
                <span className="text-xs text-white/90">Respuesta rápida</span>
              </a>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <iframe
                title="Ubicación Polifracturas Ciénaga"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.3498!2d-74.258!3d11.004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzE0LjQiTiA3NMKwMTUnMjguOCJX!5e0!3m2!1ses!2sco!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
