import PageHero from '../components/PageHero'

const components = [
  { icon: '📋', title: 'Política SST', desc: 'Política de seguridad y salud en el trabajo aprobada por la alta dirección y socializada con todos los colaboradores.' },
  { icon: '🔍', title: 'Identificación de Peligros', desc: 'Metodología sistemática para identificar, evaluar y controlar los riesgos laborales en todas las áreas.' },
  { icon: '🎓', title: 'Capacitación', desc: 'Programas de formación y entrenamiento en prevención de riesgos para todo el personal.' },
  { icon: '🚑', title: 'Plan de Emergencias', desc: 'Protocolos de respuesta ante emergencias, simulacros periódicos y brigadas de emergencia entrenadas.' },
  { icon: '📈', title: 'Seguimiento y Mejora', desc: 'Indicadores de gestión y auditorías periódicas para garantizar la mejora continua del sistema.' },
  { icon: '🏥', title: 'Medicina Preventiva', desc: 'Exámenes ocupacionales, vigilancia epidemiológica y programas de bienestar para los trabajadores.' },
]

export default function SGSST() {
  return (
    <div>
      <PageHero
        title="SG-SST"
        subtitle="Sistema de Gestión de Seguridad y Salud en el Trabajo"
      />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {/* Intro */}
        <div className="bg-[#1E3A5F] text-white rounded-2xl p-10 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#00A896]">¿Qué es el SG-SST?</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            El Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) es un proceso
            lógico y por etapas que se basa en la mejora continua e incluye la política, la
            organización, la planificación, la aplicación, la evaluación, la auditoría y las
            acciones de mejora.
          </p>
          <p className="text-white/80 leading-relaxed">
            En Polifracturas Ciénaga IPS S.A.S. implementamos el SG-SST en cumplimiento del
            Decreto 1072 de 2015 y la Resolución 0312 de 2019, como parte de nuestro compromiso
            con el bienestar de todos nuestros colaboradores.
          </p>
        </div>

        {/* Componentes */}
        <h2 className="text-2xl font-bold text-[#1E3A5F] text-center mb-8">Componentes del SG-SST</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {components.map(c => (
            <div key={c.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-[#1E3A5F] mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Documentos */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Documentos SG-SST</h2>
          <div className="space-y-3">
            {[
              'Política de Seguridad y Salud en el Trabajo',
              'Plan Anual de Trabajo SST',
              'Matriz de Identificación de Peligros',
              'Plan de Emergencias y Evacuación',
              'Reglamento de Higiene y Seguridad Industrial',
              'Programa de Medicina Preventiva',
            ].map(doc => (
              <div key={doc} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-3">
                <div className="flex items-center gap-3">
                  <span>📄</span>
                  <span className="text-gray-700 text-sm font-medium">{doc}</span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Disponible</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
