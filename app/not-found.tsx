import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-15rem)] flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Page not found</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}