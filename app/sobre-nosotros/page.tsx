import { Navbar } from '@/components/Navbar'
import { SNHero } from '@/components/SNHero'
import { SNManifesto } from '@/components/SNManifesto'
import { SNTimeline } from '@/components/SNTimeline'
import { SNTeamGrid } from '@/components/SNTeamGrid'
import { SNPhilosophy } from '@/components/SNPhilosophy'
import { SNValues } from '@/components/SNValues'
import { SNCTA } from '@/components/SNCTA'

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <SNHero />
      <SNManifesto />
      <SNTimeline />
      <SNTeamGrid />
      <SNPhilosophy />
      <SNValues />
      <SNCTA />
    </div>
  )
}
