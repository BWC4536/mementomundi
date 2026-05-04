import { Navbar } from '@/components/Navbar'

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-teal-dark mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
            A
          </div>
          <h1 className="font-brasica text-2xl font-bold text-navy mb-1">Ana García</h1>
          <p className="text-sm text-navy text-opacity-60 mb-3">@anaviajera</p>
          <p className="text-xs text-navy text-opacity-50 max-w-xs mx-auto">
            Aventurera, viajera, coleccionista de momentos. 🌍✈️
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Viajes', value: '3' },
            { label: 'Pegatinas', value: '45' },
            { label: 'Seguidores', value: '234' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-card-soft">
              <p className="text-2xl font-bold text-orange mb-1">{stat.value}</p>
              <p className="text-xs text-navy text-opacity-60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {[
            { label: 'Editar perfil', icon: '✏️' },
            { label: 'Mis preferencias', icon: '⚙️' },
            { label: 'Privacidad y seguridad', icon: '🔒' },
            { label: 'Notificaciones', icon: '🔔' },
            { label: 'Descargar mis datos', icon: '📥' },
            { label: 'Cerrar sesión', icon: '🚪', danger: true },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                item.danger
                  ? 'bg-pink bg-opacity-10 text-pink hover:bg-opacity-20'
                  : 'bg-white shadow-card-soft hover:shadow-card-hover'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-sm font-bold ${item.danger ? 'text-pink' : 'text-navy'}`}>
                {item.label}
              </span>
              <span className="ml-auto text-navy text-opacity-30">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
