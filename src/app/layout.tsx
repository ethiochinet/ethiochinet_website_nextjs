import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from './client-layout'; // <-- New client component
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethiochinet - Logistics Service Provider using digital technology in Ethiopia",
  description: "Welcome to the future of Ethiopian logistics. We are a tech-enabled logistics service provider bridging the gap between freight owners and a vast network of verified transporters. Operating throughout the country—from the heart of Addis Ababa to the vital Djibouti-Addis corridor—we use dedicated mobile platforms to connect cargo with registered, high-performing drivers. By replacing manual processes with AI-powered freight matching and real-time tracking, we drastically reduce 'empty backhauls' and slash transit times. Whether you are moving a single container or managing complex national distribution, our platform optimizes every route to save fuel, enhance security, and provide the data-driven insights you need to scale your business.",

   icons: {
    icon: '/favicon.ico', // or '/icon.png', '/logo.svg' - path from public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}