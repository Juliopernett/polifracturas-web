import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/logo.png" alt="Polifracturas" className="h-12 object-contain mb-4" />
          <p className="text-gray-300 text-sm leading-relaxed">
            IPS privada especializada en trauma, ortopedia, cirugía y rehabilitación.
            Atención de urgencias 24/7.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[#00A896] mb-3 uppercase text-sm tracking-wide">Navegación</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {[['/', 'Inicio'], ['/nosotros', 'Nosotros'], ['/servicios', 'Servicios'],
              ['/calidad', 'Calidad'], ['/pqrs', 'PQRS'], ['/trabaja', 'Trabaja con Nosotros'],
              ['/contacto', 'Contacto']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#00A896] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#00A896] mb-3 uppercase text-sm tracking-wide">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <span>📍</span>
              <span>Carrera 21 #21-24, Ciénaga, Magdalena</span>
            </li>
            <li className="flex gap-2">
              <span>📞</span>
              <a href="tel:+6054102804" className="hover:text-[#00A896]">(605) 4102804</a>
            </li>
            <li className="flex gap-2">
              <span>💬</span>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00A896]"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex gap-2">
              <span>🚨</span>
              <span className="text-[#00A896] font-semibold">Urgencias 24/7</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Polifracturas Ciénaga IPS S.A.S. — NIT en trámite · Todos los derechos reservados.
      </div>
    </footer>
  )
}
