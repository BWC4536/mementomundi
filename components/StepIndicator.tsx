import type { TripStep } from '@/hooks/useNewTripFlow'

const LABELS = ['Escanear QR', 'Tu viaje', 'Confirmación']

export function StepIndicator({ step }: { step: TripStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {[1, 2, 3].map((s, i) => {
        const done = s < step
        const active = s === step
        return (
          <div key={s} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-brasica font-bold text-sm border-2 transition-all duration-300"
                style={{
                  background: done ? '#5CA4A4' : active ? '#FA9223' : 'transparent',
                  borderColor: done ? '#5CA4A4' : active ? '#FA9223' : 'rgba(11,33,80,0.2)',
                  color: done || active ? '#fff' : 'rgba(11,33,80,0.5)',
                  transform: active ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s}
              </div>
              <span
                className="text-xs font-grown font-semibold hidden sm:block whitespace-nowrap"
                style={{ color: active ? '#FA9223' : 'rgba(11,33,80,0.4)', fontSize: 11 }}
              >
                {LABELS[i]}
              </span>
            </div>

            {/* Connector */}
            {i < 2 && (
              <div
                className="w-10 h-0.5 mx-1 mb-4 transition-colors duration-300"
                style={{ background: s < step ? '#5CA4A4' : 'rgba(11,33,80,0.12)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
