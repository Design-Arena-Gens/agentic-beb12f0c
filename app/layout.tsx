import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SEO Optimize AI Agent',
  description: 'Analyze and optimize your pages for SEO with actionable insights.',
  metadataBase: new URL('https://agentic-beb12f0c.vercel.app'),
  applicationName: 'SEO Optimize AI Agent',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'SEO Optimize AI Agent',
    description: 'Audit pages, fix issues, and generate optimized meta tags.',
    url: 'https://agentic-beb12f0c.vercel.app',
    siteName: 'SEO Optimize AI Agent',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Optimize AI Agent',
    description: 'Audit pages, fix issues, and generate optimized meta tags.'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
