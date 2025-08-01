import Link from 'next/link';
import { notFound } from 'next/navigation';

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

async function getPost(slug: string): Promise<Post | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/api/posts?slug=${slug}`, {
      next: { revalidate: 60 } // ISR - revalidate every 60 seconds
    });
    
    if (!res.ok) {
      // Fallback to static data
      return fallbackPosts.find(p => p.slug === slug) || null;
    }
    
    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post, using fallback:', error);
    // Fallback to static data
    return fallbackPosts.find(p => p.slug === slug) || null;
  }
}

async function getAllPosts(): Promise<Post[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/api/posts`, {
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

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
        <article className="bg-white rounded-xl p-8 shadow-md">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Blog
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 text-sm space-x-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  #{tag.toLowerCase().replace(' ', '')}
                </span>
              ))}
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line leading-relaxed text-gray-700">
              {post.content}
            </div>
          </div>

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Share this article:
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Twitter</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Facebook</a>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(await getAllPosts()).filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/posts/${relatedPost.slug}`}>
                <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-3">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{relatedPost.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{relatedPost.date} • {relatedPost.readTime}</p>
                  <div className="flex flex-wrap gap-1">
                    {relatedPost.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                        #{tag.toLowerCase().replace(' ', '')}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p>&copy; 2024 Marketing Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}