import 'next';

declare module 'next' {
  // Override the PageProps interface to make params a non-Promise type
  export interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}