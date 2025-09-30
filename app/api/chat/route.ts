import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GLM_API_KEY
    const baseUrl = process.env.GLM_BASE_URL
    const model = process.env.GLM_MODEL

    if (!apiKey || !baseUrl || !model) {
      return NextResponse.json(
        { error: 'GLM API configuration is missing' },
        { status: 500 }
      )
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GLM API Error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to get response from GLM API' },
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