'use client'

import type { ReactNode } from 'react'

type Size = 'sm' | 'md' | 'lg'

interface PolaroidProps {
  /** Image source (any /public path or external URL). Optional → falls back to gradient. */
  src?: string
  alt?: string
  /** Italic caption text under the image. */
  caption?: string
  /** Rotation in degrees, e.g. -3, 6, 12. */
  rotate?: number
  /** Show tape decoration on top. */
  tape?: boolean
  /** Tailwind size. sm = w-36, md = w-48, lg = w-56. Default md. */
  size?: Size
  /** Gradient fallback when no src. Format: 'from-X to-Y' (tailwind classes). */
  gradient?: string
  /** Extra content overlaid on the image (e.g., StickerBadge). */
  overlay?: ReactNode
  className?: string
  /** Optional click handler. */
  onClick?: () => void
}

const SIZE_CLASSES: Record<Size, { card: string; image: string; caption: string }> = {
  sm: { card: 'w-36', image: 'h-28', caption: 'text-sm' },
  md: { card: 'w-48 sm:w-56', image: 'h-40 sm:h-44', caption: 'text-base' },
  lg: { card: 'w-64 sm:w-72', image: 'h-52 sm:h-56', caption: 'text-lg' },
}

/**
 * Card polaroid con imagen + caption italic + tape opcional + sombra navy dura.
 * Patrón: marco crema, padding inferior mayor para el caption, rotación opcional.
 */
export function Polaroid({
  src,
  alt = '',
  caption,
  rotate = 0,
  tape = false,
  size = 'md',
  gradient = 'from-teal-light to-teal-dark',
  overlay,
  className = '',
  onClick,
}: PolaroidProps) {
  const sizing = SIZE_CLASSES[size]
  const rotateClass = rotate !== 0 ? `rotate-[${rotate}deg]` : ''
  const inlineStyle = rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined

  return (
    <div
      onClick={onClick}
      className={`polaroid relative ${sizing.card} ${rotateClass} ${onClick ? 'cursor-pointer' : ''} transition hover:-translate-y-1 ${className}`}
      style={inlineStyle}
    >
      {tape && (
        <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
      )}
      <div className={`relative w-full ${sizing.image} bg-gradient-to-br ${gradient} rounded-sm overflow-hidden`}>
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {overlay && <div className="absolute inset-0">{overlay}</div>}
      </div>
      {caption && (
        <p className={`font-display italic text-center mt-2 text-navy ${sizing.caption}`}>
          {caption}
        </p>
      )}
    </div>
  )
}
