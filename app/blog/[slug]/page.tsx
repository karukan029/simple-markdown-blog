import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata, PageProps } from 'next';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

type PostPageProps = {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist',
    };
  }
  
  return {
    title: `${post.title} | My Personal Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="container max-w-4xl py-6 lg:py-12">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.categories?.map((category) => (
            <Link key={category} href={`/categories/${category.toLowerCase()}`}>
              <Badge variant="secondary" className="transition-colors hover:bg-secondary/80">
                {category}
              </Badge>
            </Link>
          ))}
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-col gap-2 text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            <Icons.calendar className="h-4 w-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-1">
            <Icons.clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
      
      {post.coverImage && (
        <div className="my-8 overflow-hidden rounded-md border border-border">
          <div className="relative aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      )}
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      <Separator className="my-8" />
      
      <div className="flex justify-between">
        <Link href="/blog">
          <Button variant="outline" className="group">
            <Icons.chevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all posts
          </Button>
        </Link>
        <Button variant="ghost">
          <Icons.bookmark className="mr-2 h-4 w-4" />
          Bookmark
        </Button>
      </div>
    </article>
  );
}