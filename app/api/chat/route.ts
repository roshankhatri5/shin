import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GLM_API_KEY
    const baseUrl = process.env.GLM_BASE_URL
    const model = process.env.GLM_MODEL

    if (!apiKey) {
      console.error('GLM_API_KEY is missing from environment variables')
      return NextResponse.json(
        { error: 'GLM API key is not configured' },
        { status: 500 }
      )
    }

    if (!baseUrl) {
      console.error('GLM_BASE_URL is missing from environment variables')
      return NextResponse.json(
        { error: 'GLM base URL is not configured' },
        { status: 500 }
      )
    }

    if (!model) {
      console.error('GLM_MODEL is missing from environment variables')
      return NextResponse.json(
        { error: 'GLM model is not configured' },
        { status: 500 }
      )
    }

    console.log(`Making request to GLM API: ${baseUrl} with model: ${model}`)

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { 
            role: 'system', 
            content: systemPrompt || 'You are Bella, a warm, feminine, and sophisticated AI assistant for Elegant Nails salon. You speak with grace, warmth, and encouragement. Use elegant but concise language, and help guests with nail services, designs, booking appointments, pricing, and self-care routines. Include tasteful emojis like ✨💅🌸. Keep responses helpful, friendly, structured, and on-brand for a luxury nail salon experience.' 
          },
          ...messages
        ],
        max_tokens: 1500,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GLM API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: baseUrl,
        model: model
      })
      
      let errorMessage = 'Failed to get response from GLM API'
      if (response.status === 401) {
        errorMessage = 'Invalid API key for GLM service'
      } else if (response.status === 403) {
        errorMessage = 'Access forbidden - please check API key permissions'
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded - please try again later'
      } else if (response.status >= 500) {
        errorMessage = 'GLM service is temporarily unavailable'
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response format from GLM API' },
        { status: 500 }
      )
    }

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