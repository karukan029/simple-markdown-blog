'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <Pencil className="h-6 w-6" />
            <span className="inline-block font-bold">My Blog</span>
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1",
                  isActive(item.href) && "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}