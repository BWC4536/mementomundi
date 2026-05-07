interface MascotProps {
  size?: number
  wink?: boolean
  handUp?: boolean
  color?: string
}

export function Mascot({ size = 80, wink = false, handUp = false, color = '#0B2150' }: MascotProps) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 100 130" fill="none">
      <rect x="38" y="72" width="12" height="35" rx="4" fill={color} />
      <rect x="52" y="72" width="12" height="35" rx="4" fill={color} />
      <ellipse cx="44" cy="109" rx="10" ry="5" fill={color} />
      <ellipse cx="58" cy="109" rx="10" ry="5" fill={color} />
      <circle cx="50" cy="42" r="32" fill="white" stroke={color} strokeWidth="3" />
      <path d="M72 16 L82 26 L72 26 Z" fill="#EAE7DA" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {wink ? (
        <>
          <ellipse cx="42" cy="42" rx="3" ry="4" fill={color} />
          <path d="M50 41 Q54 38 58 41" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="42" cy="42" rx="3" ry="4" fill={color} />
          <ellipse cx="58" cy="42" rx="3" ry="4" fill={color} />
        </>
      )}
      {handUp && (
        <>
          <line x1="50" y1="80" x2="20" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="52" r="5" fill={color} />
          <text x="2" y="40" fontSize="18" fill={color} fontWeight="bold">?</text>
        </>
      )}
    </svg>
  )
}
