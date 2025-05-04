import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { getAllCategories, getPostsByCategory } from '@/lib/blog';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} | My Personal Blog`,
    description: `Browse all posts in the ${categoryName} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const posts = await getPostsByCategory(category);
  
  if (!posts.length) {
    notFound();
  }
  
  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            {categoryName}
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse all posts in the {categoryName} category.
          </p>
        </div>
        <Link href="/categories">
          <Button variant="outline">
            All Categories
          </Button>
        </Link>
      </div>
      
      <Separator className="my-8" />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden transition-colors hover:border-primary">
              {post.coverImage && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="p-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {post.categories?.map((cat) => (
                      <Badge 
                        key={cat} 
                        variant={cat.toLowerCase() === category ? "default" : "secondary"}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="line-clamp-2 text-xl font-bold">{post.title}</h2>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icons.calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}