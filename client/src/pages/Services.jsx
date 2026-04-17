import { useState } from 'react'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'

const categories = [
  {
    id: 'quirurgicos',
    label: 'Ortopedia y Cirugía',
    icon: '🦴',
    img: '/ortopedia.webp',
    imgAlt: 'Sala de Ortopedia y Traumatología Polifracturas Ciénaga',
    accentBorder: 'border-blue-400',
    badge: null,
    services: [
      {
        name: 'Ortopedia y Traumatología',
        desc: 'Especialidad principal de la clínica. Atención de patologías del sistema musculoesquelético con instrumental de última tecnología para cirugía de trauma ortopédico mayor, pelvis-acetábulo y trauma apendicular.',
      },
      {
        name: 'Cirugía de Mano',
        desc: 'Tratamiento quirúrgico especializado de lesiones, malformaciones y patologías de la mano y muñeca.',
      },
      {
        name: 'Cirugía Maxilofacial',
        desc: 'Intervenciones quirúrgicas en fracturas y patologías de la región facial, mandíbula y maxilares.',
      },
    ],
  },
  {
    id: 'clinicos',
    label: 'Urgencias y Hospitalización',
    icon: '🚨',
    img: '/urgencias.webp',
    imgAlt: 'Sala de Urgencias Polifracturas Ciénaga',
    accentBorder: 'border-red-400',
    badge: '24/7',
    services: [
      {
        name: 'Urgencias 24 horas',
        desc: 'Consultorio de urgencias independiente con todos los requerimientos exigidos por el Ministerio de Salud. Incluye sala de reanimación, sala de yeso y sala de observación con 7 camas.',
      },
      {
        name: 'Hospitalización',
        desc: 'Dos habitaciones de hospitalización bipersonales con monitoreo continuo y atención médica especializada durante todo el proceso de recuperación.',
      },
      {
        name: 'Central de Esterilización',
        desc: 'Área delimitada para limpieza, mantenimiento y esterilización del equipamiento biomédico e instrumental quirúrgico que cumple con todas las condiciones y procesos requeridos.',
      },
      {
        name: 'Consulta Ambulatoria Especializada',
        desc: 'Atención de lunes a viernes de 7:00 a.m. a 4:30 p.m. con especialistas en ortopedia, traumatología y subespecialidades.',
      },
    ],
  },
  {
    id: 'diagnosticos',
    label: 'Ayudas Diagnósticas',
    icon: '🔬',
    img: '/ayudas_diagnosticas.webp',
    imgAlt: 'Sala de diagnóstico por imágenes Polifracturas Ciénaga',
    accentBorder: 'border-purple-400',
    badge: null,
    services: [
      {
        name: 'Laboratorio Clínico',
        desc: 'Análisis clínicos con equipos de precisión para soporte diagnóstico. En convenio con Policlínica Ciénaga.',
      },
      {
        name: 'Tomografía',
        desc: 'Imágenes diagnósticas de tomografía computarizada para evaluación precisa de lesiones óseas y de tejidos. En convenio con Policlínica Ciénaga.',
      },
      {
        name: 'Ultrasonografía',
        desc: 'Ecografía de alta resolución para diagnóstico de lesiones musculares, tendinosas y articulares. En convenio con Policlínica Ciénaga.',
      },
      {
        name: 'Sala de Imágenes Diagnósticas',
        desc: 'Sala de imágenes diagnósticas especializada para ortopedia con equipo de última generación dentro de las instalaciones.',
      },
    ],
  },
  {
    id: 'rehabilitacion',
    label: 'Rehabilitación',
    icon: '🏃',
    img: '/rehabilitacion.webp',
    imgAlt: 'Servicio de rehabilitación y fisioterapia Polifracturas Ciénaga',
    accentBorder: 'border-green-400',
    badge: null,
    services: [
      {
        name: 'Fisioterapia',
        desc: 'Servicio de fisioterapia y rehabilitación integral derivado de consulta médica especializada en ortopedia, traumatología y cirugías de mano. Talento humano altamente calificado con excelentes resultados terapéuticos.',
      },
      {
        name: 'Medicina Física y Rehabilitación',
        desc: 'Especialidad enfocada en la recuperación funcional del paciente. Mejoramiento de la calidad de vida de la población afectada por lesiones del sistema musculoesquelético.',
      },
      {
        name: 'Terapia Ocupacional',
        desc: 'Recuperación de habilidades para las actividades de la vida diaria después de cirugías o lesiones traumáticas.',
      },
      {
        name: 'Rehabilitación Neurológica',
        desc: 'Programa especializado para pacientes con afectaciones del sistema nervioso derivadas de trauma o cirugía.',
      },
    ],
  },
]

