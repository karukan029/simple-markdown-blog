#!/bin/bash
set -e

echo "Creating Pages project if it doesn't exist..."
npx wrangler pages project create simple-markdown-blog-pages --production-branch=main || true

# Build the Next.js application
echo "Building Next.js application..."
pnpm build

# Build for Cloudflare Pages
echo "Building for Cloudflare Pages..."
pnpm pages:build

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy .vercel/output/static --project-name=simple-markdown-blog-pages

echo "Deployment complete!"