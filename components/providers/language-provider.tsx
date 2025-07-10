"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "sk" | "cs" | "de" | "es" | "it"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Record<string, string>
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Static translations to avoid database issues
const staticTranslations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    portfolio: "Portfolio",
    about: "About",
    certifications: "Certifications",
    references: "References",
    blog: "Blog",
    contact: "Contact",

    // Actions
    request_quote: "Request Quote",
    watch_video: "Watch Video",
    read_more: "Read More",
    view_all_posts: "View All Posts",
    request_similar_quote: "Request Similar Quote",
    download_pdf: "Download PDF",
    send_message: "Send Message",
    subscribe: "Subscribe",

    // Sections
    our_portfolio: "Our Portfolio",
    portfolio_description:
      "Discover our premium packaging solutions and trading card printing services that exceed expectations.",
    our_certifications: "Our Certifications",
    certifications_description: "We maintain the highest standards with internationally recognized certifications.",
    about_diw: "About DIW",
    our_mission: "Our Mission",
    our_vision: "Our Vision",
    client_testimonials: "Client Testimonials",
    testimonials_description: "See what our clients say about working with us.",
    trusted_by_brands: "Trusted by Leading Brands",
    latest_insights: "Latest Insights",
    blog_description: "Stay updated with industry trends, tips, and insights from our packaging experts.",
    get_in_touch: "Get In Touch",
    contact_description: "Ready to bring your packaging vision to life? Contact us for a personalized quote.",

    // Forms
    contact_information: "Contact Information",
    full_name: "Full Name",
    email: "Email",
    company: "Company",
    project_type: "Project Type",
    select_project_type: "Select project type",
    budget_range: "Budget Range",
    select_budget: "Select budget range",
    timeline: "Timeline",
    timeline_placeholder: "e.g., 2-3 weeks",
    project_details: "Project Details",
    message_placeholder: "Tell us about your project requirements...",
    sending: "Sending...",
    enter_email: "Enter your email",

    // Footer
    services: "Services",
    company: "Company",
    resources: "Resources",
    newsletter: "Newsletter",
    newsletter_description: "Get the latest updates and insights delivered to your inbox.",
  },
  sk: {
    // Navigation
    portfolio: "Portfólio",
    about: "O nás",
    certifications: "Certifikácie",
    references: "Referencie",
    blog: "Blog",
    contact: "Kontakt",

    // Actions
    request_quote: "Požiadať o cenovú ponuku",
    watch_video: "Pozrieť video",
    read_more: "Čítať viac",
    view_all_posts: "Zobraziť všetky príspevky",
    request_similar_quote: "Požiadať o podobnú ponuku",
    download_pdf: "Stiahnuť PDF",
    send_message: "Poslať správu",
    subscribe: "Prihlásiť sa",

    // Sections
    our_portfolio: "Naše portfólio",
    portfolio_description:
      "Objavte naše prémiové baliace riešenia a tlačové služby obchodných kariet, ktoré prekračujú očakávania.",
    our_certifications: "Naše certifikácie",
    certifications_description: "Udržiavame najvyššie štandardy s medzinárodne uznávanými certifikáciami.",
    about_diw: "O DIW",
    our_mission: "Naša misia",
    our_vision: "Naša vízia",
    client_testimonials: "Referencie klientov",
    testimonials_description: "Pozrite si, čo hovoria naši klienti o spolupráci s nami.",
    trusted_by_brands: "Dôverujú nám popredné značky",
    latest_insights: "Najnovšie poznatky",
    blog_description: "Zostaňte informovaní o trendoch v odvetví, tipoch a poznatkov od našich odborníkov na balenie.",
    get_in_touch: "Kontaktujte nás",
    contact_description:
      "Pripravení priniesť vašu víziu balenia do života? Kontaktujte nás pre personalizovanú ponuku.",

    // Forms
    contact_information: "Kontaktné informácie",
    full_name: "Celé meno",
    email: "Email",
    company: "Spoločnosť",
    project_type: "Typ projektu",
    select_project_type: "Vyberte typ projektu",
    budget_range: "Rozpočet",
    select_budget: "Vyberte rozpočet",
    timeline: "Časový rámec",
    timeline_placeholder: "napr. 2-3 týždne",
    project_details: "Detaily projektu",
    message_placeholder: "Povedzte nám o požiadavkách vášho projektu...",
    sending: "Odosielanie...",
    enter_email: "Zadajte váš email",

    // Footer
    services: "Služby",
    company: "Spoločnosť",
    resources: "Zdroje",
    newsletter: "Newsletter",
    newsletter_description: "Získajte najnovšie aktualizácie a poznatky priamo do vašej schránky.",
  },
  cs: {
    portfolio: "Portfolio",
    about: "O nás",
    certifications: "Certifikace",
    references: "Reference",
    blog: "Blog",
    contact: "Kontakt",
    request_quote: "Požádat o nabídku",
    watch_video: "Sledovat video",
    our_portfolio: "Naše portfolio",
    portfolio_description:
      "Objevte naše prémiová balicí řešení a tiskové služby obchodních karet, které překračují očekávání.",
    get_in_touch: "Kontaktujte nás",
    contact_description: "Připraveni přivést vaši vizi balení k životu? Kontaktujte nás pro personalizovanou nabídku.",
    contact_information: "Kontaktní informace",
    send_message: "Poslat zprávu",
    full_name: "Celé jméno",
    email: "Email",
    company: "Společnost",
    project_type: "Typ projektu",
    select_project_type: "Vyberte typ projektu",
    budget_range: "Rozpočet",
    select_budget: "Vyberte rozpočet",
    timeline: "Časový rámec",
    timeline_placeholder: "např. 2-3 týdny",
    project_details: "Detaily projektu",
    message_placeholder: "Řekněte nám o požadavcích vašeho projektu...",
    sending: "Odesílání...",
    latest_insights: "Nejnovější poznatky",
    blog_description: "Zůstaňte informováni o trendech v odvětví, tipech a poznatcích od našich odborníků na balení.",
    read_more: "Číst více",
    view_all_posts: "Zobrazit všechny příspěvky",
    request_similar_quote: "Požádat o podobnou nabídku",
    our_certifications: "Naše certifikace",
    certifications_description: "Udržujeme nejvyšší standardy s mezinárodně uznávanými certifikacemi.",
    download_pdf: "Stáhnout PDF",
    about_diw: "O DIW",
    our_mission: "Naše mise",
    our_vision: "Naše vize",
    client_testimonials: "Reference klientů",
    testimonials_description: "Podívejte se, co říkají naši klienti o spolupráci s námi.",
    trusted_by_brands: "Důvěřují nám přední značky",
    services: "Služby",
    company: "Společnost",
    resources: "Zdroje",
    newsletter: "Newsletter",
    newsletter_description: "Získejte nejnovější aktualizace a poznatky přímo do vaší schránky.",
    enter_email: "Zadejte váš email",
    subscribe: "Přihlásit se",
  },
  de: {
    portfolio: "Portfolio",
    about: "Über uns",
    certifications: "Zertifizierungen",
    references: "Referenzen",
    blog: "Blog",
    contact: "Kontakt",
    request_quote: "Angebot anfordern",
    watch_video: "Video ansehen",
    our_portfolio: "Unser Portfolio",
    portfolio_description:
      "Entdecken Sie unsere Premium-Verpackungslösungen und Trading-Card-Druckservices, die Erwartungen übertreffen.",
    get_in_touch: "Kontakt aufnehmen",
    contact_description:
      "Bereit, Ihre Verpackungsvision zum Leben zu erwecken? Kontaktieren Sie uns für ein personalisiertes Angebot.",
    contact_information: "Kontaktinformationen",
    send_message: "Nachricht senden",
    full_name: "Vollständiger Name",
    email: "E-Mail",
    company: "Unternehmen",
    project_type: "Projekttyp",
    select_project_type: "Projekttyp auswählen",
    budget_range: "Budget",
    select_budget: "Budget auswählen",
    timeline: "Zeitrahmen",
    timeline_placeholder: "z.B. 2-3 Wochen",
    project_details: "Projektdetails",
    message_placeholder: "Erzählen Sie uns von Ihren Projektanforderungen...",
    sending: "Senden...",
    latest_insights: "Neueste Erkenntnisse",
    blog_description:
      "Bleiben Sie auf dem Laufenden über Branchentrends, Tipps und Erkenntnisse unserer Verpackungsexperten.",
    read_more: "Mehr lesen",
    view_all_posts: "Alle Beiträge anzeigen",
    request_similar_quote: "Ähnliches Angebot anfordern",
    our_certifications: "Unsere Zertifizierungen",
    certifications_description: "Wir halten die höchsten Standards mit international anerkannten Zertifizierungen ein.",
    download_pdf: "PDF herunterladen",
    about_diw: "Über DIW",
    our_mission: "Unsere Mission",
    our_vision: "Unsere Vision",
    client_testimonials: "Kundenstimmen",
    testimonials_description: "Sehen Sie, was unsere Kunden über die Zusammenarbeit mit uns sagen.",
    trusted_by_brands: "Vertrauen führender Marken",
    services: "Dienstleistungen",
    company: "Unternehmen",
    resources: "Ressourcen",
    newsletter: "Newsletter",
    newsletter_description: "Erhalten Sie die neuesten Updates und Erkenntnisse direkt in Ihren Posteingang.",
    enter_email: "E-Mail eingeben",
    subscribe: "Abonnieren",
  },
  es: {
    portfolio: "Portafolio",
    about: "Acerca de",
    certifications: "Certificaciones",
    references: "Referencias",
    blog: "Blog",
    contact: "Contacto",
    request_quote: "Solicitar cotización",
    watch_video: "Ver video",
    our_portfolio: "Nuestro Portafolio",
    portfolio_description:
      "Descubra nuestras soluciones de empaque premium y servicios de impresión de cartas coleccionables que superan las expectativas.",
    get_in_touch: "Ponte en contacto",
    contact_description: "¿Listo para dar vida a tu visión de empaque? Contáctanos para una cotización personalizada.",
    contact_information: "Información de contacto",
    send_message: "Enviar mensaje",
    full_name: "Nombre completo",
    email: "Correo electrónico",
    company: "Empresa",
    project_type: "Tipo de proyecto",
    select_project_type: "Seleccionar tipo de proyecto",
    budget_range: "Rango de presupuesto",
    select_budget: "Seleccionar presupuesto",
    timeline: "Cronograma",
    timeline_placeholder: "ej. 2-3 semanas",
    project_details: "Detalles del proyecto",
    message_placeholder: "Cuéntanos sobre los requisitos de tu proyecto...",
    sending: "Enviando...",
    latest_insights: "Últimas perspectivas",
    blog_description:
      "Mantente actualizado con tendencias de la industria, consejos y perspectivas de nuestros expertos en empaque.",
    read_more: "Leer más",
    view_all_posts: "Ver todas las publicaciones",
    request_similar_quote: "Solicitar cotización similar",
    our_certifications: "Nuestras Certificaciones",
    certifications_description:
      "Mantenemos los más altos estándares con certificaciones reconocidas internacionalmente.",
    download_pdf: "Descargar PDF",
    about_diw: "Acerca de DIW",
    our_mission: "Nuestra Misión",
    our_vision: "Nuestra Visión",
    client_testimonials: "Testimonios de Clientes",
    testimonials_description: "Ve lo que dicen nuestros clientes sobre trabajar con nosotros.",
    trusted_by_brands: "Confianza de Marcas Líderes",
    services: "Servicios",
    company: "Empresa",
    resources: "Recursos",
    newsletter: "Boletín",
    newsletter_description: "Recibe las últimas actualizaciones y perspectivas directamente en tu bandeja de entrada.",
    enter_email: "Ingresa tu correo",
    subscribe: "Suscribirse",
  },
  it: {
    portfolio: "Portfolio",
    about: "Chi siamo",
    certifications: "Certificazioni",
    references: "Referenze",
    blog: "Blog",
    contact: "Contatto",
    request_quote: "Richiedi preventivo",
    watch_video: "Guarda video",
    our_portfolio: "Il Nostro Portfolio",
    portfolio_description:
      "Scopri le nostre soluzioni di packaging premium e servizi di stampa di carte collezionabili che superano le aspettative.",
    get_in_touch: "Mettiti in contatto",
    contact_description:
      "Pronto a dare vita alla tua visione di packaging? Contattaci per un preventivo personalizzato.",
    contact_information: "Informazioni di contatto",
    send_message: "Invia messaggio",
    full_name: "Nome completo",
    email: "Email",
    company: "Azienda",
    project_type: "Tipo di progetto",
    select_project_type: "Seleziona tipo di progetto",
    budget_range: "Range di budget",
    select_budget: "Seleziona budget",
    timeline: "Tempistiche",
    timeline_placeholder: "es. 2-3 settimane",
    project_details: "Dettagli del progetto",
    message_placeholder: "Raccontaci dei requisiti del tuo progetto...",
    sending: "Invio...",
    latest_insights: "Ultime Intuizioni",
    blog_description:
      "Rimani aggiornato con le tendenze del settore, consigli e intuizioni dai nostri esperti di packaging.",
    read_more: "Leggi di più",
    view_all_posts: "Visualizza tutti i post",
    request_similar_quote: "Richiedi preventivo simile",
    our_certifications: "Le Nostre Certificazioni",
    certifications_description: "Manteniamo i più alti standard con certificazioni riconosciute internazionalmente.",
    download_pdf: "Scarica PDF",
    about_diw: "Chi è DIW",
    our_mission: "La Nostra Missione",
    our_vision: "La Nostra Visione",
    client_testimonials: "Testimonianze Clienti",
    testimonials_description: "Vedi cosa dicono i nostri clienti del lavorare con noi.",
    trusted_by_brands: "Fiducia di Marchi Leader",
    services: "Servizi",
    company: "Azienda",
    resources: "Risorse",
    newsletter: "Newsletter",
    newsletter_description: "Ricevi gli ultimi aggiornamenti e intuizioni direttamente nella tua casella di posta.",
    enter_email: "Inserisci la tua email",
    subscribe: "Iscriviti",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Record<string, string>>(staticTranslations.en)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load saved language preference
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("preferred-language") as Language
      if (savedLanguage && staticTranslations[savedLanguage]) {
        setCurrentLanguage(savedLanguage)
        setTranslations(staticTranslations[savedLanguage])
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    setTranslations(staticTranslations[lang] || staticTranslations.en)

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang)
    }
  }

  const t = (key: string): string => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translations, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
