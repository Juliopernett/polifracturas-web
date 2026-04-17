# CLAUDE.md — Polifracturas Ciénaga IPS S.A.S. — Sitio Web Institucional

## Comandos esenciales

```bash
# Frontend (React) — desde la raíz del monorepo
npm run dev --prefix client       # Dev server → http://localhost:5173
npm run build --prefix client     # Build producción → client/dist/

# Backend (Express) — desde la raíz del monorepo
node server/index.js              # API → http://localhost:3001

# O desde las subcarpetas:
cd client && npm run dev
cd server && node index.js
```

El frontend hace proxy de `/api/*` al backend en dev (configurado en `vite.config.js`).

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 (`@tailwindcss/vite`) |
| Router | React Router DOM v7 |
| HTTP client | Axios |
| Backend | Node.js + Express 5 |
| Email | **Brevo HTTP API** (fetch nativo, no Nodemailer) |
| Upload de archivos | Multer v2 (PDFs, máx 5 MB) |
| Imágenes | WebP (convertidas con Sharp para máximo rendimiento) |

---

## Estructura de carpetas

```
polifracturas-web/
├── package.json                 ← RAÍZ: scripts build/start para Railway
├── CLAUDE.md
├── nixpacks.toml                ← Fallback (Railway usa Railpack ahora)
├── client/
│   ├── public/                  ← Imágenes estáticas WebP
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       ← Sticky, responsive, burger menu mobile
│   │   │   ├── Footer.jsx       ← 3 columnas: logo, nav, contacto
│   │   │   └── PageHero.jsx     ← Hero reutilizable con prop bgImage
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Quality.jsx
│   │   │   ├── Financial.jsx
│   │   │   ├── SGSST.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── WorkWithUs.jsx
│   │   │   └── PQRS.jsx
│   │   ├── App.jsx              ← BrowserRouter + Routes (9 rutas)
│   │   ├── main.jsx
│   │   └── index.css            ← @import "tailwindcss"
│   ├── index.html               ← lang="es", Google Fonts Inter, meta description
│   └── vite.config.js           ← plugins: [react(), tailwindcss()], proxy /api → :3001
└── server/
    ├── index.js                 ← Entry point; IPv4 DNS forzado; sirve /client/dist en prod
    ├── routes/
    │   ├── contact.js           ← POST /api/contact → Brevo API
    │   ├── pqrs.js              ← POST /api/pqrs → radicado PQRS-YYYYMMDD-XXXX + Brevo
    │   └── jobs.js              ← POST /api/jobs → Multer PDF + Brevo
    ├── uploads/                 ← CVs recibidos (gitignored)
    └── .env                     ← ver variables abajo
```

---

## Rutas del sitio

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Hero con banner, cards de servicios, sección nosotros, CTA |
| `/nosotros` | `About.jsx` | Historia, misión, visión, valores, objetivos, mapa de procesos |
| `/servicios` | `Services.jsx` | Tabs por categoría + sección tecnología |
| `/calidad` | `Quality.jsx` | Política de calidad oficial, pilares, normatividad |
| `/financiero` | `Financial.jsx` | Información financiera institucional |
| `/sgsst` | `SGSST.jsx` | Sistema de Gestión SST, documentos |
| `/contacto` | `Contact.jsx` | Formulario, foto fachada, mapa, horarios, botones llamada/WhatsApp |
| `/trabaja` | `WorkWithUs.jsx` | Vacantes + formulario con upload PDF del CV |
| `/pqrs` | `PQRS.jsx` | Formulario PQRS, genera radicado, envía email de confirmación |

---

## Imágenes en `/client/public/` (todas en WebP)

| Archivo | Contenido | Usado en |
|---------|-----------|----------|
| `logo.png` | Logo oficial Polifracturas | Navbar, Footer |
| `banner.webp` | Banner hero | Hero de Home (fondo) |
| `fachada.webp` | Fachada exterior sede (toma 1) | Contact |
| `fachada2.webp` | Fachada exterior sede (toma 2) | Home, About |
| `medicos-juntos.webp` | Equipo médico reunido | About, Quality, Services CTA |
| `ortopedia.webp` | Sala de ortopedia | Services tab Quirúrgicos |
| `cirugia.webp` | Sala quirúrgica | Services (tecnología), CTA Home |
| `urgencias.webp` | Sala de urgencias | Services tab Clínicos, Home card |
| `camilla.webp` | Habitación hospitalaria | Home card, Quality PageHero |
| `ayudas_diagnosticas.webp` | Sala de diagnóstico imágenes | Services tab Diagnósticos, Home card |
| `rehabilitacion.webp` | Sesión de fisioterapia | Services tab Rehabilitación, Contact PageHero |
| `mapa-procesos.webp` | Mapa de procesos institucional | About |

