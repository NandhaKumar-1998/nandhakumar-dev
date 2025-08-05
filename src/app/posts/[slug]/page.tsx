import BlogPostClient from './BlogPostClient';

// Server Component - can use generateStaticParams
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}

// Generate static paths for known recipes
export async function generateStaticParams() {
  // For static export, we'll pre-generate some common recipe slugs
  // The actual recipes will be fetched client-side
  return [
    { slug: 'classic-margherita-pizza' },
    { slug: 'vegetable-stir-fry' },
    { slug: 'chocolate-chip-cookies' },
    { slug: 'beef-and-broccoli-stir-fry' },
    { slug: 'chicken-alfredo-pasta' },
    { slug: 'getting-started-nextjs-external-apis' },
    { slug: 'dynamic-static-applications' }
  ];
}

