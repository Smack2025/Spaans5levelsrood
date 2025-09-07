"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  onCollection: () => void
}

export function WelcomeScreen({ onStart, onCollection }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center bg-background p-4">
      <Image
        src="/sahur-tung-tung-tung-sahur.gif"
        alt="Sahur animation"
        width={400}
        height={400}
        priority
        className="mb-8"
      />
      <h1 className="text-4xl md:text-6xl font-heading text-primary mb-4">Spaans Leren Game</h1>
      <p className="text-lg md:text-2xl font-body text-foreground mb-8 max-w-2xl">
        Leer en verzamel personages terwijl je Spaans oefent!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={onStart}>
          <Play className="mr-2 h-5 w-5" />
          Start
        </Button>
        <Button size="lg" variant="secondary" onClick={onCollection}>
          <Sparkles className="mr-2 h-5 w-5" />
          Collectie
        </Button>
      </div>
    </div>
  )
}

