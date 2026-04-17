import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const featuredServices = [
  {
    icon: '🦴',
    title: 'Ortopedia y Traumatología',
    desc: 'Atención especializada en lesiones óseas y articulares con cirujanos de alta experiencia en Ciénaga y Santa Marta.',
    img: '/ortopedia.webp',
  },
  {
    icon: '🔪',
    title: 'Cirugía Especializada',
    desc: 'Cirugía ortopédica, de mano, maxilofacial, general y estética en sala equipada.',
    img: '/cirugia.webp',
  },
  {
    icon: '🏃',
    title: 'Rehabilitación Integral',
    desc: 'Fisioterapia, terapia ocupacional y rehabilitación neurológica para tu recuperación.',
    img: '/rehabilitacion.webp',
  },
  {
    icon: '🚨',
    title: 'Urgencias 24/7',
    desc: 'Sala de reanimación, sala de yeso y observación con 7 camas. Atención inmediata los 365 días.',
    img: '/urgencias.webp',
  },
  {
    icon: '🏥',
    title: 'Hospitalización',
    desc: 'Habitaciones bipersonales con monitoreo continuo y atención médica permanente.',
    img: '/camilla.webp',
  },
  {
    icon: '🔬',
    title: 'Diagnóstico por Imágenes',
    desc: 'Laboratorio clínico, tomografía y ultrasonografía para un diagnóstico preciso.',
    img: '/ayudas_diagnosticas.webp',
  },
]

