import { NextResponse } from 'next/server'
import { generateBlogPost } from '@/lib/api'

export const runtime = 'edge';

// Rest of your API route code

// This API route handles POST requests to generate a blog post based on the provided topic and tone.
// It expects a JSON body with the topic and tone, and returns the generated content or an error message.
// The function uses the NextResponse object to send JSON responses back to the client.
export async function POST(request: Request) {
  try {
    const { topic, tone } = await request.json()
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    const content = await generateBlogPost(topic, tone)
    
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error generating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}
