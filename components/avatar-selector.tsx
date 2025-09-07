"use client"

interface AvatarSelectorProps {
  selected: string | null
  onSelect: (avatar: string) => void
}

const AVATARS = [
  "/placeholder-user.jpg",
  "/doge-pasta.png",
  "/pepe-pepperoni.png",
  "/placeholder.jpg"
]

export function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  const handleClick = (src: string) => {
    localStorage.setItem("selected-avatar", src)
    onSelect(src)
  }

  return (
    <div className="flex justify-center gap-2 mb-4">
      {AVATARS.map((src) => (
        <button
          key={src}
          type="button"
          onClick={() => handleClick(src)}
          className={`rounded-full overflow-hidden border-2 ${
            selected === src ? "border-blue-500" : "border-transparent"
          }`}
        >
          <img src={src} alt="avatar" className="w-12 h-12 object-cover" />
        </button>
      ))}
    </div>
  )
}
