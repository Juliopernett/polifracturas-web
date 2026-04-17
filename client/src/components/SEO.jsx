import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Polifracturas Ciénaga IPS S.A.S.'
const BASE_URL = 'https://polifracturascienaga.com'
const DEFAULT_IMAGE = `${BASE_URL}/banner.webp`
const DEFAULT_DESCRIPTION =
  'Clínica especializada en fracturas, ortopedia y traumatología en Ciénaga, Magdalena. Urgencias 24/7. Cirugía, rehabilitación y diagnóstico por imágenes. Llama al (605) 4102804.'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  path = '/',
}) {
  const fullTitle = title
    ? `${title} | Polifracturas Ciénaga IPS`
    : 'Polifracturas Ciénaga IPS | Clínica de Fracturas y Ortopedia en Ciénaga, Magdalena'

  const canonicalUrl = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_CO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
