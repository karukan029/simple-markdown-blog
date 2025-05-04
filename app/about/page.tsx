import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About | My Personal Blog',
  description: 'Learn more about me and my blog',
};

export default function AboutPage() {
  return (
    <div className="container max-w-6xl py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg"
                alt="Profile Picture"
                width={600}
                height={800}
                className="aspect-[3/4] object-cover"
              />
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <Link href="https://twitter.com">
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Icons.twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Icons.github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com">
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Icons.linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            About Me
          </h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed">
              Hello! I'm a passionate web developer and designer with a love for creating
              beautiful, functional websites and sharing knowledge through writing.
            </p>
            <p className="leading-relaxed">
              With over 5 years of experience in the tech industry, I've worked on various
              projects ranging from small business websites to large-scale web applications.
              My expertise includes React, Next.js, TypeScript, and modern design systems.
            </p>
            <p className="leading-relaxed">
              This blog is my space to share what I've learned along the way, explore new
              ideas, and connect with like-minded individuals who share my passion for
              technology and design.
            </p>
            <h2 className="text-2xl font-bold">Why I Write</h2>
            <p className="leading-relaxed">
              Writing is my way of organizing thoughts, solidifying knowledge, and giving
              back to the community that has taught me so much. I believe in the power of
              sharing knowledge and experiences to help others on their journey.
            </p>
            <p className="leading-relaxed">
              On this blog, you'll find articles about web development, design principles,
              productivity tips, and occasional personal reflections on life in the tech
              industry.
            </p>
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="leading-relaxed">
              I love connecting with readers and fellow developers. Feel free to reach out
              through social media or email if you have questions, suggestions, or just
              want to say hello!
            </p>
          </div>
          
          <Separator className="my-8" />
          
          <h2 className="mb-4 text-2xl font-bold">My Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Frontend Development</h3>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </Card>
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Backend Development</h3>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>REST APIs</li>
              </ul>
            </Card>
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Design</h3>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>UI/UX Design</li>
                <li>Figma</li>
                <li>Design Systems</li>
                <li>Animation</li>
              </ul>
            </Card>
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Other</h3>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>Git & GitHub</li>
                <li>CI/CD</li>
                <li>Performance Optimization</li>
                <li>Technical Writing</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}