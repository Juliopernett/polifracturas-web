import PageHero from '../components/PageHero'
import SEO from '../components/SEO'

const pillars = [
  { icon: '⚡', title: 'Oportunidad', desc: 'Atención oportuna para cada usuario, en el momento en que lo necesita.' },
  { icon: '🎯', title: 'Pertinencia', desc: 'Servicios adecuados a las necesidades reales de salud de nuestros pacientes.' },
  { icon: '🛡️', title: 'Seguridad', desc: 'Protocolos estrictos para garantizar la seguridad en cada procedimiento.' },
  { icon: '❤️', title: 'Calidez', desc: 'Trato humano, digno y empático en todos los momentos de la atención.' },
]

export default function Quality() {
  return (
    <>
      <SEO
        title="Políticas de Calidad"
        description="Política de calidad de Polifracturas Ciénaga IPS S.A.S. Atención integral en ortopedia y traumatología basada en oportunidad, pertinencia, seguridad y calidez. Cumplimiento normativo certificado en Ciénaga, Magdalena."
        keywords="política de calidad IPS Ciénaga, calidad ortopedia Magdalena, SOGCS Ciénaga, Resolución 2003 IPS, seguridad paciente Polifracturas"
        image="https://polifracturas-web-production.up.railway.app/camilla.webp"
        path="/calidad"
      />
      <PageHero
        title="Políticas de Calidad"
        subtitle="Comprometidos con el mejoramiento continuo y la atención integral a nuestros usuarios en Ciénaga, Magdalena."
        bgImage="/camilla.webp"
      />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {/* Política principal */}
        <div className="relative rounded-2xl overflow-hidden mb-14 shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/medicos-juntos.webp')" }}
          />
          <div className="absolute inset-0 bg-[#1E3A5F]/90" />
          <div className="relative z-10 p-10 text-white">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Declaración Oficial</span>
            <h2 className="text-2xl font-bold mt-2 mb-5">Política de Calidad</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              <strong className="text-white">Polifracturas Ciénaga IPS S.A.S.</strong> es una empresa cuyo
              trabajo está fundamentado en una <strong className="text-white">estructura ágil</strong> y un{' '}
              <strong className="text-white">recurso humano calificado</strong>, con el cual garantiza una
              atención integral al usuario, sustentada en los principios de{' '}
              <strong className="text-[#00A896]">oportunidad, pertinencia, seguridad y calidez</strong> en
              el tratamiento.
            </p>
            <p className="text-white/85 leading-relaxed">
              Estamos comprometidos con el <strong className="text-white">mejoramiento continuo</strong> de
              nuestros procesos, infraestructura, dotación y desarrollo humano, manteniendo una organización
              íntegra y sólida, altamente posicionada en nuestra comunidad de <strong className="text-white">Ciénaga, Magdalena</strong>,
              siendo reconocida por su <strong className="text-white">rentabilidad social</strong>.
            </p>
          </div>
        </div>

        {/* Cuatro pilares */}
        <h2 className="text-2xl font-bold text-[#1E3A5F] text-center mb-8">Pilares de Nuestra Calidad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map(p => (
            <article key={p.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-3" aria-hidden="true">{p.icon}</div>
              <h3 className="font-bold text-[#1E3A5F] mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </div>

        {/* Compromisos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="bg-[#00A896]/10 border border-[#00A896]/30 rounded-2xl p-7">
            <h3 className="font-bold text-[#1E3A5F] text-lg mb-4 flex items-center gap-2">
              <span aria-hidden="true">📈</span> Mejora Continua
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                'Evaluación permanente de procesos asistenciales y administrativos',
                'Auditorías internas y externas periódicas',
                'Indicadores de gestión y seguimiento de resultados',
                'Planes de mejoramiento ante hallazgos',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#00A896] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 rounded-2xl p-7">
            <h3 className="font-bold text-[#1E3A5F] text-lg mb-4 flex items-center gap-2">
              <span aria-hidden="true">📋</span> Cumplimiento Normativo
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                'Resolución 2003 de 2014 — Habilitación de servicios de salud',
                'Sistema Obligatorio de Garantía de Calidad (SOGCS)',
                'Normatividad del Ministerio de Salud y Protección Social',
                'Estándares de seguridad del paciente',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#1E3A5F] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documentos */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Documentos de Calidad</h2>
          <p className="text-gray-500 text-sm mb-5">
            Para solicitar documentos institucionales de calidad, contáctenos directamente a través
            de nuestros canales de atención en Ciénaga, Magdalena.
          </p>
          <ul className="space-y-3">
            {[
              'Manual de Calidad Institucional',
              'Política de Seguridad del Paciente',
              'Protocolo de Atención en Urgencias',
              'Reglamento Interno de la Institución',
              'Programa de Auditoría para el Mejoramiento de la Calidad (PAMEC)',
            ].map(doc => (
              <li key={doc} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#00A896]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-[#1E3A5F]" aria-hidden="true">📄</span>
                  <span className="text-gray-700 text-sm font-medium">{doc}</span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Solicitar</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
