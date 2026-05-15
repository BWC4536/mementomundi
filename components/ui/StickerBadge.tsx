'use client'

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Color = 'orange' | 'coral' | 'cream' | 'navy' | 'teal' | 'teal-dark'
type Size = 'xs' | 'sm' | 'md' | 'lg'

interface StickerBadgeProps {
  children: ReactNode
  color?: Color
  /** Rotation in degrees. */
  rotate?: number
  /** Optional Lucide icon (renders before text). */
  icon?: LucideIcon
  /** Size scale. */
  size?: Size
  /** Optional className for positioning (absolute, etc.). */
  className?: string
  /** Style override for animation-delay or CSS vars (e.g., --r). */
  style?: React.CSSProperties
  /** Inline-flex vs inline-block. Default inline-flex (with gap if icon). */
  asLink?: { href: string }
}

const COLOR_MAP: Record<Color, { bg: string; text: string }> = {
  orange: { bg: 'bg-orange', text: 'text-navy' },
  coral: { bg: 'bg-coral', text: 'text-navy' },
  cream: { bg: 'bg-cream', text: 'text-navy' },
  navy: { bg: 'bg-navy', text: 'text-cream' },
  teal: { bg: 'bg-teal-light', text: 'text-navy' },
  'teal-dark': { bg: 'bg-teal-dark', text: 'text-cream' },
}

const SIZE_MAP: Record<Size, { padding: string; text: string; icon: number }> = {
  xs: { padding: 'px-2 py-1', text: 'text-[10px]', icon: 12 },
  sm: { padding: 'px-3 py-1.5', text: 'text-xs', icon: 14 },
  md: { padding: 'px-4 py-2', text: 'text-sm', icon: 16 },
  lg: { padding: 'px-5 py-2.5', text: 'text-base', icon: 18 },
}

/**
 * Chip estilo sticker rotado con drop-shadow navy.
 * Reemplaza emojis decorativos por iconos Lucide.
 */
export function StickerBadge({
  children,
  color = 'orange',
  rotate = 0,
  icon: Icon,
  size = 'md',
  className = '',
  style,
  asLink,
}: StickerBadgeProps) {
  const colors = COLOR_MAP[color]
  const sizing = SIZE_MAP[size]
  const rotateStyle = rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : {}
  const mergedStyle: React.CSSProperties = { ...rotateStyle, ...style }

  const inner = (
    <span
      className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text}
                  font-display font-black uppercase tracking-wider ${sizing.text} ${sizing.padding}
                  rounded-full sticker ${className}`}
      style={mergedStyle}
    >
      {Icon && <Icon size={sizing.icon} strokeWidth={2.5} aria-hidden />}
      {children}
    </span>
  )

  if (asLink) {
    return (
      <a href={asLink.href} className="inline-block">
        {inner}
      </a>
    )
  }

  return inner
}
