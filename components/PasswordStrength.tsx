const LABELS = ['', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte']

const COLORS = ['', '#DC2626', '#F59E0B', '#10B981', '#10B981']

export function PasswordStrength({ strength }: { strength: number }) {
  if (strength === 0) return null
  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="flex-1 h-1 rounded-full transition-colors duration-300"
            style={{ background: strength >= level ? COLORS[strength] : 'rgba(11,33,80,0.12)' }}
          />
        ))}
      </div>
      <p className="font-grown font-semibold" style={{ fontSize: 12, color: COLORS[strength] }}>
        {LABELS[strength]}
      </p>
    </div>
  )
}
