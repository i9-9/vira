"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full bg-white border-t" style={{ borderColor: '#c0b8ab' }}>
      <div className="w-full flex flex-col items-center justify-center py-16">
        <Image
          src="/logos/p-g.svg"
          alt="P&G Desarrollos Urbanos"
          width={120}
          height={120}
          className="mb-2"
        />
      </div>
    </footer>
  )
} 