import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Analytics } from "@vercel/analytics/react";
import "../index.css";
import "../App.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Kali Linux Command Generator | Free Online Pentesting Tool',
  description: 'Generate complex Kali Linux penetration testing commands instantly for Nmap, SQLMap, Hydra, Metasploit, Hashcat, and reverse shells. Free online pentesting tool.',
  keywords: 'kali linux command generator, pentesting tool, nmap command generator, sqlmap commands, hydra brute force tool, metasploit commands, hashcat commands, reverse shell generator',
  metadataBase: new URL('https://commandslab.vercel.app'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: ['fKk7x7p_-akiLpYsUqDqftkjF_tOl6xh5M1eXjUxV8Q', 'wG3QV9XYf_nUzbUTcPiRkhqWgpvzqVJ-crbLi6d4-k0'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Kali Linux Command Generator | Free Online Pentesting Tool',
    description: 'Generate complex Kali Linux penetration testing commands instantly for Nmap, SQLMap, Hydra, Metasploit, Hashcat, and more. 100% free and private.',
    url: 'https://commandslab.vercel.app',
    siteName: 'CommandsLab',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CommandsLab - Kali Linux Command Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kali Linux Command Generator | Free Online Pentesting Tool',
    description: 'Generate complex Kali Linux penetration testing commands instantly for Nmap, SQLMap, Hydra, Metasploit, Hashcat, and more.',
    images: ['/og-image.png'],
    creator: '@CommandsLab',
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <div className="container">
              <Breadcrumbs />
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
