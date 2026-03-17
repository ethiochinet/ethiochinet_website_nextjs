'use client';  // <-- Add this at the very top

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import "./globals.css";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethiochinet - Ethiopia's Digital Logistics Platform",
  description: "Connect with verified drivers, post freight, and track deliveries in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LocaleProvider>
          {!isAdminRoute && <Header />}
          <main className={!isAdminRoute ? "min-h-screen" : ""}>
            {children}
          </main>
          {!isAdminRoute && <Footer />}
          <Toaster position="top-right" richColors closeButton />
        </LocaleProvider>
      </body>
    </html>
  );
}