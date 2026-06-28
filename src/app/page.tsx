import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import PartnersSection from '@/components/home/PartnersSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const base = siteConfig.url;

export const metadata: Metadata = {
  title: `${siteConfig.company} | Ethiopia's Digital Freight Logistics Platform`,
  description:
    "Ethiochinet connects freight owners with verified drivers and vehicle operators across Ethiopia. Post freight, sign digital agreements, track cargo in real-time, and manage your fleet — all from three integrated mobile apps.",
  alternates: { canonical: base },
  openGraph: {
    url: base,
    title: `${siteConfig.company} | Ethiopia's Digital Freight Logistics Platform`,
    description:
      "Three integrated apps — Ethiochinet Freight Owner, Driver, and Vehicle Owner — powering Ethiopia's digital logistics ecosystem.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${base}/#webpage`,
  url: base,
  name: `${siteConfig.company} | Ethiopia's Digital Freight Logistics Platform`,
  description:
    "Ethiochinet Logistics Technology operates three integrated apps connecting freight owners, drivers, and vehicle owners across Ethiopia.",
  isPartOf: { '@id': `${base}/#website` },
  about: { '@id': `${base}/#organization` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Ethiochinet App Suite',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ethiochinet Freight Owner',
        description:
          'Enables freight owners to register freight, enter digital agreements, authorize transport, track cargo in real-time, and confirm delivery.',
        url: siteConfig.apps.freightOwner.appStore,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ethiochinet Driver',
        description:
          'Allows drivers to accept freight orders, top up their digital wallet, proceed to loading locations, monitor shipments, and receive payment upon delivery.',
        url: siteConfig.apps.driver.appStore,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ethiochinet Vehicle Owner',
        description:
          'Enables vehicle owners to register vehicles, assign drivers, and monitor orders, agreements, and deliveries tracked by plate number.',
        url: `${base}/download`,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
