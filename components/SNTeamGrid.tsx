'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'
import { teamMembers } from '@/lib/about-data'

function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative cursor-default"
      style={{
        width: 220,
        transform: hovered ? 'rotate(0deg) scale(1.04)' : `rotate(${member.rotation}deg)`,
        transition: 'transform 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Polaroid card */}
      <div
        className="bg-white p-3 pb-4"
        style={{
          border: '2px solid #0B2150',
          boxShadow: '5px 5px 0 #0B2150',
        }}
      >
        {/* Photo */}
        <div
          className="w-full rounded-lg overflow-hidden bg-cream flex items-center justify-center"
          style={{ aspectRatio: '1/1', border: '1.5px solid rgba(11,33,80,0.12)' }}
        >
          {member.photo ? (
            <Image src={member.photo} alt={member.name} width={200} height={200} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#EAE7DA' }}>
              <User size={64} strokeWidth={1.5} color="#0B2150" aria-hidden />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <p className="font-brasica font-bold text-navy" style={{ fontSize: 17 }}>{member.name}</p>
          <p className="font-grown font-semibold" style={{ fontSize: 13, color: '#5CA4A4', marginBottom: 4 }}>{member.role}</p>
          <p className="font-grown text-navy italic" style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.45 }}>
            "{member.quote}"
          </p>
        </div>

        {/* Social icons — shown on hover */}
        <div
          className="flex gap-2 mt-3 px-1"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: '#0B2150' }}
            >
              𝕏
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: '#0077B5' }}
            >
              in
            </a>
          )}
        </div>
      </div>

      {/* Peel corner sticker */}
      <div
        className="absolute bottom-0 right-0 w-0 h-0"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 0 18px 18px',
          borderColor: 'transparent transparent #EAE7DA transparent',
        }}
      />
    </div>
  )
}

export function SNTeamGrid() {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: '#F5F2E8' }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-xs mb-2 text-center">
          · Las personas ·
        </p>
        <h2
          className="font-brasica font-black text-navy text-center mb-14"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
        >
          El equipo
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {teamMembers.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
