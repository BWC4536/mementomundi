import { Navbar } from '@/components/Navbar'
import type { Post } from '@/types'

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    tripId: '1',
    tripName: 'Grecia 2025',
    image: '🏛️',
    caption: '¡Santorini es increíble! 🌅 Cada pegatina cuenta una historia de nuestro viaje.',
    likes: 234,
    comments: 12,
    createdAt: '2025-03-15',
  },
  {
    id: '2',
    tripId: '2',
    tripName: 'Lisboa con todo',
    image: '🌊',
    caption: 'Lisboa nos conquistó. Pegatinas de cada rincón mágico de la ciudad.',
    likes: 456,
    comments: 28,
    createdAt: '2025-02-28',
  },
  {
    id: '3',
    tripId: '1',
    tripName: 'Grecia 2025',
    image: '🏛️',
    caption: 'Las vistas desde Oia son de ensueño. #MementoMundi #Viajes',
    likes: 189,
    comments: 8,
    createdAt: '2025-03-10',
  },
]

export default function RRSSPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Feed */}
      <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-card-soft">
            {/* Header */}
            <div className="p-4 border-b border-navy border-opacity-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <p className="font-brasica font-bold text-navy text-sm">{post.tripName}</p>
                  <p className="text-xs text-navy text-opacity-40">hace 2 días</p>
                </div>
              </div>
              <button className="text-2xl hover:opacity-60 transition">⋯</button>
            </div>

            {/* Image/Emoji */}
            <div className="bg-gradient-to-br from-orange to-pink flex items-center justify-center h-80">
              <span className="text-8xl">{post.image}</span>
            </div>

            {/* Engagement */}
            <div className="p-4">
              <div className="flex gap-4 mb-3">
                <button className="text-2xl hover:scale-125 transition">♡</button>
                <button className="text-2xl hover:scale-125 transition">💬</button>
                <button className="text-2xl hover:scale-125 transition">📤</button>
              </div>

              <p className="text-sm font-bold text-navy mb-2">{post.likes} me gusta</p>

              <p className="text-sm text-navy mb-2">
                <span className="font-bold">{post.tripName}</span> {post.caption}
              </p>

              <button className="text-xs text-navy text-opacity-50 hover:text-opacity-75 transition">
                Ver los {post.comments} comentarios
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-7 right-4.5 z-10">
        <button className="btn-primary bg-orange text-white rounded-full py-3.5 px-5.5 font-bold text-base shadow-lg flex items-center gap-2">
          <span className="text-lg">+</span> Compartir
        </button>
      </div>
    </div>
  )
}
