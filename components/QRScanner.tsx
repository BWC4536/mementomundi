'use client'

import { useEffect, useRef, useState } from 'react'
import { isValidPackQR } from '@/schemas/trip.schema'

interface QRScannerProps {
  onSuccess: (code: string) => void
  onClose: () => void
}

// BarcodeDetector is a browser API — declare for TS
declare const BarcodeDetector: new (opts: { formats: string[] }) => {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>>
}

export function QRScanner({ onSuccess, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [manualError, setManualError] = useState('')
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const supported = typeof BarcodeDetector !== 'undefined'
    if (!supported) {
      setError('Tu navegador no soporta el escáner. Introduce el código manualmente.')
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setScanning(true)
          startDetection()
        }
      })
      .catch(() => setError('No se pudo acceder a la cámara. Introduce el código manualmente.'))

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startDetection() {
    const detector = new BarcodeDetector({ formats: ['qr_code'] })
    const tick = async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      try {
        const codes = await detector.detect(videoRef.current)
        if (codes.length > 0) {
          const raw = codes[0].rawValue
          streamRef.current?.getTracks().forEach((t) => t.stop())
          cancelAnimationFrame(rafRef.current)
          if (isValidPackQR(raw)) {
            onSuccess(raw)
          } else {
            setError('QR no válido. Asegúrate de escanear el llavero de Memento Mundi.')
            setScanning(false)
          }
          return
        }
      } catch {/* silently ignore mid-frame errors */}
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function handleManualSubmit() {
    if (!manualCode.trim()) {
      setManualError('Introduce el código')
      return
    }
    if (!isValidPackQR(manualCode.trim())) {
      setManualError('Código no válido. Debe ser un UUID del formato xxxxxxxx-xxxx-4xxx-...')
      return
    }
    onSuccess(manualCode.trim())
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(11,33,80,0.92)', backdropFilter: 'blur(4px)' }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white bg-opacity-15 flex items-center justify-center text-white text-xl font-bold"
      >
        ✕
      </button>

      <p className="font-brasica font-black text-white mb-2" style={{ fontSize: 22 }}>
        Escanea tu llavero
      </p>
      <p className="font-grown text-white mb-6" style={{ fontSize: 14, opacity: 0.65 }}>
        Centra el QR en el recuadro
      </p>

      {/* Viewfinder */}
      <div className="relative" style={{ width: 260, height: 260 }}>
        {scanning && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            muted
            playsInline
          />
        )}

        {/* Corner brackets */}
        {(['tl','tr','bl','br'] as const).map((corner) => (
          <div
            key={corner}
            className="absolute w-8 h-8"
            style={{
              top: corner.startsWith('t') ? 0 : 'auto',
              bottom: corner.startsWith('b') ? 0 : 'auto',
              left: corner.endsWith('l') ? 0 : 'auto',
              right: corner.endsWith('r') ? 0 : 'auto',
              borderTop: corner.startsWith('t') ? '3px solid #FA9223' : 'none',
              borderBottom: corner.startsWith('b') ? '3px solid #FA9223' : 'none',
              borderLeft: corner.endsWith('l') ? '3px solid #FA9223' : 'none',
              borderRight: corner.endsWith('r') ? '3px solid #FA9223' : 'none',
              borderRadius: corner === 'tl' ? '8px 0 0 0' : corner === 'tr' ? '0 8px 0 0' : corner === 'bl' ? '0 0 0 8px' : '0 0 8px 0',
              animation: 'pulse 1.8s ease-in-out infinite',
            }}
          />
        ))}

        {!scanning && !error && (
          <div className="w-full h-full rounded-xl bg-navy flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-white border-t-orange rounded-full animate-spin" style={{ borderWidth: 3 }} />
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 max-w-xs text-center">
          <p className="font-grown text-white text-opacity-80 mb-4" style={{ fontSize: 13 }}>
            {error}
          </p>
          {/* Manual entry fallback */}
          <input
            type="text"
            value={manualCode}
            onChange={(e) => { setManualCode(e.target.value); setManualError('') }}
            placeholder="Introduce el código del pack"
            className="w-full px-4 py-3 rounded-xl text-navy font-grown text-sm mb-2 outline-none"
            style={{ border: manualError ? '2px solid #DC2626' : '2px solid transparent' }}
          />
          {manualError && (
            <p className="text-red-400 text-xs mb-2 text-left">{manualError}</p>
          )}
          <button
            onClick={handleManualSubmit}
            className="w-full py-3 rounded-full font-brasica font-bold text-white"
            style={{ background: '#FA9223', border: '2px solid rgba(255,255,255,0.3)' }}
          >
            Confirmar código
          </button>
        </div>
      )}

      <p className="mt-6 font-grown text-white text-opacity-40 text-xs text-center max-w-xs">
        El código está en el llavero de tu pack de pegatinas
      </p>
    </div>
  )
}
