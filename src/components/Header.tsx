import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-primary">
          BlogGenerate
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}