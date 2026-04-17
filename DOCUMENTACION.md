# Documentación del Proyecto — Polifracturas Ciénaga IPS S.A.S.

**URL producción:** https://polifracturascienaga.com  
**Repositorio:** https://github.com/Juliopernett/polifracturas-web  
**Plataforma:** Railway (auto-deploy desde rama `master`)  
**Última actualización:** 2026-04-17

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite | 19 / 8 |
| Estilos | Tailwind CSS v4 | `@tailwindcss/vite` |
| Router | React Router DOM | v7 |
| HTTP client | Axios | ^1.15 |
| SEO | react-helmet-async | instalado |
| Backend | Node.js + Express | 5 |
| Email | Brevo HTTP API | fetch nativo |
| Upload | Multer | v2 |
| Imágenes | WebP | convertidas con Sharp |
| DNS | Cloudflare | dominio propio |
| Hosting | Railway | plan Hobby ~$8 USD/mes |

---

## Estructura del proyecto

```
polifracturas-web/
├── package.json                 ← scripts build/start para Railway
├── CLAUDE.md                    ← instrucciones para Claude Code
├── DOCUMENTACION.md             ← este archivo
├── nixpacks.toml
├── client/
│   ├── public/
│   │   ├── robots.txt           ← SEO: permite indexación + sitemap
│   │   ├── sitemap.xml          ← 9 URLs del sitio
│   │   ├── logo.png
│   │   ├── banner.webp
│   │   ├── fachada.webp
│   │   ├── fachada2.webp
│   │   ├── medicos-juntos.webp
│   │   ├── ortopedia.webp
│   │   ├── cirugia.webp
│   │   ├── urgencias.webp
│   │   ├── camilla.webp
│   │   ├── ayudas_diagnosticas.webp
│   │   ├── rehabilitacion.webp
│   │   └── mapa-procesos.webp
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageHero.jsx
│   │   │   └── SEO.jsx          ← meta tags dinámicos por página
│   │   ├── pages/
│   │   │   ├── Home.jsx         ← hero, servicios, FAQ, CTA
│   │   │   ├── About.jsx        ← historia, misión, visión, valores
│   │   │   ├── Services.jsx     ← tabs: ortopedia, urgencias, diagnóstico, rehabilitación
│   │   │   ├── Quality.jsx      ← política de calidad, pilares, documentos
│   │   │   ├── Financial.jsx    ← información financiera
│   │   │   ├── SGSST.jsx        ← Sistema de Gestión SST
│   │   │   ├── Contact.jsx      ← formulario, mapa, horarios
│   │   │   ├── WorkWithUs.jsx   ← vacantes + upload CV PDF
│   │   │   └── PQRS.jsx         ← formulario PQRS con número de radicado
│   │   ├── App.jsx              ← HelmetProvider + BrowserRouter + 9 rutas
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html               ← JSON-LD MedicalBusiness, OG tags, geo-tags
│   └── vite.config.js           ← proxy /api → :3001 en dev
└── server/
    ├── index.js                 ← entry point; sirve /client/dist en prod
    ├── routes/
    │   ├── contact.js           ← POST /api/contact
    │   ├── pqrs.js              ← POST /api/pqrs → radicado PQRS-YYYYMMDD-XXXX
    │   └── jobs.js              ← POST /api/jobs → CV PDF + Brevo
    ├── uploads/                 ← CVs temporales (gitignored)
    └── .env
```

---

## Rutas del sitio

| URL | Componente | Title SEO |
|-----|-----------|-----------|
| `/` | `Home.jsx` | Clínica de Fracturas y Ortopedia en Ciénaga, Magdalena |
| `/nosotros` | `About.jsx` | Quiénes Somos |
| `/servicios` | `Services.jsx` | Servicios Médicos — Ortopedia, Cirugía y Rehabilitación |
| `/calidad` | `Quality.jsx` | Políticas de Calidad |
| `/financiero` | `Financial.jsx` | Información Financiera |
| `/sgsst` | `SGSST.jsx` | SG-SST |
| `/contacto` | `Contact.jsx` | Contacto — Clínica de Fracturas y Ortopedia en Ciénaga |
| `/trabaja` | `WorkWithUs.jsx` | Trabaja con Nosotros |
| `/pqrs` | `PQRS.jsx` | PQRS — Peticiones, Quejas, Reclamos y Sugerencias |

---

## API Endpoints (backend)

### POST `/api/contact`
Formulario de contacto general.