---

## Colores y diseño

| Token | Valor | Uso |
|-------|-------|-----|
| Azul principal | `#1E3A5F` | Navbar, footer, títulos, fondos oscuros |
| Verde/turquesa | `#00A896` | Acentos, CTAs secundarios, badges |
| Overlay hero | `bg-[#1E3A5F]/88` | Sobre imágenes de fondo |
| Fuente | Inter (Google Fonts) | Todo el sitio |

**PageHero** acepta prop `bgImage` (default `/cirugia.webp`).

---

## Backend — Endpoints API

### `POST /api/contact`
Campos: `name`, `email`, `phone`, `message`  
→ Envía email al `ADMIN_EMAIL` vía Brevo HTTP API

### `POST /api/pqrs`
Campos: `type` (peticion/queja/reclamo/sugerencia), `name`, `email`, `phone`, `message`  
→ Genera radicado `PQRS-YYYYMMDD-XXXX`  
→ Email al admin + confirmación al usuario con número de radicado

### `POST /api/jobs`
Campos: `name`, `email`, `position`, `message` + archivo `cv` (PDF, máx 5 MB)  
→ Guarda PDF en `server/uploads/`  
→ Email al admin con adjunto

### Variables de entorno (`.env` del servidor / Railway)

```
BREVO_API_KEY=xkeysib-...     ← API key de Brevo (NO la SMTP key xsmtpsib-)
EMAIL_USER=noreply@polifracturas.com   ← remitente verificado en Brevo
ADMIN_EMAIL=admin@polifracturas.com    ← destinatario de formularios
PORT=3001                              ← Railway inyecta PORT=8080 en producción
```

**Importante**: usar la API key (`xkeysib-...`) de Brevo → SMTP & API → API Keys, NO la SMTP key (`xsmtpsib-...`).

---

## Despliegue en Railway

- **Repo GitHub**: `https://github.com/Juliopernett/polifracturas-web.git` (rama `master`)
- **URL producción**: `https://polifracturas-web-production.up.railway.app/`
- **Builder**: Railpack (lee `package.json` raíz)
- **Build**: `npm install --prefix client && npm run build --prefix client`
- **Start**: `node server/index.js`
- **Puerto Railway**: configurado en 8080 (variable `PORT` inyectada automáticamente)

Para desplegar: `git push origin master` → Railway auto-deploys.

### Cosas que NO hacer en Railway
- No poner el puerto de escucha en 5173 (es el dev port de Vite)
- No usar Nodemailer con Gmail SMTP — Railway bloquea IPv6 a Gmail (ENETUNREACH)
- No usar `xsmtpsib-` keys de Brevo — solo funciona la API key `xkeysib-`

---

## Información institucional real

- **Razón social**: Polifracturas Ciénaga IPS S.A.S.
- **Matrícula mercantil**: N° 0170648 — Cámara de Comercio de Santa Marta
- **Fecha constitución**: 28 de julio de 2015
- **Nivel de atención**: I y II
- **Dirección**: Carrera 21 #21-24, Ciénaga, Magdalena
- **Teléfono**: (605) 4102804
- **Horario urgencias**: 24 horas / 7 días / 365 días
- **Horario ambulatorio**: Lunes a Viernes 7:00 a.m. – 4:30 p.m.
- **Normativa**: Resolución 2003 de 2014 del Ministerio de la Protección Social
- **Convenios diagnósticos**: Policlínica Ciénaga (laboratorio, tomografía, ultrasonografía)

---

## Archivos fuente originales

```
C:\Users\JULIO PERNETT\Desktop\PROYECTOS IA\Polifracturas\
├── PRD.txt                              ← Requisitos del proyecto
├── inf. polifracturas.txt               ← Contenido real (misión, visión, servicios...)
├── logo_mejor_calidad.png               ← Logo original
├── MAPA PROCESOS POLIFRACTURAS.jpeg     ← Original del mapa de procesos
└── recursos/                            ← Imágenes originales sin renombrar
```
