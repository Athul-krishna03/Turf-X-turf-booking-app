import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"

interface TurfGalleryProps {
  photos: string[]
  turfName: string
}

export default function TurfGallery({ photos, turfName }: TurfGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden group rounded-xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {photos.map((photo, idx) => (
          <div key={idx} className="min-w-full h-[500px]">
            <img
              src={photo || "/placeholder.svg"}
              alt={`${turfName} slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
      >
        <ChevronLeft size={24} />
      </Button>

      {/* Next Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
      >
        <ChevronRight size={24} />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
