import BlogGenerator from '@/components/BlogGenerator'
import BlogCard from '@/components/BlogCard'

// The ProjectsPage function renders the main page content, including:
// - A header introducing the AI-powered blog generation feature.
// - A BlogGenerator component for generating blog posts dynamically.
// - A section displaying featured blog posts using the BlogCard component.
export default function ProjectsPage() {
  /*
  Test
  */ // Renamed from Home to ProjectsPage
  const featuredPosts = [
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
    }
  ]

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Blog Generation</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Create professional blog posts with the power of AI. Just enter a topic and let our system do the rest.
        </p>
      </section>

      <BlogGenerator />

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}