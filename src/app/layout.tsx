import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from './client-layout';
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Digital Logistics Service Provider in Ethiopia`,
    template: `%s | Ethiochinet`,
  },
  description:
    "Ethiochinet is a trusted logistics service provider in Ethiopia with three integrated apps — Freight Owner, Driver, and Vehicle Owner. Post freight, track deliveries, and manage your fleet in real-time across Ethiopia.",
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.company, url: baseUrl }],
  creator: siteConfig.company,
  publisher: siteConfig.company,
  category: 'Logistics Technology',
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
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['am_ET'],
    url: baseUrl,
    siteName: siteConfig.company,
    title: `${siteConfig.name} | Logistics Service Provider in Ethiopia`,
    description:
      "A leading logistics service provider in Ethiopia — three integrated apps connecting freight owners, drivers, and vehicle owners with AI-powered freight matching, digital agreements, and real-time cargo tracking.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ethiochinet — Ethiopia's Digital Freight Logistics Platform",
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} | Logistics Service Provider in Ethiopia`,
    description:
      "A leading logistics service provider in Ethiopia — three integrated apps for freight owners, drivers, and vehicle owners.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
      'am-ET': baseUrl,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/ethiochinet_logo-transparent.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    google: 'qSf7CHa58d0JF87DMdXC6JIv6IuVcsKxVpXVFbCSe9w',
  },
  other: {
    'geo.region': 'ET-AA',
    'geo.placename': 'Addis Ababa, Ethiopia',
    'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    'ICBM': `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteConfig.company,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/ethiochinet_logo-transparent.png`,
        width: 400,
        height: 120,
      },
      description:
        "Ethiochinet Logistics Technology is a logistics service provider in Ethiopia operating a suite of three integrated applications: Ethiochinet Freight Owner, Ethiochinet Driver, and Ethiochinet Vehicle Owner — digitizing Ethiopia's freight transportation industry.",
      slogan: 'Your trusted logistics service provider in Ethiopia',
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Ethiopia',
      },
      knowsAbout: [
        'Logistics services in Ethiopia',
        'Freight logistics',
        'Digital freight matching',
        'Cargo tracking',
        'Transport agreements',
        'Fleet management',
        'Mobile logistics applications',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          contactType: 'customer service',
          availableLanguage: ['English', 'Amharic'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00',
          },
        },
      ],
      sameAs: Object.values(siteConfig.social),
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: siteConfig.company,
      description:
        "Ethiochinet — a digital logistics service provider in Ethiopia with apps for freight owners, drivers, and vehicle owners.",
      publisher: { '@id': `${baseUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: ['en-US', 'am-ET'],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
