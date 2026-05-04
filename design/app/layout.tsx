import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MementoMundi',
  description: 'Pegatinas físicas que cuentan tu viaje.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream font-grown text-navy">
        {children}
      </body>
    </html>
  )
}
