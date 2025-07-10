"use client"

import Image from "next/image"
import { Download, Award, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const certifications = [
  {
    id: 1,
    name: "ISO 9001:2015",
    description: "Quality Management System",
    icon: Award,
    image: "/ISO.png?height=100&width=100",
    pdfUrl: "/certificates/iso-9001.pdf",
    validUntil: "2025-12-31",
  },
  {
    id: 2,
    name: "FSC Certified",
    description: "Forest Stewardship Council",
    icon: Shield,
    image: "/fsc.png?height=100&width=100",
    pdfUrl: "/certificates/fsc.pdf",
    validUntil: "2026-06-30",
  },
  {
    id: 3,
    name: "PEFC Certified",
    description: "Programme for Endorsement of Forest Certification",
    icon: CheckCircle,
    image: "/PEFC.png?height=100&width=100",
    pdfUrl: "/certificates/pefc.pdf",
    validUntil: "2025-09-15",
  },
  {
    id: 4,
    name: "G7 Master Printer",
    description: "Color Management Excellence",
    icon: Award,
    image: "/Gseven.jpg?height=100&width=100",
    pdfUrl: "/certificates/g7.pdf",
    validUntil: "2024-12-31",
  },
]

export default function CertificationsSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const handleDownload = (pdfUrl: string, certName: string) => {
    // Track download event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "certificate_downloaded", {
        event_category: "engagement",
        event_label: certName,
      })
    }

    // In a real app, this would trigger the actual download
    window.open(pdfUrl, "_blank")
  }

  return (
    <section id="certifications" className="section-padding bg-white">
      <div className="container-custom">
        <div ref={ref} className={`text-center mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("our_certifications")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("certifications_description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={cert.id}
              className={`group hover:shadow-lg transition-all duration-300 fade-in ${isVisible ? "visible" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    width={80}
                    height={80}
                    className="mx-auto mb-4 certificate-img"
                  />
                  <cert.icon className="w-8 h-8 text-[var(--color-gold)] mx-auto" />
                </div>

                <h3 className="font-serif text-lg font-semibold mb-2">{cert.name}</h3>
                {/* <p className="text-gray-600 text-sm mb-4">{cert.description}</p> */}
                <p className="text-xs text-gray-500 mb-4">
                  Valid until: {new Date(cert.validUntil).toLocaleDateString()}
                </p>

                <Button
                  onClick={() => handleDownload(cert.pdfUrl, cert.name)}
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-[var(--color-gold)] group-hover:text-white group-hover:border-[var(--color-gold)] transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("download_pdf")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
