'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 90
const FRAME_SPEED = 1.0
const INITIAL_LOAD = 12

interface FrameData {
  img: HTMLImageElement | null
  loaded: boolean
}

export function HeroScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<FrameData[]>([])
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'done'>('loading')
  const [loadProgress, setLoadProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const currentIndexRef = useRef(0)
  const targetIndexRef = useRef(0)

  const frameSrc = (i: number) => `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`

  // ─── Preload frames en dos fases ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return

    const frames: FrameData[] = Array.from({ length: TOTAL_FRAMES }, () => ({
      img: null,
      loaded: false,
    }))

    framesRef.current = frames

    const phase1Promises = Array.from({ length: INITIAL_LOAD }, (_, i) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          frames[i] = { img, loaded: true }
          setLoadProgress(Math.round(((i + 1) / INITIAL_LOAD) * 100))
          resolve()
        }
        img.onerror = () => {
          console.warn(`Frame ${i + 1} no se pudo cargar`)
          resolve()
        }
        img.src = frameSrc(i)
      })
    )

    Promise.all(phase1Promises).then(() => {
      setLoadingPhase('done')

      const remaining = []
      for (let batchStart = INITIAL_LOAD; batchStart < TOTAL_FRAMES; batchStart += 10) {
        const batchEnd = Math.min(batchStart + 10, TOTAL_FRAMES)
        const batch = Array.from({ length: batchEnd - batchStart }, (_, idx) => {
          const frameIdx = batchStart + idx
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => {
              frames[frameIdx] = { img, loaded: true }
              resolve()
            }
            img.onerror = () => resolve()
            img.src = frameSrc(frameIdx)
          })
        })
        remaining.push(Promise.all(batch))
      }
      Promise.all(remaining).catch(() => {})
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ─── Canvas renderer con smooth lerp ──────────────────────────────────
  useEffect(() => {
    if (loadingPhase !== 'done' || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current

    // Snapshot of viewport height to avoid jumps when mobile URL bar shows/hides
    let stableViewportHeight = window.innerHeight
    let stableViewportWidth = window.innerWidth

    const updateCanvasSize = () => {
      stableViewportHeight = window.innerHeight
      stableViewportWidth = window.innerWidth
      const dpr = window.devicePixelRatio || 1
      canvas.width = stableViewportWidth * dpr
      canvas.height = stableViewportHeight * dpr
      canvas.style.width = `${stableViewportWidth}px`
      canvas.style.height = `${stableViewportHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    window.addEventListener('orientationchange', updateCanvasSize)

    const drawFrame = (frameIndex: number) => {
      const frames = framesRef.current
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameIndex)))
      const frame = frames[idx]
      if (!frame?.img) return

      const img = frame.img
      const cWidth = stableViewportWidth
      const cHeight = stableViewportHeight

      // FULL COVER mode: cubrir toda la pantalla, recortando si es necesario
      const imgRatio = img.width / img.height
      const canvasRatio = cWidth / cHeight

      let drawWidth: number
      let drawHeight: number
      let drawX: number
      let drawY: number

      if (imgRatio > canvasRatio) {
        drawHeight = cHeight
        drawWidth = drawHeight * imgRatio
        drawX = (cWidth - drawWidth) / 2
        drawY = 0
      } else {
        drawWidth = cWidth
        drawHeight = drawWidth / imgRatio
        drawX = 0
        drawY = (cHeight - drawHeight) / 2
      }

      // Fondo del color de la primera esquina (evita flashes negros en HMR)
      ctx.fillStyle = '#0B2150'
      ctx.fillRect(0, 0, cWidth, cHeight)
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    }

    // Smooth lerp loop entre el índice actual y el objetivo
    const LERP_FACTOR = 0.08

    const tick = () => {
      const diff = targetIndexRef.current - currentIndexRef.current
      if (Math.abs(diff) > 0.01) {
        currentIndexRef.current += diff * LERP_FACTOR
        drawFrame(currentIndexRef.current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    // Render inicial
    drawFrame(0)
    rafRef.current = requestAnimationFrame(tick)

    // Scroll handler for frame animation — el multiplicador debe coincidir con la altura CSS
    // CSS desktop: 700vh → multiplicador 6, CSS mobile: 350vh → multiplicador 2.5
    const getScrollMultiplier = () => (window.innerWidth < 768 ? 2.5 : 6)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const containerTop = container.offsetTop
      const viewportHeight = stableViewportHeight
      const totalHeight = getScrollMultiplier() * viewportHeight

      const scrollStart = Math.max(0, containerTop)
      const scrollEnd = scrollStart + totalHeight
      const currentScroll = scrollY + viewportHeight / 2

      let progress = 0
      if (currentScroll >= scrollStart && currentScroll <= scrollEnd) {
        progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart)
      } else if (currentScroll < scrollStart) {
        progress = 0
      } else {
        progress = 1
      }

      const accel = Math.min(progress * FRAME_SPEED, 1)
      targetIndexRef.current = accel * (TOTAL_FRAMES - 1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      window.removeEventListener('orientationchange', updateCanvasSize)
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [loadingPhase])

  // ─── Textos overlay con scroll handler ────────────────────────────────
  useEffect(() => {
    if (loadingPhase !== 'done' || !containerRef.current) return

    const container = containerRef.current
    const texts = [
      { selector: '[data-text="0"]', start: 0.12, end: 0.32 },
      { selector: '[data-text="1"]', start: 0.38, end: 0.58 },
      { selector: '[data-text="2"]', start: 0.65, end: 0.88 },
    ]

    const elements = texts.map(({ selector, start, end }) => ({
      el: container.querySelector(selector) as HTMLElement | null,
      start,
      end,
    }))

    let stableViewportHeight = window.innerHeight
    const onResize = () => {
      stableViewportHeight = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    const getScrollMultiplier = () => (window.innerWidth < 768 ? 2.5 : 6)

    const updateTexts = () => {
      const scrollTop = window.scrollY
      const containerTop = container.offsetTop
      const totalHeight = getScrollMultiplier() * stableViewportHeight
      const scrollStart = Math.max(0, containerTop)
      const scrollEnd = scrollStart + totalHeight
      const currentScroll = scrollTop + stableViewportHeight / 2

      let progress = 0
      if (currentScroll >= scrollStart && currentScroll <= scrollEnd) {
        progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart)
      } else if (currentScroll > scrollEnd) {
        progress = 1
      }

      elements.forEach(({ el, start, end }) => {
        if (!el) return
        if (progress < start || progress > end) {
          el.style.opacity = '0'
          el.style.filter = 'blur(12px)'
          el.style.transform = 'translateY(20px)'
          return
        }
        const window_ = end - start
        const local = (progress - start) / window_
        const fadeIn = Math.min(local / 0.2, 1)
        const fadeOut = local > 0.8 ? Math.max(0, 1 - (local - 0.8) / 0.2) : 1
        const opacity = fadeIn * fadeOut
        const blur = 12 * (1 - opacity)
        const y = 20 * (1 - opacity)
        el.style.opacity = opacity.toString()
        el.style.filter = `blur(${blur}px)`
        el.style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener('scroll', updateTexts, { passive: true })
    updateTexts()

    return () => {
      window.removeEventListener('scroll', updateTexts)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [loadingPhase])

  // ─── Estilo de texto elegante (Playfair Display italic) ───────────────
  const elegantTextStyle: React.CSSProperties = {
    position: 'absolute',
    opacity: 0,
    fontFamily: '"Playfair Display", Georgia, serif',
    fontStyle: 'italic',
    fontWeight: 400,
    color: '#FFFFFF',
    textShadow: '0 2px 28px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.5)',
    letterSpacing: '0.005em',
    textTransform: 'lowercase',
    lineHeight: 1.05,
    fontSize: 'clamp(1.25rem, 4.8vw, 3.6rem)',
    maxWidth: '90vw',
    pointerEvents: 'none',
    willChange: 'opacity, transform, filter',
  }

  return (
    <section
      ref={containerRef}
      className="memento-hero-scroll"
      style={{
        position: 'relative',
        background: '#0B2150',
      }}
    >
      <style>{`
        .memento-hero-scroll {
          height: 700vh;
        }
        .memento-hero-sticky {
          position: sticky;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          z-index: 1;
        }
        .memento-hero-canvas {
          display: block;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          position: absolute;
          top: 0;
          left: 0;
        }
        .memento-hero-text-top {
          top: clamp(60px, 10vh, 140px);
          right: clamp(20px, 6vw, 96px);
          text-align: right;
        }
        .memento-hero-text-bl {
          bottom: clamp(40px, 8vh, 80px);
          left: clamp(20px, 6vw, 96px);
        }
        .memento-hero-text-br {
          bottom: clamp(40px, 8vh, 80px);
          right: clamp(20px, 6vw, 96px);
          text-align: right;
        }
        @media (max-width: 767px) {
          .memento-hero-scroll {
            height: 350vh;
          }
          .memento-hero-text-top {
            top: clamp(48px, 10vh, 100px);
            right: 0;
            left: 0;
            text-align: center;
            padding: 0 24px;
          }
          .memento-hero-text-bl {
            bottom: clamp(48px, 12vh, 100px);
            right: 0;
            left: 0;
            text-align: center;
            padding: 0 24px;
          }
          .memento-hero-text-br {
            bottom: clamp(48px, 12vh, 100px);
            right: 0;
            left: 0;
            text-align: center;
            padding: 0 24px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .memento-hero-scroll {
            height: 100vh;
          }
        }
      `}</style>
      {/* Canvas fixed full viewport */}
      <div className="memento-hero-sticky">
        <canvas ref={canvasRef} className="memento-hero-canvas" />

        {/* Textos overlay — posicionados LEJOS del centro (donde está la pegatina) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {/* Texto 1: "memento para vivir" */}
          <div
            data-text="0"
            className="memento-hero-text-bl"
            style={elegantTextStyle}
          >
            memento para vivir
          </div>

          {/* Texto 2: "memento para disfrutar" */}
          <div
            data-text="1"
            className="memento-hero-text-top"
            style={elegantTextStyle}
          >
            memento para disfrutar
          </div>

          {/* Texto 3: "memento para recordar" */}
          <div
            data-text="2"
            className="memento-hero-text-br"
            style={elegantTextStyle}
          >
            memento para recordar
          </div>
        </div>

        {/* Preloader */}
        {loadingPhase === 'loading' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0B2150',
              zIndex: 100,
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '2px',
                background: 'rgba(14,165,233,0.15)',
                borderRadius: '99px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#0EA5E9',
                  width: `${loadProgress}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <p
              style={{
                color: 'rgba(234,231,218,0.4)',
                fontSize: '11px',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                letterSpacing: '0.15em',
              }}
            >
              cargando memorias…
            </p>
          </div>
        )}

        {/* Scroll hint — solo en el primer ~10% */}
        <div
          data-scroll-hint
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(234,231,218,0.5)',
            fontSize: '10px',
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            letterSpacing: '0.2em',
            textTransform: 'lowercase',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'memento-bounce 2.4s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        >
          <span>scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 2v14M2 11l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <style>{`
          @keyframes memento-bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
            50% { transform: translateX(-50%) translateY(8px); opacity: 0.3; }
          }
        `}</style>
      </div>
    </section>
  )
}
