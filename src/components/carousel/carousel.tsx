import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import { clsx } from 'clsx'

const TOTAL_IMAGES = 18

const ImagesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? TOTAL_IMAGES - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === TOTAL_IMAGES - 1 ? 0 : prev + 1))
  }, [])

  // Keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  return (
    <div className="flex flex-col gap-3">
      {/* Main image container */}
      <div className="relative w-full h-[280px] overflow-hidden rounded bg-secondary">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-muted-foreground font-mono animate-pulse">
              Loading...
            </div>
          </div>
        )}

        {/* Current image */}
        <Image
          src={`/assets/carousel/${currentIndex + 1}.jpg`}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className={clsx(
            'object-contain transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          priority={currentIndex < 3}
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        />

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 te-panel px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Previous image"
        >
          [&larr;]
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 te-panel px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Next image"
        >
          [&rarr;]
        </button>
      </div>

      {/* Image counter and thumbnails indicator */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          {currentIndex + 1}/{TOTAL_IMAGES}
        </span>

        {/* Dot indicators */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_IMAGES }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setIsLoading(true)
              }}
              className={clsx(
                'w-1.5 h-1.5 rounded-full transition-colors',
                i === currentIndex ? 'bg-foreground' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip for quick navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {Array.from({ length: TOTAL_IMAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              setIsLoading(true)
            }}
            className={clsx(
              'relative flex-shrink-0 w-10 h-10 overflow-hidden rounded transition-all',
              i === currentIndex ? 'ring-1 ring-foreground' : 'opacity-50 hover:opacity-75'
            )}
          >
            <Image
              src={`/assets/carousel/${i + 1}.jpg`}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="40px"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImagesCarousel
