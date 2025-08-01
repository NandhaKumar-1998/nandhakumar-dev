# JSON Server with ISR Implementation Guide

This project demonstrates a complete implementation of **JSON Server** as a mock backend API with **Next.js ISR (Incremental Static Regeneration)** for optimal performance and dynamic content updates.

## Architecture Overview

```
┌─────────────────┐    fetch()     ┌─────────────────┐
│   Next.js App   │ ──────────────► │   JSON Server   │
│  (Port 3000)    │                │   (Port 3001)   │
│                 │                │                 │
│ • ISR Pages     │                │ • REST API      │
│ • Fallback data │                │ • Route mapping │
│ • 60s revalidate│                │ • File watching │
└─────────────────┘                └─────────────────┘
```

## Quick Start

### Option 1: Using Node.js Scripts (Recommended for Windows)
```bash
npm run dev:all
# or
npm run dev:servers
```

### Option 2: Manual (Two terminals)
```bash
# Terminal 1: JSON Server
node node_modules/json-server/lib/cli/bin.js --watch db.json --port 3001 --routes routes.json

# Terminal 2: Next.js
npm run dev
```

## Implementation Details

### 1. JSON Server Configuration

#### `db.json` - Data Source
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with Next.js and ISR",
      "content": "Full content here...",
      "date": "August 1, 2024",
      "slug": "getting-started-nextjs-isr",
      "category": "Tutorial",
      "tags": ["Next.js", "ISR", "JSON Server"],
      "readTime": "3 min read"
    }
  ]
}
```

#### `routes.json` - API Route Mapping
```json
{
  "/api/*": "/$1"
}
```
This maps `/api/posts` → `/posts` for cleaner API endpoints.

#### Available Endpoints
- **GET** `http://localhost:3001/api/posts` - All posts
- **GET** `http://localhost:3001/api/posts?slug=post-slug` - Single post by slug
- **POST** `http://localhost:3001/api/posts` - Add new post

### 2. Next.js ISR Implementation

#### ISR Configuration in Pages
```typescript
// In page components
const res = await fetch('http://localhost:3001/api/posts', {
  next: { revalidate: 60 } // ISR - revalidate every 60 seconds
});
```

#### Pages with ISR Enabled
1. **Home Page** (`src/app/page.tsx`)
   - Fetches and displays all posts
   - Shows JSON Server status
   - Includes testing instructions

2. **Posts Listing** (`src/app/posts/page.tsx`)
   - Lists all posts with pagination-ready structure
   - Full ISR implementation

3. **Post Detail** (`src/app/posts/[slug]/page.tsx`)
   - Dynamic routes with ISR
   - `generateStaticParams()` for pre-generation
   - Individual post fetching by slug

### 3. How ISR Works in This Setup

#### The Stale-While-Revalidate Strategy

```
Time 0:     Page generated with fresh data from JSON Server
Time 30s:   User visits → Gets cached version (fast)
Time 70s:   User visits → Gets cached version + triggers background regeneration
Time 71s:   User visits → Gets newly regenerated version with updated data
```

#### ISR Flow Diagram
```
┌─────────────────┐
│ User Request    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐     Yes    ┌─────────────────┐
│ Page > 60s old? │ ─────────► │ Serve stale +   │
└─────────────────┘            │ Regenerate in   │
          │                    │ background      │
          │ No                 └─────────────────┘
          ▼                              │
┌─────────────────┐                      │
│ Serve cached    │                      │
│ version         │                      ▼
└─────────────────┘            ┌─────────────────┐
                               │ Next request    │
                               │ gets fresh data │
                               └─────────────────┘
```

### 4. Fallback System

Each page includes fallback data for when JSON Server is unavailable:

```typescript
const fallbackPosts: Post[] = [
  // Static fallback data
];

async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch('http://localhost:3001/api/posts', {
      next: { revalidate: 60 }
    });
    return res.ok ? res.json() : fallbackPosts;
  } catch (error) {
    console.error('Using fallback data:', error);
    return fallbackPosts;
  }
}
```

## Testing ISR Functionality

### 1. Basic ISR Test
1. Start both servers: `npm run dev:all`
2. Visit http://localhost:3000
3. Note the current post data
4. Edit `db.json` (change a title, date, or content)
5. Wait 60+ seconds
6. Refresh the page → Still see old data
7. Refresh again immediately → See updated data

### 2. JSON Server Status Check
- **JSON Server Home**: http://localhost:3001
- **API Endpoint**: http://localhost:3001/api/posts
- **Status on Homepage**: Green checkmark shows server status

### 3. Adding New Posts
Use the API endpoint to test dynamic updates:
```bash
curl -X POST http://localhost:3000/api/add-post \
  -H "Content-Type: application/json" \
  -d '{"title": "ISR Test Post", "content": "Testing ISR functionality"}'
```

## File Structure

```
├── db.json                          # JSON Server database
├── routes.json                      # API route mappings  
├── dev-servers.mjs                  # Server startup script
├── run-servers.mjs                  # Alternative startup script
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page with ISR
│   │   ├── posts/
│   │   │   ├── page.tsx             # Posts listing with ISR
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Post detail with ISR
│   │   └── api/
│   │       └── add-post/
│   │           └── route.ts         # API route for testing
```

## Configuration Settings

| Setting | Value | Location |
|---------|-------|----------|
| JSON Server Port | 3001 | Command line args |
| Next.js Port | 3000 | Default |
| ISR Revalidation | 60 seconds | Page components |
| Route Prefix | `/api/*` | `routes.json` |
| Fallback Mode | Enabled | All fetch functions |

## Production Considerations

### For Production Deployment:

1. **Replace JSON Server** with a real database (PostgreSQL, MongoDB, etc.)
2. **Update fetch URLs** to use environment variables:
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   ```
3. **Adjust ISR timing** based on your content update frequency
4. **Add error boundaries** for better error handling
5. **Implement caching strategies** at the database level

### Environment Variables (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
REVALIDATE_TIME=300  # 5 minutes for production
```

## Key Benefits of This Implementation

✅ **Performance**: Static pages served instantly  
✅ **SEO Friendly**: Pre-rendered content for search engines  
✅ **Dynamic Updates**: Content updates without rebuilding  
✅ **Resilient**: Works with fallback data when API is down  
✅ **Developer Friendly**: Easy testing and development workflow  

## Troubleshooting

### Common Issues:

1. **404 errors**: Ensure post slugs in db.json match URL paths
2. **JSON Server not starting**: Check if port 3001 is available
3. **ISR not working**: Verify `next: { revalidate: 60 }` in fetch calls
4. **Changes not appearing**: Remember the two-refresh rule for ISR

### Debug Commands:
```bash
# Check if JSON Server is running
curl http://localhost:3001/api/posts

# Check Next.js build
npm run build

# Test ISR in production mode
npm run build && npm start
```

This implementation provides a robust foundation for understanding and working with ISR and JSON Server integration.