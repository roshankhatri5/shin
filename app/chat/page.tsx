'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HydrationBoundary } from '@/components/ui/hydration-boundary'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial_assistant_message',
      content: "Hello! ✨ I'm Bella, your AI stylist at Elegant Nails. I'm here to help you discover the perfect nail look, answer questions about our services, and assist with booking. What would you like to know? 💅",
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messageCounterRef = useRef(1)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    // Mark component hydrated to avoid SSR/CSR timestamp mismatch
    setIsHydrated(true)
  }, [])

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    messageCounterRef.current += 1
    const userMessage: Message = {
      id: `user_message_${messageCounterRef.current}`,
      content: inputText,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    setError(null)

    try {
      // Prepare messages for API (convert to OpenAI format)
      const apiMessages = [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: inputText
        }
      ]

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: `You are Bella, the sophisticated AI stylist for Elegant Nails salon. 

PERSONA: Warm, feminine, elegant, and detail-oriented with expert knowledge of nail care and beauty trends.

STYLE: Speak with grace and encouragement, use refined but approachable language, be concise yet comprehensive.

CAPABILITIES:
• Explain all nail services and accurate pricing
• Recommend designs based on season, events, skin tone, and personal style
• Suggest nail care routines and aftercare tips
• Help with color matching and trend advice
• Gently guide toward booking when appropriate
• Answer questions about salon policies, hours, and procedures

GUIDELINES:
• Use tasteful emojis (✨💅🌸🎨) to enhance warmth
• Structure responses for easy reading
• Avoid slang, keep language elegant
• Be encouraging and confidence-building
• Always prioritize nail health and safety

You represent a luxury nail salon experience - be knowledgeable, caring, and professional.`,
          messages: apiMessages
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }))
        throw new Error(errorData.error || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      
      messageCounterRef.current += 1
      const assistantMessage: Message = {
        id: `assistant_message_${messageCounterRef.current}`,
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    messageCounterRef.current = 1
    setMessages([
      {
        id: 'initial_assistant_message',
        content: "Hello! ✨ I'm Bella, your AI stylist at Elegant Nails. I'm here to help you discover the perfect nail look, answer questions about our services, and assist with booking. What would you like to know? 💅",
        role: 'assistant',
        timestamp: new Date()
      }
    ])
    setError(null)
  }

  return (
    <HydrationBoundary>
      <div className="min-h-screen bg-gradient-to-br from-ivory to-warmgray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
              Bella — Your Nail Artist
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I'm here to help you discover your perfect nail look, recommend services and pricing, plan your visit, and provide expert nail care advice — all with elegance and care.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-sm text-gray-600 font-medium">Powered by GLM-4.5-Air via Chutes AI</span>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "flex",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] flex space-x-3",
                      message.role === 'user' ? "flex-row-reverse space-x-reverse" : ""
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md",
                        message.role === 'user'
                          ? "bg-gradient-to-r from-gold-500 to-gold-600"
                          : "bg-gradient-to-r from-gold-400 to-gold-500"
                      )}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl shadow-sm",
                        message.role === 'user'
                          ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-2 opacity-70",
                          message.role === 'user' ? "text-gold-100" : "text-warmgray-600"
                        )}
                      >
                        <span suppressHydrationWarning>{isHydrated ? message.timestamp.toLocaleTimeString() : ''}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gold-200 px-4 py-3 rounded-2xl shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-warmgray-600">Bella is sketching ideas...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm max-w-md">
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-xs text-red-600 hover:text-red-800 mt-1 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-6">
            <div className="flex space-x-4">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 px-4 py-3 border border-gold-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none bg-ivory text-charcoal placeholder-warmgray-500"
                disabled={isLoading}
                rows={3}
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  onClick={clearChat}
                  variant="outline"
                  className="px-6 py-2 text-gold-700 border-gold-300 rounded-2xl hover:bg-gold-50"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>
            This chat is powered by{' '}
            <span className="font-semibold text-gray-700">GLM-4.5-Air</span> via{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              https://llm.chutes.ai
            </code>
          </p>
        </motion.div>
        </div>
      </div>
    </HydrationBoundary>
  )
}