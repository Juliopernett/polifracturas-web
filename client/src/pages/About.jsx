import PageHero from '../components/PageHero'
import SEO from '../components/SEO'

const values = [
  {
    icon: '🤝',
    title: 'Responsabilidad y Compromiso',
    desc: 'Dedicación, sentido de pertenencia, identidad e interés máximo en el cumplimiento de deberes y funciones.',
  },
  {
    icon: '💎',
    title: 'Honestidad',
    desc: 'Alto desarrollo individual y transparencia total en nuestros actos sociales y laborales, libres de engaños.',
  },
  {
    icon: '🌿',
    title: 'Respeto y Tolerancia',
    desc: 'Reconocimiento de las diferencias étnicas, sociales y políticas sin violar los derechos individuales.',
  },
  {
    icon: '❤️',
    title: 'Servicio',
    desc: 'Actitud encaminada a brindar a la comunidad una atención humanizada que exceda sus expectativas.',
  },
]

const objectives = [
  {
    type: 'General',
    text: 'Prestar servicio de salud enfocado a la habilitación y rehabilitación del individuo, con la participación activa de profesionales calificados en cuanto al conocimiento y la calidad humana, que permita ofrecer un servicio eficiente y de satisfacción total.',
  },
  {
    type: 'Específico',
    text: 'Proporcionar un servicio de salud con óptima calidad a nuestros usuarios, fomentando el mejoramiento del bienestar de la población del departamento del Magdalena.',
  },
  {
    type: 'Específico',
    text: 'Brindar servicios de habilitación y rehabilitación funcional en ortopedia, traumatología y terapia física, ofreciendo confiabilidad, experiencia y eficiencia en la prestación del servicio.',
  },
  {
    type: 'Específico',
    text: 'Dar cumplimiento a las disposiciones legales que regulan el sistema de garantía de la calidad, el control y la vigilancia en los servicios de salud.',
  },
  {
    type: 'Específico',
    text: 'Obtener el mayor reconocimiento de nuestra labor en el departamento del Magdalena, en aras de ampliar la cobertura ofrecida en servicios de salud.',
  },
]

