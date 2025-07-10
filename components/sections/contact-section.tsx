"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/providers/language-provider"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { createContactSubmission, trackEvent } from "@/lib/supabase/queries"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Bratislava, Slovakia",
    details: "Hlavná 123, 811 01 Bratislava",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+421 123 456 789",
    details: "Mon-Fri 9:00-17:00",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@diwpackaging.com",
    details: "We reply within 24 hours",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri 9:00-17:00",
    details: "CET Time Zone",
  },
]

const projectTypes = ["Luxury Boxes", "Trading Cards", "Specialty Finishes", "Custom Packaging", "Other"]
const budgetRanges = ["Under €1,000", "€1,000 - €5,000", "€5,000 - €10,000", "€10,000 - €25,000", "Over €25,000"]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project_type: "",
    budget_range: "",
    message: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create contact submission in Supabase
      await createContactSubmission({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        project_type: formData.project_type,
        budget_range: formData.budget_range,
        timeline: formData.timeline,
        message: formData.message,
        ip_address: null, // Would be set server-side in production
        user_agent: navigator.userAgent,
      })

      // Track analytics event
      await trackEvent("form_submitted", {
        form_type: "contact_form",
        project_type: formData.project_type,
        budget_range: formData.budget_range,
      })

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        project_type: "",
        budget_range: "",
        message: "",
        timeline: "",
      })
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div ref={ref} className={`text-center mb-16 fade-in ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t("get_in_touch")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("contact_description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`fade-in ${isVisible ? "visible" : ""}`}>
            <h3 className="font-serif text-2xl font-semibold mb-8">{t("contact_information")}</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-[var(--color-gold)] p-3 rounded-lg">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{info.title}</h4>
                    <p className="text-gray-900">{info.content}</p>
                    <p className="text-gray-600 text-sm">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">Bratislava, Slovakia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`fade-in ${isVisible ? "visible" : ""}`}>
            <h3 className="font-serif text-2xl font-semibold mb-8">{t("send_message")}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t("full_name")} *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">{t("company")}</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t("project_type")}</Label>
                  <Select onValueChange={(value) => handleInputChange("project_type", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t("select_project_type")} />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("budget_range")}</Label>
                  <Select onValueChange={(value) => handleInputChange("budget_range", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t("select_budget")} />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">{t("timeline")}</Label>
                <Input
                  id="timeline"
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange("timeline", e.target.value)}
                  placeholder={t("timeline_placeholder")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">{t("project_details")} *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={5}
                  placeholder={t("message_placeholder")}
                  className="mt-1"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg py-3">
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("sending")}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    {t("send_message")}
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
