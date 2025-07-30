import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import './globals.css';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'A marketplace for handcrafted artisan goods',
  keywords: ['handcrafted', 'artisan', 'marketplace', 'handmade', 'crafts'],
  authors: [{ name: 'Handcrafted Haven Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <div className="app-container">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
