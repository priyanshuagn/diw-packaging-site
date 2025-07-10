"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Heading1, action: () => insertText("# "), label: "Heading 1" },
    { icon: Heading2, action: () => insertText("## "), label: "Heading 2" },
    { icon: Heading3, action: () => insertText("### "), label: "Heading 3" },
    { icon: Bold, action: () => insertText("**", "**"), label: "Bold" },
    { icon: Italic, action: () => insertText("*", "*"), label: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>"), label: "Underline" },
    { icon: List, action: () => insertText("- "), label: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("1. "), label: "Numbered List" },
    { icon: Link, action: () => insertText("[", "](url)"), label: "Link" },
    { icon: ImageIcon, action: () => insertText("![alt text](", ")"), label: "Image" },
    { icon: Code, action: () => insertText("`", "`"), label: "Code" },
    { icon: Quote, action: () => insertText("> "), label: "Quote" },
  ]

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="w-4 h-4" />
          </Button>
        ))}

        <div className="ml-auto flex gap-2">
          <Button variant={!isPreview ? "default" : "ghost"} size="sm" onClick={() => setIsPreview(false)}>
            Edit
          </Button>
          <Button variant={isPreview ? "default" : "ghost"} size="sm" onClick={() => setIsPreview(true)}>
            Preview
          </Button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br>") }} />
        ) : (
          <Textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your blog post..."
            className="min-h-[400px] border-0 resize-none focus:ring-0 rounded-none"
          />
        )}
      </div>
    </div>
  )
}
