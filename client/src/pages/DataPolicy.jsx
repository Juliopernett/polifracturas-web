import PageHero from '../components/PageHero'
import SEO from '../components/SEO'

const principles = [
  { icon: '🔒', title: 'Legalidad', desc: 'El tratamiento de tus datos se realiza en el marco de la Ley 1581 de 2012 y el Decreto 1377 de 2013.' },
  { icon: '🎯', title: 'Finalidad', desc: 'Tus datos solo se usan para gestionar tu solicitud, contactarte y dar cumplimiento a nuestras obligaciones legales.' },
  { icon: '🔐', title: 'Seguridad', desc: 'Aplicamos medidas técnicas y administrativas razonables para proteger tu información contra pérdida o acceso no autorizado.' },
  { icon: '⚖️', title: 'Tus derechos', desc: 'Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos personales en cualquier momento.' },
]

export default function DataPolicy() {
  return (
    <>
      <SEO
        title="Política de Tratamiento de Datos Personales"
        description="Política de tratamiento de datos personales de Polifracturas Ciénaga IPS S.A.S., conforme a la Ley 1581 de 2012 (Habeas Data)."
        keywords="política de tratamiento de datos, Ley 1581 de 2012, habeas data Polifracturas Ciénaga"
        path="/politica-tratamiento-datos"
      />
      <PageHero
        title="Política de Tratamiento de Datos Personales"
        subtitle="Ley 1581 de 2012 — Polifracturas Ciénaga IPS S.A.S."
      />

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-[#1E3A5F] text-white rounded-2xl p-10 mb-12">
          <p className="text-white/90 leading-relaxed">
            <strong className="text-white">Polifracturas Ciénaga IPS S.A.S.</strong>, identificada con matrícula mercantil
            N° 0170648 de la Cámara de Comercio de Santa Marta, actúa como responsable del tratamiento de los datos
            personales que sus pacientes, usuarios y visitantes suministran a través de este sitio web, en cumplimiento
            de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas que las modifiquen o complementen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {principles.map(p => (
            <article key={p.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3" aria-hidden="true">{p.icon}</div>
              <h3 className="font-bold text-[#1E3A5F] mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#1E3A5F] mb-3">1. Finalidad del tratamiento</h2>
            <p className="text-gray-600 leading-relaxed">
              Los datos personales suministrados a través de los formularios de contacto, PQRS y trabaja con nosotros
              serán utilizados exclusivamente para: gestionar y responder tu solicitud, petición, queja, reclamo o
              sugerencia; contactarte por el canal que elijas; dar trámite a procesos de selección de personal; y
              cumplir con las obligaciones legales y de reporte ante las autoridades de salud competentes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1E3A5F] mb-3">2. Derechos del titular</h2>
            <p className="text-gray-600 leading-relaxed">
              Como titular de tus datos personales tienes derecho a conocer, actualizar y rectificar tu información;
              solicitar prueba de la autorización otorgada; ser informado sobre el uso dado a tus datos; presentar
              quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y/o solicitar la
              supresión de tus datos cuando no exista un deber legal o contractual que impida su eliminación; y
              acceder de forma gratuita a tus datos personales.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1E3A5F] mb-3">3. Cómo ejercer tus derechos</h2>
            <p className="text-gray-600 leading-relaxed">
              Puedes ejercer tus derechos enviando tu solicitud a través del formulario de{' '}
              <a href="/pqrs" className="text-[#00A896] font-semibold hover:underline">PQRS</a>, al correo institucional
              o llamando al <strong>(605) 4102804</strong>. Atenderemos tu solicitud dentro de los términos
              establecidos por la Ley 1755 de 2015.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1E3A5F] mb-3">4. Seguridad de la información</h2>
            <p className="text-gray-600 leading-relaxed">
              Polifracturas Ciénaga IPS S.A.S. adopta medidas técnicas, humanas y administrativas razonables para
              proteger los datos personales contra acceso no autorizado, pérdida, alteración o uso fraudulento,
              conforme a la sensibilidad de la información y a nuestra capacidad tecnológica.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
