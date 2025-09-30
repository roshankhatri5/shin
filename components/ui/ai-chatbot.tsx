'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface AIChatbotProps {
  className?: string
}

const QUICK_RESPONSES = [
  "What services do you offer?",
  "How can I book an appointment?", 
  "What are your prices?",
  "What are your hours?",
  "Do you take walk-ins?",
]

const BOT_RESPONSES = {
  "hello": "Hello! 👋 Welcome to Elegant Nails! I'm here to help you with any questions about our services, booking, or anything else you'd like to know.",
  "services": "We offer a full range of luxury nail services including:\n• Classic & Gel Manicures\n• Spa & Gel Pedicures\n• Nail Art & Design\n• Acrylic Extensions\n• Paraffin Treatments\n\nWould you like details about any specific service?",
  "booking": "You can book an appointment in several ways:\n• Click 'Book Now' on our website\n• Call us at (555) 012-3456\n• Visit us in person\n\nOur online booking system is available 24/7! Would you like me to help you get started?",
  "prices": "Our prices vary by service:\n• Classic Manicure: Starting at $35\n• Gel Manicure: Starting at $50\n• Spa Pedicure: Starting at $55\n• Nail Art: Starting at $10 per nail\n\nWe also offer package deals! Would you like to know about our current promotions?",
  "hours": "We're open:\n• Monday-Friday: 9:00 AM - 7:00 PM\n• Saturday: 9:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 5:00 PM\n\nWe recommend booking in advance to ensure your preferred time slot!",
  "walkins": "We welcome walk-ins when possible, but we highly recommend booking an appointment to guarantee your preferred time and technician. Our schedule can get quite busy, especially on weekends!",
  "default": "Thank you for your message! I'd be happy to help you with information about our services, booking, pricing, or hours. You can also call us at (555) 012-3456 for immediate assistance. What would you like to know?"
} as const

export function AIChatbot({ className }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant at Elegant Nails. How can I help you today? ✨",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return BOT_RESPONSES.hello
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
      return BOT_RESPONSES.services
    }
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return BOT_RESPONSES.booking
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return BOT_RESPONSES.prices
    }
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
      return BOT_RESPONSES.hours
    }
    if (lowerMessage.includes('walk') || lowerMessage.includes('walk-in')) {
      return BOT_RESPONSES.walkins
    }
    
    return BOT_RESPONSES.default
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const originalMessage = inputText
    setInputText('')
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(originalMessage),
        isBot: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleQuickResponse = (response: string) => {
    setInputText(response)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className={cn("fixed bottom-6 right-6 z-50", className)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink to-blush shadow-luxury hover:shadow-luxury-hover text-white border-2 border-white/20 backdrop-blur-sm"
                aria-label="Open chat"
              >
                <MessageCircle className="w-8 h-8" />
              </Button>
              
              {/* Notification dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-elegant text-sm text-charcoal whitespace-nowrap pointer-events-none"
              >
                Need help? Chat with us! ✨
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-ivory-200 z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink to-blush text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">GLM-4.5-Air</h3>
                  <p className="text-xs text-white/80">AI Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-soft">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs px-4 py-3 rounded-2xl text-sm whitespace-pre-line",
                      message.isBot
                        ? "bg-white shadow-soft text-charcoal border border-ivory-200"
                        : "bg-gradient-to-r from-pink to-blush text-white shadow-luxury"
                    )}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink" />
                      )}
                      {!message.isBot && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/80" />
                      )}
                      <span>{message.text}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white shadow-soft text-charcoal px-4 py-3 rounded-2xl border border-ivory-200">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-pink" />
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-pink rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-pink rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-pink rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-ivory-200 bg-white/50">
                <p className="text-xs text-charcoal/60 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_RESPONSES.slice(0, 3).map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs px-3 py-1.5 bg-pink-50 text-pink rounded-full hover:bg-pink-100 transition-colors border border-pink-100"
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-ivory-200 bg-white">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-ivory-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent text-sm bg-ivory-50"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  variant="elegant"
                  className="px-4 py-3 rounded-xl"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}