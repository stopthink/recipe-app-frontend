import Link from 'next/link';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Save and view great recipes from all over the web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="flex container justify-between mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">
                <Link href="/">Recipe App</Link>
              </h1>
              <Button asChild>
                <Link href="/recipes/new">
                  <CirclePlus />
                  Add Recipe
                </Link>
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
