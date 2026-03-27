import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Analytics } from "@vercel/analytics/react";
import "../index.css";
import "../App.css";
import "../components/CommandPreview.css";
import "../components/Footer.css";
import "../components/FormEngine.css";
import "../components/GeneratorCard.css";
import "../components/Navbar.css";
import "../pages/GeneratorDetail.css";
import "../pages/GeneratorsList.css";
import "../pages/Home.css";
import "../pages/Learning.css";
import "../pages/WordlistGenerator.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Kali Linux Command Generator - Free Online Pentesting Tool',
  description: 'Free Kali Linux command generator for penetration testing. Generate Nmap, SQLMap, Hydra, Metasploit, Hashcat, reverse shell and other Kali Linux commands instantly. No signup required.',
  keywords: 'kali linux command generator, kali linux commands, pentesting tools online, cyber security tools, nmap generator, reverse shell generator',
  metadataBase: new URL('https://commandslab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CommandsLab - Kali Linux Command Generator',
    description: 'Generate complex Kali Linux penetration testing commands instantly.',
    url: 'https://commandslab.com',
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
    title: 'CommandsLab - Kali Linux Command Generator',
    description: 'Generate complex Kali Linux penetration testing commands instantly.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
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
