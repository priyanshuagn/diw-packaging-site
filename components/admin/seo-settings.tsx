"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface SEOSettingsProps {
  seo: {
    title: string
    description: string
    keywords: string
  }
  onChange: (field: string, value: string) => void
}

export default function SEOSettings({ seo, onChange }: SEOSettingsProps) {
  const titleLength = seo.title.length
  const descriptionLength = seo.description.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="seo-title">SEO Title</Label>
            <Badge variant={titleLength > 60 ? "destructive" : titleLength > 50 ? "secondary" : "default"}>
              {titleLength}/60
            </Badge>
          </div>
          <Input
            id="seo-title"
            value={seo.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="SEO optimized title..."
          />
          <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="seo-description">Meta Description</Label>
            <Badge
              variant={descriptionLength > 160 ? "destructive" : descriptionLength > 140 ? "secondary" : "default"}
            >
              {descriptionLength}/160
            </Badge>
          </div>
          <Textarea
            id="seo-description"
            value={seo.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Brief description for search engines..."
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">Recommended: 140-160 characters</p>
        </div>

        <div>
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            value={seo.keywords}
            onChange={(e) => onChange("keywords", e.target.value)}
            placeholder="keyword1, keyword2, keyword3..."
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
        </div>
      </CardContent>
    </Card>
  )
}
