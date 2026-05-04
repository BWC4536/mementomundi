import { Navbar } from '@/components/Navbar'

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10">
          <img src="/memento-logo.svg" alt="Memento Mundi" className="h-16 mx-auto mb-6" />
          <h1 className="font-brasica text-3xl font-bold text-navy mb-3">Sobre Nosotros</h1>
          <p className="text-navy text-opacity-70 leading-relaxed">
            MementoMundi nace de la idea de que los viajes no son solo momentos pasados, sino historias
            que merecen ser contadas y compartidas.
          </p>
        </div>

        {/* Story */}
        <div className="space-y-6 mb-8">
          {[
            {
              title: '¿Qué es MementoMundi?',
              text: 'Un proyecto que combina la magia de las pegatinas físicas con la comunidad digital. Cada pegatina es un recuerdo tangible de tus aventuras.',
            },
            {
              title: 'Nuestra Misión',
              text: 'Conectar viajeros alrededor del mundo a través de historias visuales y momentos compartidos. Creemos que cada viaje merece ser recordado.',
            },
            {
              title: 'Por qué Pegatinas',
              text: 'Las pegatinas son el formato perfecto: pequeñas, portátiles, personalizables. Son la forma más creativa de dejar tu huella en el mundo.',
            },
          ].map((section, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-card-soft">
              <h3 className="font-brasica font-bold text-navy mb-2">{section.title}</h3>
              <p className="text-sm text-navy text-opacity-70 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-orange bg-opacity-10 border-l-4 border-orange rounded-lg p-4 mb-6">
          <p className="text-sm font-bold text-navy mb-3">Contáctanos</p>
          <div className="space-y-2 text-xs text-navy text-opacity-70">
            <p>📧 hola@mementomundi.com</p>
            <p>📍 Madrid, España</p>
            <p>🌐 www.mementomundi.com</p>
          </div>
        </div>

        {/* Social */}
        <div className="text-center">
          <p className="text-xs text-navy text-opacity-40 uppercase tracking-widest mb-4">Síguenos</p>
          <div className="flex gap-3 justify-center">
            {[
              { icon: '📸', label: 'Instagram' },
              { icon: '🎵', label: 'TikTok' },
              { icon: '𝕏', label: 'Twitter' },
            ].map((social, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-lg hover:scale-110 transition-transform"
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
