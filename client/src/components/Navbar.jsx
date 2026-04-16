import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/calidad', label: 'Calidad' },
  { to: '/financiero', label: 'Financiero' },
  { to: '/sgsst', label: 'SG-SST' },
  { to: '/pqrs', label: 'PQRS' },
  { to: '/trabaja', label: 'Trabaja con Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#1E3A5F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Polifracturas" className="h-10 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1 text-sm">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-white transition-colors ${isActive ? 'bg-[#00A896]' : 'hover:bg-white/10'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contacto"
            className="ml-3 bg-[#00A896] hover:bg-[#008a7c] text-white font-semibold px-4 py-2 rounded transition-colors"
          >
            Agendar Cita
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="xl:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-[#162d4a] px-4 pb-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-white text-sm mt-1 ${isActive ? 'bg-[#00A896]' : 'hover:bg-white/10'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="block mt-3 bg-[#00A896] text-white font-semibold px-4 py-2 rounded text-center"
          >
            Agendar Cita
          </Link>
        </div>
      )}
    </header>
  )
}