const faqs = [
  {
    q: '¿Qué hacer en caso de fractura?',
    a: 'En caso de fractura, inmoviliza la zona afectada, aplica hielo para reducir la inflamación y acude de inmediato a urgencias. Polifracturas Ciénaga IPS tiene atención de urgencias 24 horas al día, 7 días a la semana. Llama al (605) 4102804 o acude directamente a nuestra sede en Carrera 21 #21-24, Ciénaga, Magdalena.',
  },
  {
    q: '¿Cuándo acudir al ortopedista?',
    a: 'Debes acudir al ortopedista si presentas dolor persistente en huesos o articulaciones, limitación del movimiento, deformidad visible, hinchazón o moretones tras un traumatismo. En Polifracturas Ciénaga IPS atendemos consulta ambulatoria de lunes a viernes de 7:00 a.m. a 4:30 p.m.',
  },
  {
    q: '¿Atienden pacientes de Santa Marta?',
    a: 'Sí, atendemos pacientes de Ciénaga, Santa Marta y todo el departamento del Magdalena. Nuestra clínica es referente en ortopedia y traumatología en la región Caribe colombiana.',
  },
  {
    q: '¿Qué especialidades tienen disponibles?',
    a: 'Contamos con ortopedia y traumatología, cirugía de mano, cirugía maxilofacial, cirugía general, cirugía plástica, medicina física y rehabilitación, fisioterapia, terapia ocupacional y diagnóstico por imágenes.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <SEO
        description="Clínica especializada en fracturas, ortopedia y traumatología en Ciénaga, Magdalena. Urgencias 24/7. Cirugía, rehabilitación y diagnóstico. Llama al (605) 4102804."
        keywords="clínica de fracturas en Ciénaga, ortopedia en Santa Marta, Polifracturas IPS, traumatología Magdalena, urgencias 24 horas Ciénaga, ortopedista Ciénaga, cirugía ortopédica Magdalena"
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero con banner.webp de fondo */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-center overflow-hidden" aria-label="Banner principal">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner.webp')" }}
          role="img"
          aria-label="Instalaciones Polifracturas Ciénaga IPS"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/92 via-[#1E3A5F]/75 to-[#1E3A5F]/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 animate-pulse shadow-lg">
              🚨 URGENCIAS 24 HORAS / 7 DÍAS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-lg">
              Especialistas en<br />
              <span className="text-[#00A896]">Trauma y Ortopedia</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-10 leading-relaxed">
              Polifracturas Ciénaga IPS S.A.S. — clínica de fracturas y ortopedia en Ciénaga, Magdalena.
              Atención especializada en traumatología, cirugía y rehabilitación desde 2015.
              Referentes en ortopedia para Santa Marta y el departamento del Magdalena.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contacto"
                className="bg-[#00A896] hover:bg-[#008a7c] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Agendar Cita
              </Link>
              <Link
                to="/servicios"
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de contacto rápido */}
      <address className="not-italic bg-[#00A896] text-white py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium">
          <a href="tel:+6054102804" className="flex items-center gap-2 hover:underline transition-opacity hover:opacity-80">
            📞 (605) 4102804
          </a>
          <span className="hidden sm:block text-white/40" aria-hidden="true">|</span>
          <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline transition-opacity hover:opacity-80">
            💬 WhatsApp
          </a>
          <span className="hidden sm:block text-white/40" aria-hidden="true">|</span>
          <span className="flex items-center gap-2">📍 Carrera 21 #21-24, Ciénaga, Magdalena</span>
        </div>
      </address>

      {/* Servicios destacados */}
      <section className="py-20 px-6 bg-gray-50" aria-labelledby="servicios-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Lo que ofrecemos</span>
            <h2 id="servicios-heading" className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Atención integral en salud con profesionales altamente capacitados y tecnología de punta
              en Ciénaga, Magdalena — referentes en ortopedia para toda la región Caribe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(s => (
              <article
                key={s.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                {s.img ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      width="400"
                      height="192"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#1E3A5F] to-[#00A896] flex items-center justify-center">
                    <span className="text-7xl opacity-80" aria-hidden="true">{s.icon}</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/servicios"
              className="bg-[#1E3A5F] hover:bg-[#162d4a] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow hover:shadow-md"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="py-20 px-6 bg-white" aria-labelledby="nosotros-heading">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1 relative">
            <img
              src="/fachada2.webp"
              alt="Sede Polifracturas Ciénaga IPS — Carrera 21 #21-24, Ciénaga, Magdalena"
              loading="lazy"
              width="600"
              height="320"
              className="rounded-2xl shadow-xl w-full object-cover max-h-72 md:max-h-80"
            />
            <img
              src="/medicos-juntos.webp"
              alt="Equipo médico especializado en ortopedia y traumatología — Polifracturas Ciénaga IPS"
              loading="lazy"
              width="300"
              height="176"
              className="rounded-xl shadow-lg w-2/3 object-cover absolute -bottom-8 -right-4 border-4 border-white h-36 md:h-44"
            />
            <div className="absolute -top-4 -left-4 bg-[#00A896] text-white rounded-2xl px-5 py-3 shadow-xl text-center">
              <div className="text-2xl font-extrabold">9+</div>
              <div className="text-xs font-medium mt-0.5">Años</div>
            </div>
          </div>

          <div className="flex-1 pt-10 md:pt-0">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Quiénes somos</span>
            <h2 id="nosotros-heading" className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-6">
              Líderes en Ortopedia y Traumatología en Ciénaga, Magdalena
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Desde <strong>2015</strong>, Polifracturas Ciénaga IPS S.A.S. es la institución referente
              en la atención de patologías del sistema musculoesquelético en <strong>Ciénaga, Magdalena</strong>,
              con alcance a pacientes de <strong>Santa Marta</strong> y toda la región Caribe colombiana.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Contamos con un talento humano idóneo e interdisciplinario: enfermería, médicos generales,
              especialistas y personal administrativo comprometidos con la excelencia en cada atención.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[['24/7', 'Urgencias'], ['100%', 'Compromiso'], ['Ciénaga', 'Magdalena']].map(([val, label]) => (
                <div key={label} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xl font-bold text-[#00A896]">{val}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/nosotros"
              className="inline-block border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-bold px-7 py-3 rounded-xl transition-all"
            >
              Conócenos
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Preguntas frecuentes</span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre ortopedia, fracturas y nuestros servicios en Ciénaga, Magdalena.
            </p>
          </div>

          <dl className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <dt className="font-bold text-[#1E3A5F] text-lg mb-3">{q}</dt>
                <dd className="text-gray-600 leading-relaxed text-sm">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 px-6 text-center overflow-hidden" aria-label="Llamada a la acción">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cirugia.webp')" }}
          role="img"
          aria-label="Sala quirúrgica Polifracturas Ciénaga IPS"
        />
        <div className="absolute inset-0 bg-[#1E3A5F]/88" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas atención especializada en ortopedia o traumatología?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Contáctanos ahora y agenda tu cita con nuestros especialistas en Ciénaga, Magdalena.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="bg-[#00A896] hover:bg-[#008a7c] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg"
            >
              Contáctanos
            </Link>
            <a
              href="tel:+6054102804"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-all"
            >
              📞 Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
