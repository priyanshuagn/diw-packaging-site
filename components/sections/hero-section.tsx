"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"

const heroSlides = [
  {
    id: 1,
    image: "/luxury.png?height=800&width=1200",
    title: "Luxury Packaging Excellence",
    subtitle: "Premium custom boxes and packaging solutions that make your products stand out",
    cta: "View Portfolio",
  },
  {
    id: 2,
    image: "/openbox.png?height=800&width=1200",
    title: "Trading Card Mastery",
    subtitle: "High-quality trading card printing with specialty finishes and premium materials",
    cta: "Explore Cards",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=1200",
    title: "Specialty Finishes",
    subtitle: "Foil stamping, embossing, and unique textures that create unforgettable experiences",
    cta: "Request Quote",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const handleCTAClick = () => {
    // Track conversion event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "hero_cta_clicked", {
        event_category: "engagement",
        event_label: "hero_section",
      })
    }

    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCTAClick}
                className="bg-gold hover:bg-gold-dark text-white px-10 py-4 text-lg font-medium transition-all duration-300 uppercase tracking-wide"
              >
                {heroSlides[currentSlide].cta}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-medium transition-all duration-300 uppercase tracking-wide bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                {t("watch_video")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-[var(--color-gold)]" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-white mr-1"></div>
            <div className="w-1 h-3 bg-white"></div>
          </div>
        ) : (
          <Play className="w-4 h-4 text-white" />
        )}
      </button>
    </section>
  )
}
