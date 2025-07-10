"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Grid, List } from "lucide-react"

interface MediaLibraryProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

// Mock media files
const mediaFiles = [
  {
    id: 1,
    name: "luxury-box-1.jpg",
    url: "/placeholder.svg?height=200&width=300",
    type: "image",
    size: "245 KB",
    uploadDate: "2024-01-15",
    alt: "Luxury packaging box with gold foil",
  },
  {
    id: 2,
    name: "trading-cards.jpg",
    url: "/placeholder.svg?height=200&width=300",
    type: "image",
    size: "189 KB",
    uploadDate: "2024-01-14",
    alt: "Premium trading cards with holographic finish",
  },
  {
    id: 3,
    name: "company-logo.svg",
    url: "/placeholder.svg?height=100&width=200",
    type: "image",
    size: "12 KB",
    uploadDate: "2024-01-10",
    alt: "DIW Packaging company logo",
  },
  {
    id: 4,
    name: "certificate-iso.pdf",
    url: "/placeholder.pdf",
    type: "document",
    size: "1.2 MB",
    uploadDate: "2024-01-08",
    alt: "ISO 9001 certification document",
  },
]

export default function MediaLibrary({ isOpen, onClose, onSelect }: MediaLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFile, setSelectedFile] = useState<number | null>(null)

  const filteredFiles = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.alt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileSelect = (file: (typeof mediaFiles)[0]) => {
    if (file.type === "image") {
      onSelect(file.url)
    }
  }

  const handleUpload = () => {
    // In a real app, this would handle file upload
    console.log("Upload functionality would be implemented here")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleUpload} className="bg-gold hover:bg-gold-dark">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>

          {/* File Grid/List */}
          <div className="max-h-96 overflow-y-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow ${
                      selectedFile === file.id ? "border-gold bg-gold/5" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedFile(file.id)}
                    onDoubleClick={() => handleFileSelect(file)}
                  >
                    <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                      {file.type === "image" ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-2xl mb-1">📄</div>
                          <div className="text-xs">{file.type.toUpperCase()}</div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                      selectedFile === file.id ? "border-gold bg-gold/5" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedFile(file.id)}
                    onDoubleClick={() => handleFileSelect(file)}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      {file.type === "image" ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.alt}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">📄</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-sm text-gray-500">{file.alt}</div>
                    </div>

                    <div className="text-sm text-gray-500 text-right">
                      <div>{file.size}</div>
                      <div>{file.uploadDate}</div>
                    </div>

                    <Badge variant="secondary">{file.type}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">{filteredFiles.length} files</div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const selected = mediaFiles.find((f) => f.id === selectedFile)
                  if (selected) handleFileSelect(selected)
                }}
                disabled={!selectedFile}
                className="bg-gold hover:bg-gold-dark"
              >
                Select File
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
