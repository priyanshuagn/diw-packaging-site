"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/providers/language-provider"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
  options?: string[]
}

const initialMessage: Message = {
  id: "1",
  type: "bot",
  content: "Hello! I'm here to help you with your packaging needs. What type of project are you interested in?",
  timestamp: new Date(),
  options: ["Luxury Boxes", "Trading Cards", "Specialty Finishes", "Custom Packaging"],
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    email: "",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (content: string, type: "bot" | "user", options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(
      () => {
        setIsTyping(false)

        // Simple bot logic - in production, this would connect to a real AI service
        if (userMessage.toLowerCase().includes("box") || userMessage.toLowerCase().includes("packaging")) {
          setUserInfo((prev) => ({ ...prev, projectType: "Luxury Boxes" }))
          addMessage("Great choice! Luxury boxes are our specialty. What's your estimated budget range?", "bot", [
            "Under €1,000",
            "€1,000 - €5,000",
            "€5,000 - €10,000",
            "€10,000+",
          ])
        } else if (userMessage.toLowerCase().includes("card")) {
          setUserInfo((prev) => ({ ...prev, projectType: "Trading Cards" }))
          addMessage(
            "Excellent! We create premium trading cards with various finishes. What's your budget range?",
            "bot",
            ["Under €1,000", "€1,000 - €5,000", "€5,000 - €10,000", "€10,000+"],
          )
        } else if (userMessage.includes("€") || userMessage.toLowerCase().includes("budget")) {
          setUserInfo((prev) => ({ ...prev, budget: userMessage }))
          addMessage("Perfect! When do you need this project completed?", "bot", [
            "ASAP",
            "1-2 weeks",
            "1 month",
            "2-3 months",
            "Flexible",
          ])
        } else if (
          userMessage.toLowerCase().includes("week") ||
          userMessage.toLowerCase().includes("month") ||
          userMessage.toLowerCase().includes("asap")
        ) {
          setUserInfo((prev) => ({ ...prev, timeline: userMessage }))
          addMessage("Great! To provide you with a detailed quote, could you please share your email address?", "bot")
        } else if (userMessage.includes("@")) {
          setUserInfo((prev) => ({ ...prev, email: userMessage }))
          addMessage(
            `Thank you! I've collected the following information:
          
• Project Type: ${userInfo.projectType}
• Budget: ${userInfo.budget}
• Timeline: ${userInfo.timeline}
• Email: ${userMessage}

Our team will contact you within 24 hours with a personalized quote. Is there anything else you'd like to know about our services?`,
            "bot",
            ["View Portfolio", "Learn About Finishes", "Contact Information", "Start Over"],
          )

          // Track lead capture
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "chatbot_lead_captured", {
              event_category: "engagement",
              event_label: "chatbot",
            })
          }
        } else {
          addMessage("I understand. How can I help you with your packaging needs today?", "bot", [
            "Get Quote",
            "View Portfolio",
            "Learn More",
            "Contact Sales",
          ])
        }
      },
      1000 + Math.random() * 1000,
    ) // Random delay for more natural feel
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage(inputValue, "user")
    simulateBotResponse(inputValue)
    setInputValue("")
  }

  const handleOptionClick = (option: string) => {
    addMessage(option, "user")
    simulateBotResponse(option)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        } bg-[var(--color-gold)] hover:bg-[var(--color-dark-gold)]`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Card className="w-80 h-96 flex flex-col shadow-2xl bg-white">
          {/* Header */}
          <div className="bg-[var(--color-gold)] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium">DIW Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === "user" ? "bg-gray-300" : "bg-[var(--color-gold)]"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-3 h-3 text-gray-600" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user" ? "bg-gray-100 text-gray-900" : "bg-[var(--color-gold)] text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>

                  {/* Options */}
                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left justify-start text-xs"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-dark-gold)]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
