import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getAllCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Categories | My Personal Blog',
  description: 'Browse posts by category',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Categories
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse articles by topic or interest.
          </p>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={`/categories/${category.slug}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.count} {category.count === 1 ? 'post' : 'posts'}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}