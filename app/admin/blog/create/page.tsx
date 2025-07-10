"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Save, Eye, ArrowLeft, Plus, X, Upload, Wand2 } from "lucide-react"
import RichTextEditor from "@/components/admin/rich-text-editor"
import MediaLibrary from "@/components/admin/media-library"
import SEOSettings from "@/components/admin/seo-settings"
import { createBlogPost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
]

export default function CreateBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
    const supabase = createClient();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    language: "en",
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0],
    featuredImage: "",
    tags: [] as string[],
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  })

  const [newTag, setNewTag] = useState("")
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-generate slug from title
      if (field === "title") {
        updated.slug = generateSlug(value)
      }

      return updated
    })
  }

  const handleSEOChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value },
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const generateAIContent = async () => {
    if (!formData.title) {
      toast({
        title: "Title required",
        description: "Please enter a title first to generate content",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingContent(true)

    try {
      // Simulate AI content generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const generatedContent = `
        <h2>Introduction</h2>
        <p>This is AI-generated content based on the title "${formData.title}". In a real implementation, this would connect to an AI service like OpenAI's GPT-4 to generate relevant content.</p>
        
        <h2>Key Points</h2>
        <ul>
          <li>Point 1 related to ${formData.title}</li>
          <li>Point 2 with industry insights</li>
          <li>Point 3 with practical applications</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>This concludes the AI-generated content. You can edit and expand on this foundation.</p>
      `

      setFormData((prev) => ({ ...prev, content: generatedContent }))

      toast({
        title: "Content generated!",
        description: "AI has generated initial content. You can now edit and customize it.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingContent(false)
    }
  }


    const handleSave = async (status: 'draft' | 'published') => {
        setIsSaving(true)

        try {
            const blogPostData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                language: formData.language as any,
                status: status as any,
                author_id: 'dcfbb6f4-b8a7-4275-811f-3aa124ea9ea4',
                featured_image: formData.featuredImage || null,
                published_at: status === 'published' ? new Date().toISOString() : null,
                seo_title: formData.seo.title || null,
                seo_description: formData.seo.description || null,
                seo_keywords: formData.seo.keywords || null,
            }

            const { data, error } = await supabase.from('blog_posts').insert([blogPostData]).select().single()

            if (error) throw error

            toast({
                title: status === 'published' ? 'Post published!' : 'Draft saved!',
                description: `Your blog post has been ${status === 'published' ? 'published' : 'saved as draft'}.`,
            })

            router.push('/admin/blog')
        } catch (error) {
            console.error('Save error:', error)
            toast({
                title: 'Save failed',
                description: 'Failed to save the post. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsSaving(false)
        }
    }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Blog Post</h1>
            <p className="text-gray-600">Write and publish a new blog post</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={isSaving} className="bg-gold hover:bg-gold-dark">
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter post title..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="post-url-slug"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief description of the post..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Content</Label>
                  <Button variant="outline" size="sm" onClick={generateAIContent} disabled={isGeneratingContent}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGeneratingContent ? "Generating..." : "AI Generate"}
                  </Button>
                </div>
                <RichTextEditor value={formData.content} onChange={(value) => handleInputChange("content", value)} />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <SEOSettings seo={formData.seo} onChange={handleSEOChange} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Language</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange("publishDate", e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featuredImage ? (
                <div className="space-y-2">
                  <img
                    src={formData.featuredImage || "/placeholder.svg"}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsMediaLibraryOpen(true)} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Library Modal */}
      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={(url) => {
          setFormData((prev) => ({ ...prev, featuredImage: url }))
          setIsMediaLibraryOpen(false)
        }}
      />
    </div>
  )
}
