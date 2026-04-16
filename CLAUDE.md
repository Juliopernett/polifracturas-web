# CLAUDE.md — Polifracturas Ciénaga IPS S.A.S. — Sitio Web Institucional

## Comandos esenciales

```bash
# Frontend (React)
cd polifracturas-web/client
npm run dev        # Dev server → http://localhost:5173
npm run build      # Build producción

# Backend (Express)
cd polifracturas-web/server
node index.js      # API → http://localhost:3001
```

El frontend hace proxy de `/api/*` al backend (configurado en `vite.config.js`).

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 (`@tailwindcss/vite`) |
| Router | React Router DOM v7 |
| HTTP client | Axios |
| Backend | Node.js + Express |
| Email | Nodemailer (Gmail) |
| Upload de archivos | Multer (PDFs, máx 5 MB) |

---

## Estructura de carpetas

```
polifracturas-web/
├── client/
│   ├── public/                  ← Imágenes estáticas (ver tabla abajo)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       ← Sticky, responsive, con burger menu mobile
│   │   │   ├── Footer.jsx       ← 3 columnas: logo, nav, contacto
│   │   │   └── PageHero.jsx     ← Hero reutilizable con bgImage prop
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
│   │   ├── App.jsx              ← BrowserRouter + Routes
│   │   ├── main.jsx
│   │   └── index.css            ← @import "tailwindcss" + reset
│   ├── index.html               ← lang="es", Google Fonts Inter, meta description
│   └── vite.config.js           ← plugins: [react(), tailwindcss()], proxy /api
└── server/
    ├── index.js                 ← Express entry, puerto 3001
    ├── routes/
    │   ├── contact.js           ← POST /api/contact
    │   ├── pqrs.js              ← POST /api/pqrs (genera número de radicado)
    │   └── jobs.js              ← POST /api/jobs (Multer, adjunta CV por email)
    ├── uploads/                 ← CVs recibidos (gitignored)
    └── .env                     ← EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL, PORT
```

---

## Rutas del sitio

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Hero con banner, cards de servicios, sección nosotros, CTA |
| `/nosotros` | `About.jsx` | Historia, misión, visión, valores, objetivos, mapa de procesos |
| `/servicios` | `Services.jsx` | Tabs por categoría + tecnología disponible |
| `/calidad` | `Quality.jsx` | Política de calidad oficial, pilares, normatividad |
| `/financiero` | `Financial.jsx` | Información financiera institucional |
| `/sgsst` | `SGSST.jsx` | Sistema de Gestión SST, documentos |
| `/contacto` | `Contact.jsx` | Formulario, foto fachada, mapa, horarios, botones llamada/WhatsApp |
| `/trabaja` | `WorkWithUs.jsx` | Vacantes + formulario con upload PDF del CV |
| `/pqrs` | `PQRS.jsx` | Formulario PQRS, genera radicado, envía email de confirmación |

---

## Imágenes disponibles en `/client/public/`

| Archivo | Contenido | Usado en |
|---------|-----------|----------|
| `logo.png` | Logo oficial Polifracturas | Navbar, Footer |
| `banner.png` | Banner con logo + "Urgencias 24/7" | Hero de Home (fondo) |
| `fachada.png` | Fachada exterior sede (toma 1) | Contact |
| `fachada2.png` | Fachada exterior sede (toma 2, logo visible) | Home, About |
| `medicos-juntos.png` | Equipo médico reunido | About, Quality, Services CTA |
| `ortopedia.png` | Sala de ortopedia y traumatología | Services hero, tab Quirúrgicos |
| `cirugia.png` | Instrumental quirúrgico en sala | Services (tecnología), CTA home |
| `urgencias.png` | Sala de urgencias real | Services tab Clínicos, Home card |
| `camilla.png` | Habitación hospitalaria | Home about, Services tab Clínicos |
| `ayudas_diagnosticas.png` | Sala TAC / diagnóstico imágenes | Services tab Diagnósticos, Home card |
| `rehabilitacion.png` | Sesión de fisioterapia | Services tab Rehabilitación, PageHero |
| `mapa-procesos.jpeg` | Mapa de procesos institucional | About |

---

## Colores y diseño

| Token | Valor | Uso |
|-------|-------|-----|
| Azul principal | `#1E3A5F` | Navbar, footer, títulos, fondos oscuros |
| Verde/turquesa | `#00A896` | Acentos, CTAs secundarios, badges |
| Overlay hero | `bg-[#1E3A5F]/88` | Sobre imágenes de fondo |
| Fuente | Inter (Google Fonts) | Todo el sitio |

**PageHero** acepta prop `bgImage` (default `/cirugia.png`) para cambiar la imagen de fondo por página.

---

## Backend — Endpoints API

### `POST /api/contact`
Campos: `name`, `email`, `phone`, `message`
→ Envía email al `ADMIN_EMAIL`

### `POST /api/pqrs`
Campos: `type` (peticion/queja/reclamo/sugerencia), `name`, `email`, `phone`, `message`
→ Genera radicado `PQRS-YYYYMMDD-XXXX`
→ Email al admin + email de confirmación al usuario con el radicado

### `POST /api/jobs`
Campos: `name`, `email`, `position`, `message` + archivo `cv` (PDF, máx 5 MB)
→ Guarda PDF en `server/uploads/`
→ Envía email al admin con el PDF adjunto

### `.env` del servidor
```
EMAIL_USER=correo@gmail.com
EMAIL_PASS=contraseña_de_aplicacion_gmail
ADMIN_EMAIL=admin@polifracturas.com
PORT=3001
```

---

## Información institucional real (fuente: `inf. polifracturas.txt`)

- **Razón social**: Polifracturas Ciénaga IPS S.A.S.
- **Matrícula mercantil**: N° 0170648 — Cámara de Comercio de Santa Marta
- **Fecha constitución**: 28 de julio de 2015
- **Nivel de atención**: I y II
- **Dirección**: Carrera 21 #21-24, Ciénaga, Magdalena
- **Teléfono**: (605) 4102804
- **Horario urgencias**: 24 horas / 7 días
- **Horario ambulatorio**: Lunes a Viernes 7:00 a.m. – 4:30 p.m.
- **Normativa**: Resolución 2003 de 2014 del Ministerio de la Protección Social
- **Convenios diagnósticos**: Policlínica Ciénaga (laboratorio, tomografía, ultrasonografía)

### Servicios reales documentados
- **Urgencias**: consultorio independiente, sala reanimación, sala yeso, 7 camas observación
- **Hospitalización**: 2 habitaciones bipersonales
- **Cirugías**: ortopédica, mano, maxilofacial, general, plástica y estética
- **Diagnóstico**: laboratorio, tomografía, ultrasonografía, sala imágenes para ortopedia
- **Rehabilitación**: fisioterapia, medicina física, terapia ocupacional, rehabilitación neurológica
- **Tecnología**: instrumental última generación para trauma ortopédico mayor, pelvis-acetábulo, trauma apendicular; mesas quirúrgicas especializadas

---

## Archivos fuente originales

```
C:\Users\JULIO PERNETT\Desktop\PROYECTOS IA\Polifracturas\
├── PRD.txt                        ← Requisitos del proyecto
├── inf. polifracturas.txt         ← Contenido real (misión, visión, servicios...)
├── logo_mejor_calidad.png         ← Logo original (copiado como logo.png)
├── MAPA PROCESOS POLIFRACTURAS.jpeg
└── recursos/                      ← Imágenes originales sin renombrar
```
