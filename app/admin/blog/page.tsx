"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Calendar, User, FileText } from "lucide-react"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Packaging",
    excerpt: "Explore how eco-friendly materials and processes are shaping the luxury packaging industry.",
    author: "Maria Novak",
    status: "published",
    publishDate: "2024-01-15",
    views: 1247,
    language: "en",
    tags: ["Sustainability", "Innovation"],
  },
  {
    id: 2,
    title: "Trading Card Design Trends 2024",
    excerpt: "Discover the latest trends in trading card design, from holographic effects to interactive elements.",
    author: "Peter Koval",
    status: "draft",
    publishDate: "2024-01-10",
    views: 0,
    language: "en",
    tags: ["Design", "Trading Cards"],
  },
  {
    id: 3,
    title: "Budúcnosť udržateľného balenia",
    excerpt: "Preskúmajte, ako ekologické materiály a procesy formujú priemysel luxusného balenia.",
    author: "Maria Novak",
    status: "published",
    publishDate: "2024-01-15",
    views: 892,
    language: "sk",
    tags: ["Udržateľnosť", "Inovácie"],
  },
]

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800",
}

const languageFlags = {
  en: "🇺🇸",
  sk: "🇸🇰",
  cs: "🇨🇿",
  de: "🇩🇪",
  es: "🇪🇸",
  it: "🇮🇹",
}

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesLanguage = languageFilter === "all" || post.language === languageFilter

    return matchesSearch && matchesStatus && matchesLanguage
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Create and manage blog posts across all languages</p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="bg-gold hover:bg-gold-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("archived")}>Archived</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Language: {languageFilter === "all" ? "All" : languageFilter.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguageFilter("all")}>All Languages</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("en")}>🇺🇸 English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("sk")}>🇸🇰 Slovak</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("cs")}>🇨🇿 Czech</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("de")}>🇩🇪 German</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("es")}>🇪🇸 Spanish</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageFilter("it")}>🇮🇹 Italian</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <span className="text-lg">{languageFlags[post.language as keyof typeof languageFlags]}</span>
                    <Badge className={statusColors[post.status as keyof typeof statusColors]}>{post.status}</Badge>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views} views
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || languageFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Get started by creating your first blog post"}
              </p>
              <Link href="/admin/blog/create">
                <Button className="bg-gold hover:bg-gold-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
