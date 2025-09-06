"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap } from "lucide-react"
import { SPANISH_WORDS } from "@/lib/words-data"

interface DifficultySelectorProps {
  onSelectDifficulty: (level: number) => void
  onPlayAll: () => void
}

type Meta = {
  title: string
  description: string
  color: string
  borderColor: string
  bgColor: string
}

function getMeta(level: number): Meta {
  // Style map per level (extendable)
  const map: Record<number, Meta> = {
    1: {
      title: "Level 1 — Beginner",
      description: "Basic words and pictures for quick wins",
      color: "text-green-600",
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
    },
    2: {
      title: "Level 2 — Easy",
      description: "Everyday words with clear visuals",
      color: "text-blue-600",
      borderColor: "border-blue-300",
      bgColor: "bg-blue-50",
    },
    3: {
      title: "Level 3 — Medium",
      description: "A bit more challenge, still kid-friendly",
      color: "text-yellow-600",
      borderColor: "border-yellow-300",
      bgColor: "bg-yellow-50",
    },
    4: {
      title: "Level 4 — Advanced",
      description: "Longer words and themes",
      color: "text-purple-600",
      borderColor: "border-purple-300",
      bgColor: "bg-purple-50",
    },
    5: {
      title: "Level 5 — Expert",
      description: "Hard words for language heroes",
      color: "text-red-600",
      borderColor: "border-red-300",
      bgColor: "bg-red-50",
    },
  }
  return map[level] ?? {
    title: `Level ${level}`,
    description: "Custom level",
    color: "text-gray-600",
    borderColor: "border-gray-300",
    bgColor: "bg-gray-50",
  }
}

export function DifficultySelector({ onSelectDifficulty, onPlayAll }: DifficultySelectorProps) {
  // Dynamically detect available levels from the word list
  const availableLevels = Array.from(new Set(SPANISH_WORDS.map(w => w.difficulty_level))).sort((a,b)=>a-b)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight font-heading">Kies je level</h2>
        <p className="text-muted-foreground font-body">Begin makkelijk en bouw stap voor stap op</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {availableLevels.map((level) => {
          const meta = getMeta(level)
          return (
            <Card
              key={level}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${meta.borderColor} ${meta.bgColor} border`}
              onClick={() => onSelectDifficulty(level)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className={`w-8 h-8 ${meta.color}`} />
                </div>
                <CardTitle className="font-heading">{meta.title}</CardTitle>
                <Badge variant="outline" className="mt-2 font-body">Level {level}</Badge>
              </CardHeader>
              <CardContent className="text-center font-body">
                <p className="text-muted-foreground">{meta.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={onPlayAll}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading px-8 py-3"
        >
          <Zap className="w-5 h-5 mr-2" />
          Play All Levels
        </Button>
        <p className="text-sm text-muted-foreground mt-2 font-body">Mix words from all difficulty levels</p>
      </div>
    </div>
  )
}
