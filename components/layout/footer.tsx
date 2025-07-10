"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/providers/language-provider"

const footerLinks = {
  services: [
    { name: "Luxury Boxes", href: "#portfolio" },
    { name: "Trading Cards", href: "#portfolio" },
    { name: "Specialty Finishes", href: "#portfolio" },
    { name: "Custom Packaging", href: "#contact" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Certifications", href: "#certifications" },
    { name: "References", href: "#references" },
    { name: "Careers", href: "#contact" },
  ],
  resources: [
    { name: "Blog", href: "#blog" },
    { name: "Case Studies", href: "#portfolio" },
    { name: "Downloads", href: "#certifications" },
    { name: "FAQ", href: "#contact" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/diwpackaging", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/diwpackaging", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/diwpackaging", label: "LinkedIn" },
]

export default function Footer() {
  const { t } = useLanguage()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Track newsletter signup
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "newsletter_signup", {
        event_category: "engagement",
        event_label: "footer",
      })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <Image
                  src="/footerlogo.svg"
                  alt="DIW Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="font-serif text-xl font-bold">
                  DIW <span className="text-[var(--color-gold)]">Packaging</span>
                </div>
              </Link>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Premium luxury packaging and trading card printing services that create unforgettable experiences.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-sm">Bratislava, Slovakia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-sm">+421 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-sm">info@diwpackaging.com</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-4">{t("services")}</h3>
                  <ul className="space-y-2">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-[var(--color-gold)] transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold mb-4">{t("company")}</h3>
                  <ul className="space-y-2">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-[var(--color-gold)] transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold mb-4">{t("resources")}</h3>
                  <ul className="space-y-2">
                    {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-[var(--color-gold)] transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-lg font-semibold mb-4">{t("newsletter")}</h3>
              <p className="text-gray-300 text-sm mb-4">{t("newsletter_description")}</p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder={t("enter_email")}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  required
                />
                <Button type="submit" className="btn-primary w-full">
                  {t("subscribe")}
                </Button>
              </form>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-[var(--color-gold)] p-2 rounded-full transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">© 2024 DIW – Do It Wow Packaging. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[var(--color-gold)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[var(--color-gold)] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[var(--color-gold)] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
