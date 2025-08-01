import HomePage from '../components/HomePage';

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

export default async function Home() {
  const posts = await getAllPosts();
  return <HomePage posts={posts} />;
}