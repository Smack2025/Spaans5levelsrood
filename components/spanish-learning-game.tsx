"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Volume2, VolumeX } from "lucide-react"
import { DifficultySelector } from "./difficulty-selector"
import { AchievementSystem } from "./achievement-system"
import { SoundManager } from "./sound-manager"
import {
  BrainrotCollection,
  BRAINROT_CHARACTERS,
  maybeUnlockCharacter,
  speakCharacterName,
} from "./italian-brainrot-characters"
import { getWordsByDifficulty, SPANISH_WORDS } from "@/lib/words-data"

interface GameWord {
  id: number
  spanish: string
  dutch: string
  image: string
  options: Array<{
    text: string
    image: string
  }> // Updated to include image data for each option
  difficulty: number
  progress?: {
    correct: number
    incorrect: number
    mastery: number
  } | null
}

export function SpanishLearningGame() {
  const [gameMode, setGameMode] = useState<"welcome" | "select" | "playing" | "collection">("welcome") // Added welcome mode as initial state
  const [words, setWords] = useState<GameWord[]>([])
  const [loading, setLoading] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playCorrectSound, setPlayCorrectSound] = useState(false)
  const [playIncorrectSound, setPlayIncorrectSound] = useState(false)
  const [playCompleteSound, setPlayCompleteSound] = useState(false)

  const [unlockedCharacters, setUnlockedCharacters] = useState<string[]>([])
  const [newlyUnlockedCharacter, setNewlyUnlockedCharacter] = useState<string | null>(null)
  const [showCharacterUnlock, setShowCharacterUnlock] = useState(false)

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)

  const [gameAnswers, setGameAnswers] = useState<
    Array<{
      question: string
      correctAnswer: string
      userAnswer: string
      isCorrect: boolean
      difficulty: number
      timestamp: number
    }>
  >([])

  const currentWord = words[currentWordIndex]

  useEffect(() => {
    const saved = localStorage.getItem("brainrot-collection")
    if (saved) {
      setUnlockedCharacters(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (unlockedCharacters.length > 0) {
      localStorage.setItem("brainrot-collection", JSON.stringify(unlockedCharacters))
    }
  }, [unlockedCharacters])

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window)
  }, [])

  useEffect(() => {
    if (speechSupported) {
      speakWelcomeMessage()

      // Multiple retry attempts to ensure audio plays
      const retryTimers = [
        setTimeout(() => speakWelcomeMessage(), 100),
        setTimeout(() => speakWelcomeMessage(), 500),
        setTimeout(() => speakWelcomeMessage(), 1000),
      ]

      return () => retryTimers.forEach((timer) => clearTimeout(timer))
    }
  }, [speechSupported]) // Removed gameMode dependency to play on component mount

  useEffect(() => {
    if (currentWord && speechSupported && gameMode === "playing" && !showResult) {
      // Auto-speak the word after a short delay
      const timer = setTimeout(() => {
        speakWord(currentWord.spanish)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentWordIndex, gameMode, showResult])

  const getImageForDutchWord = (dutchWord: string): string => {
    const key = dutchWord.toLowerCase().trim()

    // 1) Try words-data.ts mapping (preferred; uses /public assets)
    const byDutch = SPANISH_WORDS.find(w => w.dutch_translation.toLowerCase() === key)
    if (byDutch && byDutch.image_url) {
      return byDutch.image_url
    }

    // 2) Legacy fallback map (external URLs) for any words not in SPANISH_WORDS
    const imageMap: { [key: string]: string } = {
      kat: "/cute-orange-cat.png",
      hond: "/friendly-golden-retriever.png",
      huis: "/cozy-red-roof-house.png",
      water: "/glass-of-water.png",
      eten: "/delicious-meal.png",
      boek: "/open-book.png",
      school: "/traditional-schoolhouse.png",
      familie: "/happy-family.png",
      werk: "/modern-office-workspace.png",
      tijd: "/analog-clock.png",
      raam: "/open-window.png",
      schoen: "/shoe.png",
      ijsje: "/ice-cream.png",
      fiets: "/bicycle.png",
      kleuren: "/color-palette.png",
      restaurant: "/elegant-restaurant.png",
      geneeskunde: "/diverse-medical-equipment.png",
      architectuur: "/abstract-architectural-design.png",
      filosofie: "/philosophical-thinking.png",
      buitengewoon: "/extraordinary-moment.png",
    }

    if (imageMap[key]) return imageMap[key]

    // 3) Final placeholder
    return `/placeholder.svg?height=48&width=48&text=${encodeURIComponent(dutchWord)}`
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const generateGameWords = (difficulty?: number): GameWord[] => {
    const base = getWordsByDifficulty(difficulty)
    return base.map((w) => {
      const allOptions = SPANISH_WORDS.filter((o) => o.id !== w.id)
      const shuffled = shuffleArray(allOptions).slice(0, 3)
      const options = shuffleArray([
        { text: w.dutch_translation, image: getImageForDutchWord(w.dutch_translation) },
        ...shuffled.map((o) => ({ text: o.dutch_translation, image: getImageForDutchWord(o.dutch_translation) })),
      ])
      return {
        id: w.id,
        spanish: w.spanish_word,
        dutch: w.dutch_translation,
        image: getImageForDutchWord(w.dutch_translation),
        options,
        difficulty: w.difficulty_level,
        progress: null,
      }
    })
  }

  const startGame = (difficulty?: number) => {
    setLoading(true)
    const gameWords = generateGameWords(difficulty)
    setWords(gameWords)
    setCurrentWordIndex(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setGameAnswers([])
    setGameComplete(false)
    setSelectedAnswer(null)
    setShowResult(false)
    setLoading(false)
    setGameMode("playing")
  }

  const handleSelectDifficulty = (level: number) => {
    startGame(level)
  }

  const handlePlayAll = () => {
    startGame(undefined)
  }

  const speakWord = (word: string) => {
    if (!speechSupported) return
    setIsSpeaking(true)
    const utter = new SpeechSynthesisUtterance(word)
    utter.lang = "es-ES"
    utter.rate = 0.9
    utter.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utter)
  }

  const speakWelcomeMessage = () => {
    if (!speechSupported) return
    const utter = new SpeechSynthesisUtterance("Bienvenido al juego de español")
    utter.lang = "es-ES"
    window.speechSynthesis.speak(utter)
  }

  const handleAnswer = (option: string) => {
    if (showResult || !currentWord) return
    const correct = option === currentWord.dutch
    setSelectedAnswer(option)
    setShowResult(true)
    setGameAnswers([
      ...gameAnswers,
      {
        question: currentWord.spanish,
        correctAnswer: currentWord.dutch,
        userAnswer: option,
        isCorrect: correct,
        difficulty: currentWord.difficulty,
        timestamp: Date.now(),
      },
    ])
    if (correct) {
      const newScore = score + 1
      setScore(newScore)
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > maxStreak) setMaxStreak(newStreak)
      if (soundEnabled) setPlayCorrectSound(true)

      const unlockedId = maybeUnlockCharacter(unlockedCharacters, newScore)
      if (unlockedId) {
        setUnlockedCharacters([...unlockedCharacters, unlockedId])
        setNewlyUnlockedCharacter(unlockedId)
        const unlockedChar = BRAINROT_CHARACTERS.find((c) => c.id === unlockedId)
        if (unlockedChar) {
          speakCharacterName(unlockedChar.name)
        }
        setShowCharacterUnlock(true)
      }
    } else {
      setStreak(0)
      if (soundEnabled) setPlayIncorrectSound(true)
    }
    setTimeout(() => {
      setShowResult(false)
      setSelectedAnswer(null)
      if (currentWordIndex + 1 < words.length) {
        setCurrentWordIndex(currentWordIndex + 1)
      } else {
        setGameComplete(true)
        if (soundEnabled) setPlayCompleteSound(true)
      }
    }, 1000)
  }

  const handleRestart = () => {
    setGameMode("select")
  }

  const onSoundPlayed = () => {
    setPlayCorrectSound(false)
    setPlayIncorrectSound(false)
    setPlayCompleteSound(false)
  }

  const totalCorrect = gameAnswers.filter((a) => a.isCorrect).length
  const perfectGames = gameComplete && totalCorrect === words.length ? 1 : 0

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SoundManager
        playCorrect={playCorrectSound && soundEnabled}
        playIncorrect={playIncorrectSound && soundEnabled}
        playComplete={playCompleteSound && soundEnabled}
        onSoundPlayed={onSoundPlayed}
      />

      {gameMode === "welcome" && (
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h1 className="text-3xl font-heading mb-4">Spaans Leren Game</h1>
            <Button className="mr-2" onClick={() => setGameMode("select")}>Start</Button>
            <Button variant="secondary" onClick={() => setGameMode("collection")}>Collectie</Button>
          </CardContent>
        </Card>
      )}

      {gameMode === "select" && (
        <div className="w-full max-w-3xl">
          <DifficultySelector onSelectDifficulty={handleSelectDifficulty} onPlayAll={handlePlayAll} />
        </div>
      )}

      {gameMode === "playing" && (
        <div className="w-full max-w-3xl">
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : gameComplete ? (
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-heading mb-4">Game afgelopen!</h2>
                <p className="font-body mb-2">Score: {score} / {words.length}</p>
                <p className="font-body mb-4">Max streak: {maxStreak}</p>
                <Button className="mr-2" onClick={handleRestart}>Opnieuw</Button>
                <Button variant="secondary" onClick={() => setGameMode("select")}>Level kiezen</Button>
              </CardContent>
            </Card>
          ) : (
            currentWord && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading">{currentWord.spanish}</h2>
                    {speechSupported && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speakWord(currentWord.spanish)}
                        disabled={isSpeaking}
                      >
                        {soundEnabled ? (
                          <Volume2 className="w-5 h-5" />
                        ) : (
                          <VolumeX className="w-5 h-5" />
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {currentWord.options.map((option) => (
                      <Button
                        key={option.text}
                        onClick={() => handleAnswer(option.text)}
                        disabled={showResult}
                        className={`h-auto flex flex-col items-center p-4 gap-2 font-body ${
                          showResult && option.text === currentWord.dutch
                            ? "bg-green-500 text-white"
                            : showResult && option.text === selectedAnswer
                              ? "bg-red-500 text-white"
                              : ""
                        }`}
                      >
                        <img
                          src={option.image}
                          alt={option.text}
                          className="w-16 h-16 object-contain"
                        />
                        <span>{option.text}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 text-center font-body">
                    Vraag {currentWordIndex + 1} / {words.length}
                  </div>
                </CardContent>
              </Card>
            )
          )}
          <AchievementSystem
            score={score}
            streak={streak}
            totalCorrect={totalCorrect}
            perfectGames={perfectGames}
          />
        </div>
      )}

      {gameMode === "collection" && (
        <BrainrotCollection
          unlockedCharacters={unlockedCharacters}
          onClose={() => setGameMode("welcome")}
        />
      )}

      {showCharacterUnlock && newlyUnlockedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          {(() => {
            const char = BRAINROT_CHARACTERS.find((c) => c.id === newlyUnlockedCharacter)
            if (!char) return null
            return (
              <Card className="p-6 text-center animate-in fade-in-50">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-32 h-32 mx-auto mb-4 animate-bounce"
                />
                <p className="font-heading text-xl mb-2">Gefeliciteerd!</p>
                <p className="font-body mb-4">{char.name} is vrijgespeeld!</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => {
                      setShowCharacterUnlock(false)
                      setGameMode("collection")
                    }}
                  >
                    Bekijk collectie
                  </Button>
                  <Button variant="secondary" onClick={() => setShowCharacterUnlock(false)}>
                    Verder spelen
                  </Button>
                </div>
              </Card>
            )
          })()}
        </div>
      )}
    </div>
  )
}

