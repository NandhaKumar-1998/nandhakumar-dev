'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  slug: string;
  category: string;
  tags: string[];
  readTime: string;
  image?: string;
}

// Convert recipe to post format
const recipeToPost = (recipe: Recipe): Post => ({
  id: recipe.id,
  title: recipe.name,
  content: `A delicious ${recipe.cuisine} recipe that serves ${recipe.servings} people. Difficulty: ${recipe.difficulty}. 

Ingredients:
${recipe.ingredients.map(ing => `• ${ing}`).join('\n')}

Instructions:
${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}`,
  date: "Recipe Collection",
  slug: recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
  category: recipe.cuisine,
  tags: recipe.tags,
  readTime: `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min cook`,
  image: recipe.image
});

// Fallback data for when external API is not available
const fallbackPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Next.js and External APIs",
    content: "This is a sample post to demonstrate client-side fetching with external APIs. This approach combines static generation with dynamic content updates.",
    date: "August 1, 2024",
    slug: "getting-started-nextjs-external-apis",
    category: "Tutorial",
    tags: ["Next.js", "API", "Client-Side"],
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Building Dynamic Applications with Static Benefits",
    content: "Learn how to combine the benefits of static site generation with dynamic content updates using client-side fetching. This approach gives you the best of both worlds.",
    date: "August 1, 2024",
    slug: "dynamic-static-applications",
    category: "Architecture",
    tags: ["Performance", "Architecture", "Web Development"],
    readTime: "5 min read"
  }
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch fresh data from external API
    const fetchPosts = async () => {
      try {
        // Fetch recipes from DummyJSON API
        const response = await fetch('https://dummyjson.com/recipes');
        if (response.ok) {
          const recipeData = await response.json() as RecipeResponse;
          const posts = recipeData.recipes.map(recipeToPost);
          setPosts(posts);
        }
      } catch (error) {
        console.log('Using fallback posts:', error);
        // Keep fallback posts if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading fresh posts...</p>
          </div>
        )}
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                {post.image && (
                  <div className="mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
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
                      #{tag.toLowerCase().replace(/\s+/g, '')}
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