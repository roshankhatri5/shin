# API Documentation

This document covers all API endpoints and integrations in the Elegant Nails application.

## 📋 Table of Contents

- [Chat API](#chat-api)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Security](#security)
- [Future API Endpoints](#future-api-endpoints)

## Chat API

### POST `/api/chat`

AI-powered chatbot endpoint using GLM-4.5-Air model.

**Endpoint:** `POST /api/chat`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```typescript
interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  systemPrompt?: string
}
```

**Response:**
```typescript
interface ChatResponse {
  message: string
}
```

**Example Request:**
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    systemPrompt: 'You are Bella, a helpful nail artist assistant.',
    messages: [
      {
        role: 'user',
        content: 'What nail services do you offer?'
      }
    ]
  })
})

const data = await response.json()
console.log(data.message) // AI response
```

**Error Responses:**
```typescript
// 400 Bad Request
{
  error: 'Messages array is required'
}

// 500 Internal Server Error
{
  error: 'GLM API configuration is missing'
}

// 502 Bad Gateway
{
  error: 'Failed to get response from GLM API'
}
```

### Implementation Details

The chat API is implemented in `app/api/chat/route.ts` and includes:

1. **Request Validation**: Ensures messages array is provided
2. **Environment Configuration**: Validates GLM API credentials
3. **System Prompt Injection**: Adds feminine nail artist persona
4. **Error Handling**: Comprehensive error responses
5. **Response Processing**: Extracts and returns AI-generated content

**Backend Integration:**
```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json()
    
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Get environment configuration
    const apiKey = process.env.GLM_API_KEY
    const baseUrl = process.env.GLM_BASE_URL
    const model = process.env.GLM_MODEL

    // Call GLM API
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { 
            role: 'system', 
            content: systemPrompt || 'Default feminine nail artist persona...' 
          },
          ...messages
        ],
        max_tokens: 2000,
        temperature: 0.7,
        stream: false,
      }),
    })

    const data = await response.json()
    return NextResponse.json({
      message: data.choices[0].message.content,
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GLM_API_KEY` | GLM-4.5-Air API key | `cpk_...` |
| `GLM_BASE_URL` | GLM API endpoint | `https://llm.chutes.ai/v1/chat/completions` |
| `GLM_MODEL` | Model identifier | `zai-org/GLM-4.5-Air` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics ID | - |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `STRIPE_SECRET_KEY` | Stripe payment processing | - |
| `RESEND_API_KEY` | Email service API key | - |

### Setting Up Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your GLM API credentials:**
   ```env
   GLM_API_KEY=your_actual_api_key_here
   GLM_BASE_URL=https://llm.chutes.ai/v1/chat/completions
   GLM_MODEL=zai-org/GLM-4.5-Air
   ```

3. **Verify configuration:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/chat to test
   ```

## Error Handling

### Standard Error Format

All API endpoints return errors in a consistent format:

```typescript
interface APIError {
  error: string
  code?: string
  details?: any
}
```

### Common Error Codes

| Status Code | Meaning | Action |
|-------------|---------|--------|
| `400` | Bad Request | Check request format |
| `401` | Unauthorized | Verify API keys |
| `429` | Rate Limit | Implement retry logic |
| `500` | Server Error | Check logs |
| `502` | Bad Gateway | External service issue |

### Error Handling in Client Code

```typescript
async function sendChatMessage(messages: Message[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to get response')
    }

    return await response.json()
  } catch (error) {
    console.error('Chat error:', error)
    // Handle error in UI
    setError(error instanceof Error ? error.message : 'Something went wrong')
  }
}
```

## Rate Limiting

### Current Implementation

- **No rate limiting** currently implemented
- **Recommended**: Add rate limiting for production

### Suggested Rate Limiting

```typescript
// middleware.ts (future implementation)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/chat')) {
    const ip = request.ip ?? '127.0.0.1'
    const limit = 10 // 10 requests per minute
    const windowMs = 60 * 1000 // 1 minute

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 0, resetTime: Date.now() + windowMs })
    }

    const record = rateLimitMap.get(ip)

    if (Date.now() > record.resetTime) {
      record.count = 0
      record.resetTime = Date.now() + windowMs
    }

    if (record.count >= limit) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    record.count++
  }

  return NextResponse.next()
}
```

## Security

### Current Security Measures

1. **Environment Variables**: Sensitive data stored in environment variables
2. **HTTPS**: All API calls use HTTPS in production
3. **Input Validation**: Request validation on all endpoints
4. **Error Handling**: No sensitive data exposed in error messages

### Security Best Practices

1. **API Key Management**:
   ```bash
   # Never commit API keys
   echo ".env.local" >> .gitignore
   
   # Use different keys for different environments
   GLM_API_KEY_DEV=dev_key
   GLM_API_KEY_PROD=prod_key
   ```

2. **Request Validation**:
   ```typescript
   import { z } from 'zod'
   
   const chatSchema = z.object({
     messages: z.array(z.object({
       role: z.enum(['user', 'assistant', 'system']),
       content: z.string().min(1).max(1000)
     })).min(1).max(10)
   })
   ```

3. **CORS Configuration**:
   ```typescript
   // next.config.js
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             {
               key: 'Access-Control-Allow-Origin',
               value: process.env.NODE_ENV === 'production' 
                 ? 'https://yourdomain.com' 
                 : '*'
             }
           ]
         }
       ]
     }
   }
   ```

## Future API Endpoints

### Planned Endpoints

#### Booking API
```typescript
// POST /api/booking
interface BookingRequest {
  serviceId: string
  technicianId: string
  dateTime: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
}
```

#### Contact API
```typescript
// POST /api/contact
interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}
```

#### Newsletter API
```typescript
// POST /api/newsletter/subscribe
interface NewsletterRequest {
  email: string
  preferences?: string[]
}
```

#### Services API
```typescript
// GET /api/services
interface ServicesResponse {
  services: Service[]
  categories: Category[]
}

// GET /api/services/[id]
interface ServiceResponse {
  service: Service
  pricing: Pricing[]
  availability: TimeSlot[]
}
```

### Database Schema Planning

```sql
-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_min INTEGER,
  duration_max INTEGER,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  category VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing APIs

### Development Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Test chat endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{
       "messages": [
         {"role": "user", "content": "Hello"}
       ]
     }'
   ```

3. **Test in browser:**
   - Visit http://localhost:3000/chat
   - Send a message to Bella
   - Verify response and UI updates

### Production Testing

1. **Health check endpoint** (future):
   ```typescript
   // app/api/health/route.ts
   export async function GET() {
     return NextResponse.json({
       status: 'healthy',
       timestamp: new Date().toISOString(),
       version: process.env.npm_package_version
     })
   }
   ```

2. **API monitoring** (recommended):
   ```javascript
   // Monitor API response times and errors
   const monitor = {
     logRequest: (endpoint, duration, status) => {
       console.log(`API ${endpoint}: ${duration}ms (${status})`)
     }
   }
   ```

## Integration Examples

### React Hook for Chat

```typescript
// hooks/useChat.ts
import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, sendMessage, isLoading, error }
}
```

### Next.js API Route Template

```typescript
// Template for new API routes
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define request schema
const requestSchema = z.object({
  // Define your schema here
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    // Business logic here
    const result = await processRequest(validatedData)

    // Return success response
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```