```json
{ "name": "...", "email": "...", "phone": "...", "message": "..." }
```
→ Envía email al `ADMIN_EMAIL` vía Brevo HTTP API.

---

### POST `/api/pqrs`
Radicación de PQRS.

```json
{ "type": "peticion|queja|reclamo|sugerencia", "name": "...", "email": "...", "phone": "...", "message": "..." }
```
→ Genera radicado `PQRS-YYYYMMDD-XXXX`.  
→ Email al admin + confirmación al usuario con número de radicado.

---

### POST `/api/jobs`
Postulación laboral con CV en PDF.

```
FormData: { name, email, position, message, cv (PDF ≤ 5 MB) }
```
→ Guarda PDF en `server/uploads/`.  
→ Email al admin con CV adjunto via Brevo.

---

## Variables de entorno (`.env` del servidor / Railway)

```env
BREVO_API_KEY=xkeysib-...          # API key Brevo (NO la xsmtpsib-)
EMAIL_USER=noreply@polifracturas.com
ADMIN_EMAIL=admin@polifracturas.com
PORT=3001                           # Railway inyecta 8080 en producción
```

---

## SEO implementado

### Archivos estáticos
- `client/public/robots.txt` — permite indexación total + referencia al sitemap
- `client/public/sitemap.xml` — 9 URLs con priority y changefreq

### Meta tags dinámicos
`client/src/components/SEO.jsx` — usa `react-helmet-async` para inyectar por página:
- `<title>` único
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card

### JSON-LD estructurado (`index.html`)
Schema `MedicalBusiness` con:
- Nombre, dirección, teléfono
- `areaServed`: Ciénaga, Santa Marta, Magdalena
- Especialidades médicas
- Horarios de atención

### FAQPage schema (`Home.jsx`)
4 preguntas frecuentes con schema `FAQPage` para rich snippets en Google.

### Keywords objetivo
- "clínica de fracturas en Ciénaga"
- "ortopedia en Santa Marta"
- "Polifracturas IPS"
- "traumatología Magdalena"
- "urgencias 24 horas Ciénaga"

---

## Despliegue

### Flujo de deploy
```
git push origin master  →  Railway detecta cambio  →  build automático  →  deploy
```

### Comandos Railway
```bash
# Build
npm install --prefix client && npm run build --prefix client

# Start
node server/index.js
```

### DNS (Cloudflare → Railway)
| Tipo | Nombre | Valor | Proxy |
|------|--------|-------|-------|
| CNAME | `@` | `*.up.railway.app` | OFF (gris) |
| CNAME | `www` | `*.up.railway.app` | OFF (gris) |

Puerto Railway: **8080** (inyectado automáticamente via `PORT`).

---

## Colores y branding

| Token | Valor | Uso |
|-------|-------|-----|
| Azul principal | `#1E3A5F` | Navbar, footer, títulos |
| Verde/turquesa | `#00A896` | Acentos, CTAs, badges |
| Overlay hero | `bg-[#1E3A5F]/88` | Sobre imágenes |
| Fuente | Inter (Google Fonts) | Todo el sitio |

---

## Información institucional

| Campo | Valor |
|-------|-------|
| Razón social | Polifracturas Ciénaga IPS S.A.S. |
| Matrícula mercantil | N° 0170648 — Cámara de Comercio de Santa Marta |
| Constitución | 28 de julio de 2015 |
| Nivel de atención | I y II |
| Dirección | Carrera 21 #21-24, Ciénaga, Magdalena |
| Teléfono | (605) 4102804 |
| Urgencias | 24 horas / 7 días / 365 días |
| Consulta ambulatoria | Lunes a Viernes 7:00 a.m. – 4:30 p.m. |
| Normativa | Resolución 2003 de 2014 — Ministerio de la Protección Social |

---

## Costos mensuales estimados

| Concepto | USD/mes | COP/mes (~$4.200) |
|----------|---------|-------------------|
| Railway Hosting | ~$8 | ~$33.600 |
| Cloudflare dominio | ~$1 | ~$4.200 |
| Brevo email | $0 | $0 |
| **Total** | **~$9** | **~$37.800** |

---

## Mantenimiento recomendado

- Actualizar `sitemap.xml` si se agregan nuevas páginas
- Renovar dominio en Cloudflare anualmente (~$12 USD)
- Revisar Railway dashboard mensualmente para verificar consumo
- Actualizar vacantes en `WorkWithUs.jsx` según disponibilidad
- Mantener `react-helmet-async` y dependencias actualizadas semestralmente
