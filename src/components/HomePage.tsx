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

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Marketing Insights</h1>
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
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-16">
            <h2 className="text-4xl font-bold mb-4">Next.js ISR with JSON Server Demo</h2>
            <p className="text-xl opacity-90 mb-4">Experience the power of Incremental Static Regeneration</p>
            <p className="text-lg opacity-80">Posts are fetched from JSON Server and updated every 60 seconds</p>
          </div>
        </section>

        {/* JSON Server Status */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">JSON Server Status</h3>
          <p className="text-blue-800">
            Check if JSON Server is running: 
            <a href="http://localhost:3001/api/posts" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-blue-600">
              http://localhost:3001/api/posts
            </a>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            {posts.length > 0 ? `✅ Currently showing ${posts.length} posts` : '❌ No posts found'}
          </p>
        </section>

        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h3>
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.content.substring(0, 200)}...
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    #{tag.toLowerCase().replace(' ', '')}
                  </span>
                ))}
              </div>
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More
              </Link>
            </article>
          ))}
        </section>

        {/* Instructions */}
        {/* <section className="mt-16 bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Test ISR</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Make sure both servers are running with <code className="bg-gray-200 px-2 py-1 rounded">npm run dev:all</code></li>
            <li>Visit the JSON Server at <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://localhost:3001</a></li>
            <li>Edit the <code className="bg-gray-200 px-2 py-1 rounded">db.json</code> file to add/modify posts</li>
            <li>Refresh this page after 60 seconds to see the updates</li>
          </ol>
        </section> */}
      </main>

      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p>&copy; 2024 Next.js ISR Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}