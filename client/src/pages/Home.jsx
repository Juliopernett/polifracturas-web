import { Link } from 'react-router-dom'

const featuredServices = [
  {
    icon: '🦴',
    title: 'Ortopedia y Traumatología',
    desc: 'Atención especializada en lesiones óseas y articulares con cirujanos de alta experiencia.',
    img: '/ortopedia.png',
  },
  {
    icon: '🔪',
    title: 'Cirugía Especializada',
    desc: 'Cirugía ortopédica, de mano, maxilofacial, general y estética en sala equipada.',
    img: '/cirugia.png',
  },
  {
    icon: '🏃',
    title: 'Rehabilitación Integral',
    desc: 'Fisioterapia, terapia ocupacional y rehabilitación neurológica para tu recuperación.',
    img: '/rehabilitacion.png',
  },
  {
    icon: '🚨',
    title: 'Urgencias 24/7',
    desc: 'Sala de reanimación, sala de yeso y observación con 7 camas. Atención inmediata los 365 días.',
    img: '/urgencias.png',
  },
  {
    icon: '🏥',
    title: 'Hospitalización',
    desc: 'Habitaciones bipersonales con monitoreo continuo y atención médica permanente.',
    img: '/camilla.png',
  },
  {
    icon: '🔬',
    title: 'Diagnóstico por Imágenes',
    desc: 'Laboratorio clínico, tomografía y ultrasonografía para un diagnóstico preciso.',
    img: '/ayudas_diagnosticas.png',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero con banner.png de fondo */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-center overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner.png')" }}
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/92 via-[#1E3A5F]/75 to-[#1E3A5F]/20" />

        {/* Contenido */}
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
              Polifracturas Ciénaga IPS S.A.S. ofrece atención médica especializada en
              traumatología, ortopedia, cirugía y rehabilitación desde 2015.
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
      <div className="bg-[#00A896] text-white py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium">
          <a href="tel:+6054102804" className="flex items-center gap-2 hover:underline transition-opacity hover:opacity-80">
            📞 (605) 4102804
          </a>
          <span className="hidden sm:block text-white/40">|</span>
          <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline transition-opacity hover:opacity-80">
            💬 WhatsApp
          </a>
          <span className="hidden sm:block text-white/40">|</span>
          <span className="flex items-center gap-2">📍 Carrera 21 #21-24, Ciénaga, Magdalena</span>
        </div>
      </div>

      {/* Servicios destacados */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Lo que ofrecemos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Atención integral en salud con profesionales altamente capacitados y tecnología de punta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(s => (
              <div
                key={s.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                {/* Imagen o placeholder de color */}
                {s.img ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#1E3A5F] to-[#00A896] flex items-center justify-center">
                    <span className="text-7xl opacity-80">{s.icon}</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
          {/* Imágenes apiladas con badge */}
          <div className="flex-1 relative">
            <img
              src="/fachada2.png"
              alt="Sede Polifracturas Ciénaga IPS"
              className="rounded-2xl shadow-xl w-full object-cover max-h-72 md:max-h-80"
            />
            <img
              src="/medicos-juntos.png"
              alt="Equipo médico Polifracturas"
              className="rounded-xl shadow-lg w-2/3 object-cover absolute -bottom-8 -right-4 border-4 border-white h-36 md:h-44"
            />
            <div className="absolute -top-4 -left-4 bg-[#00A896] text-white rounded-2xl px-5 py-3 shadow-xl text-center">
              <div className="text-2xl font-extrabold">9+</div>
              <div className="text-xs font-medium mt-0.5">Años</div>
            </div>
          </div>

          <div className="flex-1 pt-10 md:pt-0">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Quiénes somos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-6">
              Líderes en Ortopedia y Traumatología
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Desde <strong>2015</strong>, Polifracturas Ciénaga IPS S.A.S. es la institución referente
              en la atención de patologías del sistema musculoesquelético en Ciénaga, Magdalena.
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

      {/* CTA Banner */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cirugia.png')" }}
        />
        <div className="absolute inset-0 bg-[#1E3A5F]/88" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas atención especializada?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Contáctanos ahora y agenda tu cita con nuestros especialistas.
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
    </div>
  )
}
