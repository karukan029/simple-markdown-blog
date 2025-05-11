import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { getAllPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(3, 9);

  return (
    <div className="container max-w-6xl py-8 md:py-12 lg:py-16">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Welcome to My Blog
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Exploring ideas, sharing insights, and documenting my journey through technology,
            design, and life.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/blog">
            <Button size="lg" className="group">
              Read all posts
              <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="ghost">
              About me
            </Button>
          </Link>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Posts</h2>
          <p className="mt-2 text-muted-foreground">
            A selection of my best and most popular articles.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-colors hover:border-primary">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {post.categories?.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
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
      </section>

      <Separator className="my-8" />

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Recent Posts</h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with my latest articles and insights.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader className="p-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {post.categories?.slice(0, 1).map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
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
        <div className="flex justify-center">
          <Link href="/blog">
            <Button variant="outline" size="lg" className="group">
              View all posts
              <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}