export interface Word {
  id: number
  spanish_word: string
  dutch_translation: string
  image_url: string
  difficulty_level: number
}

export const SPANISH_WORDS: Word[] = [
  { id: 1, spanish_word: "gato", dutch_translation: "kat", image_url: "/cute-orange-cat.png", difficulty_level: 1 },
  { id: 2, spanish_word: "perro", dutch_translation: "hond", image_url: "/friendly-golden-retriever.png", difficulty_level: 1 },
  { id: 3, spanish_word: "casa", dutch_translation: "huis", image_url: "/cozy-red-roof-house.png", difficulty_level: 1 },
  { id: 4, spanish_word: "agua", dutch_translation: "water", image_url: "/glass-of-water.png", difficulty_level: 1 },
  { id: 5, spanish_word: "comida", dutch_translation: "eten", image_url: "/delicious-meal.png", difficulty_level: 1 },

  { id: 6, spanish_word: "libro", dutch_translation: "boek", image_url: "/open-book.png", difficulty_level: 2 },
  { id: 7, spanish_word: "escuela", dutch_translation: "school", image_url: "/traditional-schoolhouse.png", difficulty_level: 2 },
  { id: 8, spanish_word: "familia", dutch_translation: "familie", image_url: "/happy-family.png", difficulty_level: 2 },
  { id: 9, spanish_word: "trabajo", dutch_translation: "werk", image_url: "/modern-office-workspace.png", difficulty_level: 2 },
  { id: 10, spanish_word: "tiempo", dutch_translation: "tijd", image_url: "/analog-clock.png", difficulty_level: 2 },

  { id: 11, spanish_word: "ventana", dutch_translation: "raam", image_url: "/open-window.png", difficulty_level: 3 },
  { id: 12, spanish_word: "zapato", dutch_translation: "schoen", image_url: "/shoe.png", difficulty_level: 3 },
  { id: 13, spanish_word: "helado", dutch_translation: "ijsje", image_url: "/ice-cream.png", difficulty_level: 3 },
  { id: 14, spanish_word: "bicicleta", dutch_translation: "fiets", image_url: "/bicycle.png", difficulty_level: 3 },
  { id: 15, spanish_word: "colores", dutch_translation: "kleuren", image_url: "/color-palette.png", difficulty_level: 3 },

  { id: 16, spanish_word: "restaurante", dutch_translation: "restaurant", image_url: "/elegant-restaurant.png", difficulty_level: 4 },
  { id: 17, spanish_word: "medicina", dutch_translation: "geneeskunde", image_url: "/diverse-medical-equipment.png", difficulty_level: 4 },
  { id: 18, spanish_word: "arquitectura", dutch_translation: "architectuur", image_url: "/abstract-architectural-design.png", difficulty_level: 4 },

  { id: 19, spanish_word: "filosofía", dutch_translation: "filosofie", image_url: "/philosophical-thinking.png", difficulty_level: 5 },
  { id: 20, spanish_word: "extraordinario", dutch_translation: "buitengewoon", image_url: "/extraordinary-moment.png", difficulty_level: 5 },

  { id: 21, spanish_word: "pan", dutch_translation: "brood", image_url: "/placeholder.jpg", difficulty_level: 1 },
  { id: 22, spanish_word: "leche", dutch_translation: "melk", image_url: "/placeholder.jpg", difficulty_level: 1 },
  { id: 23, spanish_word: "nube", dutch_translation: "wolk", image_url: "/placeholder.jpg", difficulty_level: 1 },
  { id: 24, spanish_word: "árbol", dutch_translation: "boom", image_url: "/placeholder.jpg", difficulty_level: 1 },
  { id: 25, spanish_word: "sol", dutch_translation: "zon", image_url: "/placeholder.jpg", difficulty_level: 1 },

  { id: 26, spanish_word: "coche", dutch_translation: "auto", image_url: "/placeholder-logo.png", difficulty_level: 2 },
  { id: 27, spanish_word: "ciudad", dutch_translation: "stad", image_url: "/placeholder-logo.png", difficulty_level: 2 },
  { id: 28, spanish_word: "dinero", dutch_translation: "geld", image_url: "/placeholder-logo.png", difficulty_level: 2 },
  { id: 29, spanish_word: "salud", dutch_translation: "gezondheid", image_url: "/placeholder-logo.png", difficulty_level: 2 },
  { id: 30, spanish_word: "música", dutch_translation: "muziek", image_url: "/placeholder-logo.png", difficulty_level: 2 },

  { id: 31, spanish_word: "montaña", dutch_translation: "berg", image_url: "/placeholder-user.jpg", difficulty_level: 3 },
  { id: 32, spanish_word: "playa", dutch_translation: "strand", image_url: "/placeholder-user.jpg", difficulty_level: 3 },
  { id: 33, spanish_word: "bosque", dutch_translation: "bos", image_url: "/placeholder-user.jpg", difficulty_level: 3 },
  { id: 34, spanish_word: "río", dutch_translation: "rivier", image_url: "/placeholder-user.jpg", difficulty_level: 3 },
  { id: 35, spanish_word: "estrella", dutch_translation: "ster", image_url: "/placeholder-user.jpg", difficulty_level: 3 },

  { id: 36, spanish_word: "universidad", dutch_translation: "universiteit", image_url: "/placeholder.svg", difficulty_level: 4 },
  { id: 37, spanish_word: "tecnología", dutch_translation: "technologie", image_url: "/placeholder.svg", difficulty_level: 4 },
  { id: 38, spanish_word: "historia", dutch_translation: "geschiedenis", image_url: "/placeholder.svg", difficulty_level: 4 },
  { id: 39, spanish_word: "economía", dutch_translation: "economie", image_url: "/placeholder.svg", difficulty_level: 4 },
  { id: 40, spanish_word: "psicología", dutch_translation: "psychologie", image_url: "/placeholder.svg", difficulty_level: 4 },

  { id: 41, spanish_word: "metamorfosis", dutch_translation: "metamorfose", image_url: "/placeholder-yo73h.png", difficulty_level: 5 },
  { id: 42, spanish_word: "hiperconectividad", dutch_translation: "hyperconnectiviteit", image_url: "/placeholder-yo73h.png", difficulty_level: 5 },
  { id: 43, spanish_word: "conglomerado", dutch_translation: "conglomeraat", image_url: "/placeholder-yo73h.png", difficulty_level: 5 },
  { id: 44, spanish_word: "paradigma", dutch_translation: "paradigma", image_url: "/placeholder-yo73h.png", difficulty_level: 5 },
  { id: 45, spanish_word: "idiosincrasia", dutch_translation: "idiosyncrasie", image_url: "/placeholder-yo73h.png", difficulty_level: 5 },
]

export function getWordsByDifficulty(difficultyLevel?: number): Word[] {
  if (!difficultyLevel) {
    return SPANISH_WORDS
  }
  return SPANISH_WORDS.filter((word) => word.difficulty_level === difficultyLevel)
}
