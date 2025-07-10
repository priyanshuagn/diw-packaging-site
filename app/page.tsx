import { Suspense } from "react"
import Header from "@/components/layout/header"
import HeroSection from "@/components/sections/hero-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import CertificationsSection from "@/components/sections/certifications-section"
import AboutSection from "@/components/sections/about-section"
import ReferencesSection from "@/public/references-section"
import BlogSection from "@/components/sections/blog-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"
import ChatBot from "@/components/chat-bot"
import ScrollToTop from "@/components/ui/scroll-to-top"
import { generateStructuredData } from "@/lib/structured-data"
export default function HomePage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header />

      <main>
        <HeroSection />

        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <PortfolioSection />
        </Suspense>

        <CertificationsSection />
        <AboutSection />
        <ReferencesSection />

        
          <BlogSection />
        

        <ContactSection />
      </main>

      <Footer />
      <ChatBot />
      <ScrollToTop />
    </>
  )
}
