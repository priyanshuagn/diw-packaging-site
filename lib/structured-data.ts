export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://diwpackaging.com/#organization",
        name: "DIW – Do It Wow Packaging",
        url: "https://diwpackaging.com",
        logo: {
          "@type": "ImageObject",
          url: "https://diwpackaging.com/logo.png",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+421-123-456-789",
          contactType: "customer service",
          availableLanguage: ["English", "Slovak", "Czech", "German", "Spanish", "Italian"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hlavná 123",
          addressLocality: "Bratislava",
          postalCode: "811 01",
          addressCountry: "SK",
        },
        sameAs: [
          "https://facebook.com/diwpackaging",
          "https://linkedin.com/company/diwpackaging",
          "https://instagram.com/diwpackaging",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://diwpackaging.com/#localbusiness",
        name: "DIW – Do It Wow Packaging",
        image: "https://diwpackaging.com/hero-image.jpg",
        description:
          "Premium luxury packaging and trading card printing services. Custom boxes, specialty finishes, and high-quality printing solutions.",
        url: "https://diwpackaging.com",
        telephone: "+421-123-456-789",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hlavná 123",
          addressLocality: "Bratislava",
          postalCode: "811 01",
          addressCountry: "SK",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
        priceRange: "€€€",
      },
      {
        "@type": "WebSite",
        "@id": "https://diwpackaging.com/#website",
        url: "https://diwpackaging.com",
        name: "DIW – Do It Wow Packaging",
        description: "Premium luxury packaging and trading card printing services",
        publisher: {
          "@id": "https://diwpackaging.com/#organization",
        },
        inLanguage: ["en", "sk", "cs", "de", "es", "it"],
      },
    ],
  }
}
