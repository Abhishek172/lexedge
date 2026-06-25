import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { RegionProvider } from './context/RegionContext';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "LexEdge — India's Corporate Legal Platform",
  description: 'Fixed-fee contract drafting, document review, and corporate legal advisory for startups, MSMEs, and enterprises.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <RegionProvider>
            {children}
          </RegionProvider>
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        </body>
      </html>
    </ClerkProvider>
  );
}