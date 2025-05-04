# Personal Blog with Next.js

A modern, fast, and SEO-friendly personal blog built with Next.js, Markdown, and Tailwind CSS.

## Features

- 📝 Write posts in Markdown
- 🎨 Beautiful and responsive design
- 🌓 Dark mode support
- 🔍 SEO optimized
- 📱 Mobile-friendly
- 🚀 Static site generation (SSG)
- 🏷️ Category-based organization
- ⚡ Fast page loads
- 💅 Styled with Tailwind CSS and shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Writing Content

### Creating Posts

1. Create a new Markdown file in the `content/blog` directory
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2024-03-15"
excerpt: "A brief description of your post"
categories: ["Technology", "Web Development"]
coverImage: "https://your-image-url.jpg"
---

Your post content here...
```

### Frontmatter Fields

- `title` (required): The title of your post
- `date` (required): Publication date (YYYY-MM-DD)
- `excerpt` (required): A short description of your post
- `categories` (optional): Array of categories
- `coverImage` (optional): URL of the cover image

## Building for Production

To create a production build:

```bash
pnpm build
```

The static files will be generated in the `out` directory.

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── content/
│   └── blog/           # Markdown blog posts
├── lib/                # Utility functions
└── public/             # Static assets
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [remark](https://github.com/remarkjs/remark)

## License

MIT