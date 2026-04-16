import PageHero from '../components/PageHero'

const indicators = [
  { label: 'Estado Financiero', value: 'Solvente', icon: '💹' },
  { label: 'Años de Operación', value: '9+ años', icon: '📅' },
  { label: 'Tipo de Entidad', value: 'IPS Privada', icon: '🏥' },
  { label: 'Régimen', value: 'S.A.S.', icon: '📑' },
]

export default function Financial() {
  return (
    <div>
      <PageHero
        title="Información Financiera"
        subtitle="Transparencia y responsabilidad en la gestión financiera institucional."
      />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {/* Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {indicators.map(i => (
            <div key={i.label} className="bg-[#1E3A5F] text-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{i.icon}</div>
              <div className="text-xl font-bold text-[#00A896] mb-1">{i.value}</div>
              <div className="text-xs text-white/70">{i.label}</div>
            </div>
          ))}
        </div>

        {/* Texto descriptivo */}
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">Gestión Financiera</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Polifracturas Ciénaga IPS S.A.S. mantiene una gestión financiera responsable y
            transparente, en cumplimiento de las normas contables colombianas (NIIF para PYMES)
            y los requerimientos de la Superintendencia Nacional de Salud.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nuestra institución está comprometida con la sostenibilidad financiera como base para
            garantizar la continuidad y mejora de los servicios de salud prestados a la comunidad
            de Ciénaga y municipios vecinos.
          </p>
        </div>

        {/* Documentos */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Estados Financieros</h2>
          <p className="text-gray-500 text-sm mb-4">
            La información financiera detallada está disponible para grupos de interés autorizados.
            Para solicitar acceso a estados financieros específicos, comuníquese con nuestra gerencia.
          </p>
          <div className="space-y-3">
            {[
              'Balance General',
              'Estado de Resultados',
              'Flujo de Caja',
              'Notas a los Estados Financieros',
            ].map(doc => (
              <div key={doc} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-3">
                <div className="flex items-center gap-3">
                  <span>📊</span>
                  <span className="text-gray-700 text-sm font-medium">{doc}</span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Solicitar</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
