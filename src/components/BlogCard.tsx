import Link from 'next/link'

type BlogPost = {
  id: string
  title: string
  excerpt: string
  createdAt: string
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-3">{post.excerpt}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{post.createdAt}</span>
        <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
          Read more
        </Link>
      </div>
    </div>
  )
}