"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { getPortfolioItems } from "@/lib/supabase/queries"
import { mockCategories } from "@/lib/mock-data"

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t, currentLanguage } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    loadPortfolioItems()
  }, [currentLanguage, activeCategory])

  const loadPortfolioItems = async () => {
    try {
      setIsLoading(true)
      // Use the mock data function which won't cause database issues
      const data = await getPortfolioItems(activeCategory === "all" ? undefined : activeCategory, currentLanguage)
      setPortfolioItems(data || [])
    } catch (error) {
      console.error("Failed to load portfolio items:", error)
      setPortfolioItems([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const getImageUrl = (filePath: string) => {
    if (!filePath) return "/placeholder.svg?height=400&width=600"
    // For mock data, use placeholder images
    return "/placeholder.svg?height=400&width=600"
  }

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div ref={ref} className={`text-center mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("our_portfolio")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("portfolio_description")}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {mockCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`${
                activeCategory === category.id
                  ? "bg-gold hover:bg-gold-dark text-white"
                  : "border-gray-300 hover:border-gold hover:text-gold"
              } px-6 py-2 rounded-full transition-all duration-200`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                    <div className="h-6 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className={`group cursor-pointer fade-in ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={getImageUrl(item.media?.file_path) || "/placeholder.svg"}
                      alt={item.media?.alt_text || item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.portfolio_features?.slice(0, 2).map((feature: any) => (
                        <Badge key={feature.feature_name} variant="secondary" className="text-xs">
                          {feature.feature_name}
                        </Badge>
                      ))}
                      {item.portfolio_features?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.portfolio_features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No portfolio items found for the selected category.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">{selectedItem.title}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative h-96 lg:h-full">
                    <Image
                      src={getImageUrl(selectedItem.media?.file_path) || "/placeholder.svg"}
                      alt={selectedItem.media?.alt_text || selectedItem.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Project Details</h4>
                      <p className="text-gray-600">{selectedItem.description}</p>
                    </div>

                    {selectedItem.client_name && (
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Client</h4>
                        <p className="text-gray-600">{selectedItem.client_name}</p>
                      </div>
                    )}

                    {selectedItem.portfolio_features?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.portfolio_features.map((feature: any) => (
                            <Badge key={feature.feature_name} variant="secondary">
                              {feature.feature_name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="bg-gold hover:bg-gold-dark text-white px-8 py-3 font-medium transition-all duration-300 uppercase tracking-wide w-full mt-6">
                      {t("request_similar_quote")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
