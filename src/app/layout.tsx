import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers/Provider";
import Navbar from "@/Component/Navbar";
import InstallPrompt from "@/Component/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Work Book",
  description: "A personal collection of my projects, notes, and experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>My Work Book</title>
        <meta name="description" content="A personal collection of my projects, notes, and experiments." />
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blur
          min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>

        {/* Floating Install Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <InstallPrompt />
        </div>
      </body>
    </html>
  );
}
