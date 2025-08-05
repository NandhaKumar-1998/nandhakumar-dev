# Next.js Blog with Cloudflare Workers & D1

This is a dynamic Next.js blog application that runs on Cloudflare Workers with D1 Database for real-time content updates.

## Features

- **Dynamic Content**: Posts are fetched from Cloudflare D1 database
- **Real-time Updates**: Changes reflect immediately without rebuilds
- **Edge Runtime**: Fast global performance via Cloudflare Workers
- **Fallback Content**: Graceful fallback to static content if database is unavailable

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
```

## Deployment to Cloudflare Workers

### Prerequisites

1. **Cloudflare Account**: Create account at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Authentication**: Login to Cloudflare
   ```bash
   wrangler login
   ```

### Database Setup

1. **Create D1 Database**:
   ```bash
   wrangler d1 create posts-db
   ```

2. **Update wrangler.toml**: Replace `your-database-id-will-be-here` with your actual database ID

3. **Create Database Schema**:
   ```bash
   wrangler d1 execute posts-db --local --file=./migrations/schema.sql
   wrangler d1 execute posts-db --file=./migrations/schema.sql
   ```

### Deploy to Cloudflare

1. **Build Application**:
   ```bash
   npm run build
   npx @cloudflare/next-on-pages
   ```

2. **Deploy**:
   ```bash
   wrangler pages deploy .vercel/output/static
   ```

## How Dynamic Updates Work

### Traditional ISR vs Our Approach

- **Traditional ISR**: Requires Node.js runtime, revalidates on schedule
- **Our Approach**: Real-time database queries on Cloudflare Workers

### Data Flow

1. **Add Post**: Use `/api/add-post` endpoint to add new posts to D1
2. **Immediate Reflection**: Changes appear instantly on deployed site
3. **No Revalidation Needed**: Fresh data fetched on every request via Workers

### API Usage

**Add a new post**:
```bash
curl -X POST https://your-site.pages.dev/api/add-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Post",
    "content": "Post content here",
    "category": "Tutorial",
    "tags": ["next.js", "cloudflare"]
  }'
```

## Architecture

- **Frontend**: Next.js with static generation for build-time pages
- **Backend**: Cloudflare Workers Functions for API endpoints
- **Database**: Cloudflare D1 for post storage
- **Deployment**: Cloudflare Pages with Workers integration

## File Structure

```
├── functions/          # Cloudflare Workers Functions
│   └── api/
│       └── posts.ts   # Main API endpoint
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── add-post/route.ts  # Next.js API route
│   │   ├── posts/     # Blog pages
│   │   └── page.tsx   # Home page
│   └── middleware.ts  # Request middleware
├── migrations/        # Database migrations
├── wrangler.toml     # Cloudflare configuration
└── next.config.ts    # Next.js configuration
```

## Environment Variables

No environment variables needed - configuration is handled through wrangler.toml and D1 bindings.

## Troubleshooting

1. **Build Issues**: Ensure `@cloudflare/next-on-pages` is installed
2. **Database Errors**: Verify D1 database ID in wrangler.toml
3. **Deployment Fails**: Check Wrangler authentication with `wrangler whoami`
