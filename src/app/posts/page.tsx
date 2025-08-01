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

// Fallback data for when JSON server is not available
const fallbackPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Next.js and ISR",
    content: "This is a sample post to demonstrate ISR with JSON Server. Incremental Static Regeneration allows you to update static content after deployment without rebuilding your entire site.",
    date: "August 1, 2024",
    slug: "getting-started-nextjs-isr",
    category: "Tutorial",
    tags: ["Next.js", "ISR", "JSON Server"],
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Building Dynamic Applications with Static Benefits",
    content: "Learn how to combine the benefits of static site generation with dynamic content updates using ISR. This approach gives you the best of both worlds.",
    date: "August 1, 2024",
    slug: "dynamic-static-applications",
    category: "Architecture",
    tags: ["Performance", "Architecture", "Web Development"],
    readTime: "5 min read"
  }
];

async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch('http://localhost:3001/api/posts', {
      next: { revalidate: 60 } // ISR - revalidate every 60 seconds
    });
    
    if (!res.ok) {
      return fallbackPosts;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching posts, using fallback:', error);
    return fallbackPosts;
  }
}

export default async function PostsPage() {
  const posts = await getAllPosts();

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