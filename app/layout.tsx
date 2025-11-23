import './globals.css';
import type { Metadata } from 'next/';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avatrr - Professional Portfolio & AI Twin Platform',
  description: 'Create ATS-optimized resumes, stunning portfolios, AI digital twins, and winning proposals. Your complete professional toolkit.',
  keywords: 'resume builder, portfolio, AI digital twin, job search, proposals, ATS optimization',
  authors: [{ name: 'Avatrr Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  openGraph: {
    title: 'Avatrr - Professional Portfolio & AI Twin Platform',
    description: 'Build your digital presence with AI-powered tools for career success.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avatrr - Professional Portfolio & AI Twin Platform',
    description: 'Build your digital presence with AI-powered tools for career success.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-inter antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}