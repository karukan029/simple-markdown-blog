import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  categories?: string[];
  readingTime: number;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

// Utility function to estimate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all post files
export async function getPostFiles(): Promise<string[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    
    // Create sample post if directory is empty
    const samplePost = path.join(postsDirectory, 'hello-world.md');
    const sampleContent = `---
title: "Hello World: Getting Started with My Blog"
date: "${new Date().toISOString().slice(0, 10)}"
excerpt: "Welcome to my new blog! In this first post, I'll share my journey and what you can expect to find here."
categories: ["Introduction", "Personal"]
coverImage: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg"
---

# Hello World!

Welcome to my new blog. This is a place where I'll be sharing my thoughts, experiences, and knowledge about various topics including technology, design, and personal growth.

## What to Expect

In this blog, you can expect:

- **Technical tutorials and guides**
- **Design insights and trends**
- **Personal stories and reflections**
- **Reviews of books, tools, and technologies**

## Code Example

Here's a simple JavaScript function that prints "Hello, World!":

\`\`\`javascript
function sayHello() {
  console.log("Hello, World!");
}

sayHello();
\`\`\`

## Stay Connected

Make sure to subscribe to stay updated with new content. You can also follow me on social media for more updates and interactions.

Thanks for reading, and I look forward to sharing more with you soon!
`;
    fs.writeFileSync(samplePost, sampleContent);
    
    // Create another sample post
    const secondPost = path.join(postsDirectory, 'getting-started-with-nextjs.md');
    const secondPostContent = `---
title: "Getting Started with Next.js: A Comprehensive Guide"
date: "${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}"
excerpt: "Learn how to build modern web applications with Next.js, from setup to deployment."
categories: ["Technology", "Web Development"]
coverImage: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg"
---

# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's a powerful tool for building modern web applications.

## Setting Up a Next.js Project

Getting started with Next.js is easy:

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

## Key Features

- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **API Routes**
- **File-Based Routing**
- **Built-in CSS and Sass Support**

## Building Your First Component

Here's a simple Next.js component:

\`\`\`jsx
// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <main>
        <h1>Welcome to Next.js!</h1>
      </main>
    </div>
  )
}
\`\`\`

## Deployment

Next.js applications can be easily deployed on Vercel, Netlify, or any other hosting platform that supports Node.js.

Stay tuned for more in-depth tutorials on Next.js features!
`;
    fs.writeFileSync(secondPost, secondPostContent);
    
    // Create a third sample post
    const thirdPost = path.join(postsDirectory, 'minimalist-design-principles.md');
    const thirdPostContent = `---
title: "Minimalist Design Principles for Modern Websites"
date: "${new Date(Date.now() - 172800000).toISOString().slice(0, 10)}"
excerpt: "Explore the key principles of minimalist design and how to apply them to create clean, effective websites."
categories: ["Design", "Web Development"]
coverImage: "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg"
---

# Minimalist Design Principles for Modern Websites

Minimalism in web design is more than just an aesthetic choice—it's a functional approach that enhances user experience by removing unnecessary elements and focusing on what truly matters.

## Core Principles of Minimalist Design

### 1. Simplicity

Keep interfaces clean and straightforward. Remove unnecessary elements and focus on what's essential.

### 2. White Space

Don't be afraid of empty space. It helps create balance and draws attention to important elements.

### 3. Typography

Choose readable fonts and establish a clear hierarchy with a limited number of font sizes.

### 4. Limited Color Palette

Use a restricted color palette with 2-3 primary colors and accent colors for highlighting important elements.

## Example CSS for Minimalist Design

\`\`\`css
/* Example of minimalist styling */
body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1, h2, h3 {
  font-weight: 700;
  line-height: 1.2;
}

button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 0.9;
}
\`\`\`

## Examples of Minimalist Websites

Some excellent examples of minimalist design include:

- Apple.com
- Google.com
- Dropbox.com

Remember, minimalism is not about making a boring design—it's about making intentional choices that enhance user experience and focus.

What are your favorite examples of minimalist design? Share in the comments below!
`;
    fs.writeFileSync(thirdPost, thirdPostContent);
  }
  
  try {
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Get all posts with metadata
export async function getAllPosts(): Promise<Post[]> {
  const fileNames = await getPostFiles();
  
  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const post = await getPostBySlug(slug);
      return post;
    })
  );
  
  // Sort posts by date in descending order
  return allPosts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// Get a specific post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process the markdown content to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    
    const contentHtml = processedContent.toString();
    
    // Calculate reading time
    const readingTime = calculateReadingTime(content);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      content: contentHtml,
      categories: data.categories || [],
      readingTime,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

// Get all categories with post counts
export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts();
  
  const categoriesMap = new Map<string, number>();
  
  posts.forEach((post) => {
    post.categories?.forEach((category) => {
      const count = categoriesMap.get(category) || 0;
      categoriesMap.set(category, count + 1);
    });
  });
  
  const categories: Category[] = Array.from(categoriesMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase(),
    count,
  }));
  
  return categories.sort((a, b) => b.count - a.count);
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  
  return allPosts.filter((post) => 
    post.categories?.some((category) => category.toLowerCase() === categorySlug)
  );
}