import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  slug: string;
  category: string;
  tags: string[];
  readTime: string;
}

interface PostsListingPageProps {
  posts: Post[];
}

export default function PostsListingPage({ posts }: PostsListingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              Marketing Insights
            </Link>
            <div className="space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/posts" className="text-gray-600 hover:text-blue-600 transition-colors">All Posts</Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Posts</h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{post.date} • {post.readTime}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      #{tag.toLowerCase().replace(' ', '')}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p>&copy; 2024 Marketing Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}