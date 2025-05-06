import BlogCard from '@/components/BlogCard'

export default function BlogListPage() {
  // In a real app, this would be fetched from an API or database
  const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn the basics of Next.js and how to create a new project...',
      createdAt: '2023-10-15'
    },
    {
      id: '2',
      title: 'Tailwind CSS Best Practices',
      excerpt: 'Discover how to efficiently use Tailwind CSS in your projects...',
      createdAt: '2023-10-20'
    },
    {
      id: '3',
      title: 'AI in Web Development',
      excerpt: 'Explore how AI is changing the landscape of web development...',
      createdAt: '2023-10-25'
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}