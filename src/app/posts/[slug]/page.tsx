import BlogPostClient from './BlogPostClient';

// Server Component - can use generateStaticParams
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}

// Generate static paths for known recipes
export async function generateStaticParams() {
  try {
    // Fetch all recipes to generate all possible slugs
    const response = await fetch('https://dummyjson.com/recipes?limit=50');
    if (response.ok) {
      const data = await response.json() as { recipes: Array<{ name: string }> };
      const recipeSlugs = data.recipes.map((recipe) => ({
        slug: recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
      
      // Add fallback post slugs
      const fallbackSlugs = [
        { slug: 'getting-started-nextjs-external-apis' },
        { slug: 'dynamic-static-applications' }
      ];
      
      return [...recipeSlugs, ...fallbackSlugs];
    }
  } catch (error) {
    console.error('Error fetching recipes for static params:', error);
  }
  
  // Fallback if API fails
  return [
    { slug: 'classic-margherita-pizza' },
    { slug: 'vegetable-stir-fry' },
    { slug: 'chocolate-chip-cookies' },
    { slug: 'brazilian-caipirinha' },
    { slug: 'beef-and-broccoli-stir-fry' },
    { slug: 'chicken-alfredo-pasta' },
    { slug: 'getting-started-nextjs-external-apis' },
    { slug: 'dynamic-static-applications' }
  ];
}

