"use client"

import Image from "next/image"
import { Users, Calendar, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const stats = [
  {
    icon: Calendar,
    value: "2015",
    label: "Established",
    description: "Years of excellence",
  },
  {
    icon: Users,
    value: "50+",
    label: "Team Members",
    description: "Skilled professionals",
  },
  {
    icon: Award,
    value: "500+",
    label: "Projects Completed",
    description: "Successful deliveries",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Client Satisfaction",
    description: "Happy customers",
  },
]

export default function AboutSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={ref} className={`fade-in ${isVisible ? "visible" : ""}`}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("about_diw")}</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded in 2015, DIW – Do It Wow Packaging has established itself as a premier provider of luxury
                packaging solutions and trading card printing services across Europe.
              </p>
              <p>
                Our commitment to excellence, combined with cutting-edge technology and sustainable practices, has made
                us the preferred partner for brands seeking to create unforgettable unboxing experiences.
              </p>
              <p>
                From concept to completion, we work closely with our clients to bring their vision to life through
                innovative design, premium materials, and meticulous attention to detail.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2 text-[var(--color-gold)]">{t("our_mission")}</h3>
                <p className="text-gray-600">
                  To create packaging solutions that not only protect products but elevate brands and create memorable
                  experiences for end users.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2 text-[var(--color-gold)]">{t("our_vision")}</h3>
                <p className="text-gray-600">
                  To be the leading luxury packaging partner in Europe, known for innovation, sustainability, and
                  exceptional quality.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`fade-in ${isVisible ? "visible" : ""}`} style={{ animationDelay: "200ms" }}>
            <div className="relative">
              <Image
                src="/About.png?height=600&width=800"
                alt="DIW Packaging facility"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-300 fade-in ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-[var(--color-gold)] mx-auto mb-4" />
                  <div className="font-serif text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
