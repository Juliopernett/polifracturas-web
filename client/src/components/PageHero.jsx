export default function PageHero({ title, subtitle, bgImage = '/cirugia.png' }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/80" />

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow">{title}</h1>
        {subtitle && (
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