export default function Services() {
  const [active, setActive] = useState('quirurgicos')
  const current = categories.find(c => c.id === active)

  return (
    <>
      <SEO
        title="Servicios Médicos — Ortopedia, Cirugía y Rehabilitación"
        description="Servicios de ortopedia, traumatología, cirugía especializada, urgencias 24/7, rehabilitación y diagnóstico por imágenes en Ciénaga, Magdalena. Referentes en ortopedia en Santa Marta."
        keywords="ortopedia Ciénaga, traumatología Magdalena, cirugía de mano, urgencias 24 horas Ciénaga, fisioterapia Ciénaga, diagnóstico por imágenes Magdalena, rehabilitación Santa Marta"
        image="https://polifracturas-web-production.up.railway.app/ortopedia.webp"
        path="/servicios"
      />
      <PageHero
        title="Nuestros Servicios"
        subtitle="Atención integral en ortopedia, traumatología, cirugía, diagnóstico y rehabilitación en Ciénaga, Magdalena."
        bgImage="/ortopedia.webp"
      />

      {/* Horarios rápidos */}
      <div className="bg-[#1E3A5F] text-white py-4">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-bold animate-pulse" aria-hidden="true">🚨</span>
            <span><strong>Urgencias y Cirugías:</strong> 24 horas / 7 días</span>
          </div>
          <span className="hidden sm:block text-white/30" aria-hidden="true">|</span>
          <div className="flex items-center gap-2">
            <span aria-hidden="true">🗓️</span>
            <span><strong>Consulta Ambulatoria:</strong> Lun – Vie, 7:00 a.m. – 4:30 p.m.</span>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        {/* Tabs */}
        <nav aria-label="Categorías de servicios" className="flex flex-wrap gap-3 justify-center mb-14">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              aria-pressed={active === c.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all border-2 ${
                active === c.id
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md'
                  : 'bg-white text-[#1E3A5F] border-[#1E3A5F]/25 hover:border-[#1E3A5F]/60'
              }`}
            >
              <span aria-hidden="true">{c.icon}</span> {c.label}
            </button>
          ))}
        </nav>

        {current && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className={`rounded-2xl overflow-hidden shadow-lg border-4 ${current.accentBorder}`}>
                <img
                  src={current.img}
                  alt={current.imgAlt}
                  loading="lazy"
                  width="500"
                  height="320"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
              {current.badge && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-600 font-bold text-lg">🚨 Urgencias {current.badge}</p>
                  <p className="text-red-500 text-xs mt-1">Atención inmediata sin cita previa los 365 días en Ciénaga</p>
                </div>
              )}
              {current.id === 'diagnosticos' && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center text-xs text-purple-700">
                  Algunos servicios en convenio con <strong>Policlínica Ciénaga</strong>
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6 flex items-center gap-2">
                <span aria-hidden="true">{current.icon}</span> {current.label}
              </h2>
              <ul className="space-y-4">
                {current.services.map(s => (
                  <li
                    key={s.name}
                    className="flex gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-[#00A896]/15 rounded-lg flex items-center justify-center text-[#00A896] font-bold" aria-hidden="true">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E3A5F] mb-1">{s.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tecnología disponible */}
        <div className="mt-16 bg-[#1E3A5F] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 text-white">
              <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Equipamiento</span>
              <h3 className="text-2xl font-bold mt-2 mb-5">Tecnología Disponible</h3>
              <ul className="space-y-3 text-sm text-white/85">
                {[
                  'Instrumental de última tecnología para cirugía de trauma ortopédico mayor',
                  'Equipo especializado para cirugía de pelvis-acetábulo y trauma apendicular',
                  'Sala de imágenes diagnósticas especializada para ortopedia',
                  'Mesas quirúrgicas especializadas',
                  'Central de esterilización de equipamiento biomédico e instrumental quirúrgico',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#00A896] mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <img
                src="/cirugia.webp"
                alt="Sala de cirugía especializada Polifracturas Ciénaga IPS"
                loading="lazy"
                width="500"
                height="400"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/medicos-juntos.webp')" }} />
          <div className="absolute inset-0 bg-[#1E3A5F]/88" />
          <div className="relative z-10 p-10 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">¿Necesitas ortopedia o traumatología en Ciénaga?</h3>
            <p className="text-white/80 mb-6">Nuestro equipo de especialistas está listo para atenderte. También atendemos pacientes de Santa Marta y el Magdalena.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+6054102804"
                className="bg-white text-[#1E3A5F] font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow">
                📞 (605) 4102804
              </a>
              <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer"
                className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-colors shadow">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
