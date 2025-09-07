"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const LEVELS = [1, 2, 3, 4, 5]

interface LevelMapProps {
  onClose: () => void
}

export function LevelMap({ onClose }: LevelMapProps) {
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem("completed-levels")
    if (stored) {
      try {
        setCompleted(JSON.parse(stored))
      } catch {
        setCompleted([])
      }
    }
  }, [])

  return (
    <Card className="w-full max-w-md text-center">
      <CardContent className="p-6">
        <h2 className="text-2xl font-heading mb-4">Voortgang</h2>
        <div className="flex justify-between mb-4">
          {LEVELS.map((lvl) => (
            <div
              key={lvl}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-body ${
                completed.includes(lvl) ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {lvl}
            </div>
          ))}
        </div>
        <Button onClick={onClose}>Terug</Button>
      </CardContent>
    </Card>
  )
}
