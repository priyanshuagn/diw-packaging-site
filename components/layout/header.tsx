"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/providers/language-provider"

const navigation = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Certifications", href: "#certifications" },
  { name: "References", href: "#references" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentLanguage, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleQuoteClick = () => {
    // Track conversion event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "request_quote_clicked", {
        event_category: "engagement",
        event_label: "header_cta",
      })
    }

    // Scroll to contact section
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.3115dae923c6.svg"
              alt="DIW Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            {/* <div className="font-serif text-xl font-bold">
              DIW <span className="text-[var(--color-gold)]">Packaging</span>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[var(--color-gold)] transition-colors duration-200 font-medium"
              >
                {t(item.name.toLowerCase())}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{languages.find((lang) => lang.code === currentLanguage)?.flag}</span>
                  <span className="text-sm">{currentLanguage.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLanguage(language.code)}
                    className="flex items-center space-x-2"
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={handleQuoteClick}
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3 font-medium transition-all duration-300 uppercase tracking-wide"
            >
              {t("request_quote")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-[var(--color-gold)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.name.toLowerCase())}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  onClick={handleQuoteClick}
                  className="bg-gold hover:bg-gold-dark text-white px-8 py-3 font-medium transition-all duration-300 uppercase tracking-wide w-full"
                >
                  {t("request_quote")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
