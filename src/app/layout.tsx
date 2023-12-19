import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';
import { FC, ReactNode } from 'react';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boorista - a coffee journal app',
  description: 'Developed with love and lots of coffee by Jasmin 🐠',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${lexend.className} tracking-wide text-[var(--brown-primary)] antialiased`}>
        <Navigation />
        <main className="min-h-screen px-10 pt-36 lg:pl-80 lg:pr-16 lg:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
