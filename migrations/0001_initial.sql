-- Initial migration for posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'General',
  tags TEXT DEFAULT '[]', -- Stored as JSON string
  readTime TEXT DEFAULT '3 min read',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Insert sample data (matching your existing db.json)
INSERT OR IGNORE INTO posts (id, title, content, date, slug, category, tags, readTime) VALUES 
(1, 'Getting Started with Next.js and ISR', 'Incremental Static Regeneration (ISR) is a powerful feature in Next.js that combines the benefits of static generation with the flexibility of server-side rendering. With ISR, you can create or update static pages after you''ve built your site, without needing to rebuild the entire application.

## What is ISR?

ISR allows you to use static generation on a per-page basis, with a fallback that can show a loading state while the page is being generated. This means you can have the performance benefits of static sites while still being able to update content dynamically.

## Key Benefits

1. **Performance**: Pages are served from a CDN for fast loading times
2. **Scalability**: Can handle sudden traffic spikes without overloading your server
3. **SEO**: Pages are pre-rendered, making them easily crawlable by search engines
4. **Flexibility**: Content can be updated without rebuilding the entire site

## How to Implement ISR

In your Next.js page, you can use the `revalidate` property in `getStaticProps`:

```javascript
export async function getStaticProps() {
  const data = await fetch(''https://api.example.com/data'');
  
  return {
    props: {
      data,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
```

This tells Next.js to attempt to regenerate the page when a request comes in, at most once every 60 seconds.

## Best Practices

- Choose appropriate revalidation times based on how often your content changes
- Use fallback pages for dynamic routes
- Monitor your build times and optimize accordingly
- Consider using on-demand revalidation for immediate updates

ISR is particularly useful for e-commerce sites, blogs, and any application where you want the performance of static sites with the ability to update content regularly.', 'August 1, 2024', 'getting-started-nextjs-isr', 'Tutorial', '["Next.js", "ISR", "JSON Server"]', '3 min read'),

(2, 'Building Dynamic Applications with Static Architecture', 'Modern web development often presents us with a choice: build a fast, static site or a dynamic, interactive application. But what if we didn''t have to choose? What if we could have both?

## The Challenge

Traditional approaches force developers to make trade-offs:

- **Static Sites**: Fast, SEO-friendly, but limited interactivity
- **SPAs**: Highly interactive, but poor initial load times and SEO challenges
- **SSR**: Good balance, but complex caching and server requirements

## The Solution: Hybrid Architecture

By combining static generation with strategic dynamic elements, we can create applications that are:

1. **Fast**: Static assets served from CDN
2. **Interactive**: Client-side hydration for dynamic features
3. **SEO-Friendly**: Pre-rendered content for search engines
4. **Scalable**: Minimal server requirements

## Implementation Strategy

### 1. Identify What Should Be Static

- Marketing pages
- Blog content
- Product catalogs
- Documentation

### 2. Identify What Should Be Dynamic

- User dashboards
- Real-time data
- Personalized content
- Interactive features

### 3. Use the Right Tools

```javascript
// Static generation for content
export async function getStaticProps() {
  const posts = await cms.getPosts();
  return {
    props: { posts },
    revalidate: 3600 // Regenerate hourly
  };
}

// Client-side fetching for dynamic data
function UserDashboard() {
  const { data } = useSWR(''/api/user'', fetcher);
  return <div>{/* Dynamic content */}</div>;
}
```

### 4. Progressive Enhancement

Start with a fully functional static site, then layer on dynamic features:

- Static HTML works without JavaScript
- JavaScript enhances the experience
- Graceful degradation for slower connections

## Real-World Benefits

Companies using this approach report:

- **50-90% faster load times**
- **Improved SEO rankings**
- **Better user experience**
- **Reduced server costs**
- **Easier deployments**

## Tools and Technologies

- **Frameworks**: Next.js, Nuxt.js, SvelteKit
- **Build Tools**: Webpack, Vite, Parcel
- **Deployment**: Vercel, Netlify, CloudFlare Pages
- **Data Fetching**: SWR, React Query, Apollo Client

## Conclusion

The future of web development isn''t about choosing between static and dynamic—it''s about intelligently combining both approaches to create applications that are fast, scalable, and provide excellent user experiences.

By embracing this hybrid architecture, developers can build applications that perform like static sites but feel like dynamic applications.', 'July 30, 2024', 'dynamic-static-applications', 'Architecture', '["Architecture", "Performance", "Static Sites", "SSG"]', '5 min read');

-- Update trigger to automatically update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_posts_updated_at 
  AFTER UPDATE ON posts 
  FOR EACH ROW 
BEGIN 
  UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
END;