"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { getBlogPosts } from "@/lib/supabase/queries"

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t, currentLanguage } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    loadBlogPosts()
  }, [currentLanguage])

  const loadBlogPosts = async () => {
    try {
      setIsLoading(true)
      const data = await getBlogPosts(currentLanguage, "published")
      setBlogPosts(data?.slice(0, 3) || []) // Show only 3 latest posts
    } catch (error) {
      console.error("Failed to load blog posts:", error)
      setBlogPosts([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const getImageUrl = (filePath: string) => {
    if (!filePath) return "/placeholder.svg?height=300&width=400"
    // For mock data, use placeholder images
    return "/placeholder.svg?height=300&width=400"
  }

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div ref={ref} className={`text-center mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("latest_insights")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("blog_description")}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3" />
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-3 bg-gray-200 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`group hover:shadow-lg transition-all duration-300 overflow-hidden fade-in ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageUrl(post.media?.file_path) || "/placeholder.svg"}
                    alt={post.media?.alt_text || post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {post.blog_post_tags?.slice(0, 2).map((tagRelation: any) => (
                        <Badge key={tagRelation.tags.slug} variant="secondary" className="bg-white/90 text-gray-900">
                          {tagRelation.tags.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.profiles?.full_name}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{new Date(post.published_at).toLocaleDateString()}</span>
                    <span>{Math.ceil((post.content?.length || 0) / 1000)} min read</span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="inline-flex items-center text-[var(--color-gold)] hover:text-[var(--color-dark-gold)] font-medium transition-colors cursor-pointer">
                    {t("read_more")}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" className="btn-secondary bg-transparent">
            <Tag className="w-4 h-4 mr-2" />
            {t("view_all_posts")}
          </Button>
        </div>
      </div>
    </section>
  )
}
