#!/bin/bash
set -e

echo "Building Next.js application..."
NODE_ENV=production CF_PAGES=1 pnpm build

echo "Building for Cloudflare Pages..."
pnpm pages:build

echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy .vercel/output/static --project-name=simple-markdown-blog-pages
