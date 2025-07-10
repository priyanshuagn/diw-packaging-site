"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const testimonials = [
  {
    id: 1,
    quote:
      "DIW transformed our product packaging into a luxury experience. The attention to detail and quality exceeded our expectations.",
    author: "Sarah Johnson",
    position: "Brand Manager",
    company: "Luxury Timepieces Co.",
    avatar: "/female2.jpg?height=60&width=60",
  },
  {
    id: 2,
    quote:
      "The trading cards they produced for our game launch were absolutely stunning. The foil work and print quality were exceptional.",
    author: "Michael Chen",
    position: "Creative Director",
    company: "Gaming Studio X",
    avatar: "/male.jpg?height=60&width=60",
  },
  {
    id: 3,
    quote:
      "Professional service from start to finish. DIW understood our vision and delivered packaging that perfectly represents our brand.",
    author: "Elena Rodriguez",
    position: "Marketing Director",
    company: "Diamond Boutique",
    avatar: "/female1.jpg?height=60&width=60",
  },
]

const clientLogos = [
  { name: "Subway", logo: "/subway.webp" },
  { name: "Dominos", logo: "/dominos.webp" },
  { name: "Demax", logo: "/drmax.webp" },
  { name: "eset", logo: "/eset.webp" },
  { name: "grape", logo: "/grape.webp" },
  { name: "maxsport", logo: "/maxsport.webp" },
]

export default function ReferencesSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="references" className="section-padding bg-white">
      <div className="container-custom">
        <div ref={ref} className={`text-center mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("client_testimonials")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("testimonials_description")}</p>
        </div>

        {/* Testimonials Slider */}
        <div className={`relative mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />

                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-lg">{testimonials[currentTestimonial].author}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].position}</div>
                    <div className="text-[var(--color-gold)] font-medium">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? "bg-[var(--color-gold)]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className={`fade-in ${isVisible ? "visible" : ""}`}>
          <h3 className="font-serif text-2xl font-semibold text-center mb-8">{t("trusted_by_brands")}</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={60}
                  className="max-h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
