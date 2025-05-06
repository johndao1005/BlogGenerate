'use client'

import { useState } from 'react'

export default function BlogGenerator() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('professional')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const generateBlog = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone }),
      })
      
      const data = await response.json()
      if (response.ok) {
        setContent(data.content)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Generate a Blog Post</h2>
      <div className="mb-4">
        <label className="block mb-2">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter a blog topic"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="humorous">Humorous</option>
        </select>
      </div>
      <button
        onClick={generateBlog}
        disabled={loading || !topic}
        className="btn disabled:bg-gray-400"
      >
        {loading ? 'Generating...' : 'Generate Blog Post'}
      </button>

      {content && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Generated Content</h3>
          <div className="p-4 bg-gray-100 rounded whitespace-pre-wrap">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}