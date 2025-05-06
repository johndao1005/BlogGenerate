import { NextResponse } from 'next/server'
import { generateBlogPost } from '@/lib/api'

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