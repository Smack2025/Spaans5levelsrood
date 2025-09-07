"use client"

import { useEffect } from "react"

interface VoiceIntroProps {
  message?: string
}

export function VoiceIntro({
  message = "Bienvenido al juego de español. Selecciona un avatar y presiona comenzar."
}: VoiceIntroProps) {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("speechSynthesis" in window)) return
    const utter = new SpeechSynthesisUtterance(message)
    utter.lang = "es-ES"
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }, [message])

  return null
}
