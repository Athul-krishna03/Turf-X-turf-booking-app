import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface TurfGalleryProps {
  photos?: string[];
  turfName?: string;
}

export default function TurfGallery({ photos = [], turfName = "Turf" }: TurfGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Use default images if no photos provided
  const galleryPhotos = photos && photos.length > 0 
    ? photos 
    : [
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000",
        "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000",
      ];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="aspect-video md:aspect-[21/9] overflow-hidden rounded-xl relative">
        {galleryPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${turfName} photo ${index + 1}`}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-500",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        
        {/* Photo count indicator */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {activeIndex + 1} / {galleryPhotos.length}
        </div>
      </div>

      {/* Navigation buttons */}
      {galleryPhotos.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
            onClick={handlePrevious}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}
      
      {/* Thumbnail indicators */}
      {galleryPhotos.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {galleryPhotos.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex 
                  ? "bg-white w-4" 
                  : "bg-white/40 hover:bg-white/60"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}