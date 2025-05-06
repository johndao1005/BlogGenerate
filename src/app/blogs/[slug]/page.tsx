import BlogContent from '@/components/BlogContent'

// In a real app, you'd fetch the post from an API or database
// based on the slug parameter
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = {
    title: 'Sample Blog Post Title',
    content: 'This is where the blog post content would appear...\n\nIt would be properly formatted with paragraphs, headings, and other elements.',
    author: 'AI Assistant',
    createdAt: '2023-10-30'
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        Published on {post.createdAt} by {post.author}
      </div>
      
      <BlogContent content={post.content} />
    </article>
  )
}