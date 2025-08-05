'use client';

import { useState, useEffect } from 'react';
import HomePage from '../components/HomePage';

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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    // Fetch fresh data from DummyJSON API
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
      }
    };

    fetchPosts();
  }, []);

  return <HomePage posts={posts} />;
}