export default function About() {
  return (
    <>
      <SEO
        title="Quiénes Somos"
        description="Conoce la historia, misión, visión y valores de Polifracturas Ciénaga IPS S.A.S. Líderes en ortopedia y traumatología desde 2015 en Ciénaga, Magdalena. Nivel I y II de atención."
        keywords="Polifracturas Ciénaga historia, clínica ortopedia Ciénaga, IPS Ciénaga Magdalena, misión visión ortopedia Magdalena"
        path="/nosotros"
      />
      <PageHero
        title="Quiénes Somos"
        subtitle="Líderes en la atención de patologías del sistema musculoesquelético en Ciénaga, Magdalena."
        bgImage="/rehabilitacion.webp"
      />

      {/* Reseña histórica */}
      <section className="py-20 px-6 bg-white" aria-labelledby="historia-heading">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
          <div className="flex-1 relative">
            <img
              src="/fachada2.webp"
              alt="Sede Polifracturas Ciénaga IPS — Carrera 21 #21-24, Ciénaga, Magdalena"
              loading="lazy"
              width="600"
              height="400"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 w-max">
              {[['2015', 'Fundación'], ['I y II', 'Nivel'], ['24/7', 'Urgencias']].map(([val, label]) => (
                <div key={label} className="bg-[#1E3A5F] text-white rounded-xl px-5 py-3 text-center shadow-xl">
                  <div className="text-lg font-extrabold text-[#00A896]">{val}</div>
                  <div className="text-xs text-white/75 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 pt-10 lg:pt-0">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Reseña Histórica</span>
            <h2 id="historia-heading" className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Polifracturas Ciénaga IPS S.A.S.</strong> es una sociedad anónima simplificada con matrícula
              mercantil <strong>N° 0170648</strong>, otorgada por la Cámara de Comercio de Santa Marta el{' '}
              <strong>28 de julio de 2015</strong>, con patrimonio propio y autonomía administrativa.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Está dirigida a la prestación de servicios integrales de salud que forman parte del régimen de
              seguridad social como institución prestadora de servicios de salud en{' '}
              <strong>nivel I y II</strong>, atendiendo a la comunidad de <strong>Ciénaga, Magdalena</strong> y
              pacientes referidos de <strong>Santa Marta</strong> y municipios vecinos.
            </p>
            <p className="text-gray-600 leading-relaxed">
              La planta física es el producto de áreas de construcción nuevas y la remodelación de antiguas
              edificaciones, con sujeción a los estándares establecidos en la{' '}
              <strong>Resolución 2003 de 2014</strong> del Ministerio de la Protección Social.
            </p>
          </div>
        </div>
      </section>

      {/* Quiénes somos + equipo */}
      <section className="py-20 px-6 bg-gray-50" aria-labelledby="equipo-heading">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-14 items-center">
          <div className="flex-1">
            <img
              src="/medicos-juntos.webp"
              alt="Equipo médico especializado — Polifracturas Ciénaga IPS"
              loading="lazy"
              width="600"
              height="400"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Nuestro Equipo</span>
            <h2 id="equipo-heading" className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-2 mb-6">
              Talento Humano Especializado
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Polifracturas Ciénaga IPS S.A.S. es una institución prestadora de servicios de salud con{' '}
              <strong>gran liderazgo en la atención de patologías del sistema musculoesquelético</strong>,
              mediante las especialidades de ortopedia y traumatología, medicina física y rehabilitación.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Contamos con un <strong>talento humano idóneo e interdisciplinario</strong> conformado por
              personal de enfermería, médicos generales, médicos especialistas y personal administrativo,
              que permiten cumplir con la misión de nuestra institución ofreciendo un servicio de excelencia
              a los pacientes de <strong>Ciénaga, Santa Marta y el Magdalena</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 px-6 bg-white" aria-labelledby="mision-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="mision-heading" className="sr-only">Misión y Visión</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1E3A5F] text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[110px] opacity-5 leading-none select-none" aria-hidden="true">🎯</div>
              <div className="text-4xl mb-4" aria-hidden="true">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-[#00A896]">Misión</h3>
              <p className="text-white/85 leading-relaxed text-sm">
                Somos una clínica orientada a la prestación de servicios en el área de la salud con énfasis en
                la especialidad de <strong className="text-white">ortopedia y traumatología</strong>, encaminada
                a satisfacer plenamente las necesidades y expectativas de nuestros usuarios, brindando siempre
                un servicio ágil y eficiente con claridad y seguridad en los diagnósticos clínicos, respaldado
                por el profesionalismo y la experiencia de un equipo médico especializado y un recurso humano
                con talento social que trabaja para el mejoramiento continuo de las políticas y normas
                establecidas en la institución.
              </p>
            </div>
            <div className="bg-[#00A896] text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[110px] opacity-10 leading-none select-none" aria-hidden="true">🔭</div>
              <div className="text-4xl mb-4" aria-hidden="true">🔭</div>
              <h3 className="text-2xl font-bold mb-4">Visión</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                Posicionar la institución en el municipio de Ciénaga como{' '}
                <strong className="text-white">centro de salud integral</strong>, que brinda a sus usuarios un
                amplio portafolio de servicios con alternativas de nuevas especialidades, tecnología de
                vanguardia y modernas instalaciones, pensando siempre en superar las expectativas de nuestros
                clientes de manera que nos perciban como una opción clínica diferente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-6 bg-gray-50" aria-labelledby="valores-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Principios</span>
            <h2 id="valores-heading" className="text-3xl font-bold text-[#1E3A5F] mt-2">Valores Corporativos</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Polifracturas Ciénaga IPS S.A.S. reconoce y exalta entre los miembros de su comunidad los
              siguientes valores:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => (
              <article
                key={v.title}
                className="flex gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex-shrink-0 text-4xl" aria-hidden="true">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-16 px-6 bg-white" aria-labelledby="objetivos-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Metas</span>
            <h2 id="objetivos-heading" className="text-3xl font-bold text-[#1E3A5F] mt-2">Objetivos Institucionales</h2>
          </div>
          <ul className="space-y-4">
            {objectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#00A896]/40 transition-colors"
              >
                <span
                  className={`flex-shrink-0 px-2 py-1 rounded-lg text-xs font-bold ${
                    obj.type === 'General'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-[#00A896]/15 text-[#00A896]'
                  }`}
                >
                  {obj.type}
                </span>
                <p className="text-gray-700 leading-relaxed text-sm">{obj.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mapa de procesos */}
      <section className="py-16 px-6 bg-gray-50" aria-labelledby="mapa-heading">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#00A896] font-semibold text-sm uppercase tracking-widest">Organización</span>
          <h2 id="mapa-heading" className="text-3xl font-bold text-[#1E3A5F] mt-2 mb-8">Mapa de Procesos</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src="/mapa-procesos.webp"
              alt="Mapa de Procesos Institucional — Polifracturas Ciénaga IPS S.A.S."
              loading="lazy"
              width="1000"
              height="700"
              className="w-full object-contain bg-white"
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Estructura de procesos institucional · Polifracturas Ciénaga IPS S.A.S.
          </p>
        </div>
      </section>
    </>
  )
}
