import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import AboutClient from './AboutClient';

const url = `${siteConfig.url}/about`;

export const metadata: Metadata = {
  title: 'About Ethiochinet | Our Story, Mission & Vision',
  description:
    'Learn about Ethiochinet Logistics Technology — founded in 2023 to bridge Ethiopia\'s logistics gap with AI-powered freight matching, digital agreements, and real-time tracking across 15+ cities.',
  keywords: ['about Ethiochinet', 'Ethiopia logistics company', 'digital freight startup Ethiopia', 'logistics technology Addis Ababa'],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'About Ethiochinet | Our Story, Mission & Vision',
    description:
      'Founded in 2023, Ethiochinet connects freight owners, drivers, and vehicle owners across Ethiopia through three integrated mobile apps.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${url}/#webpage`,
  url,
  name: 'About Ethiochinet Logistics Technology',
  description:
    'Ethiochinet Logistics Technology was founded in 2023 to digitize freight transportation in Ethiopia. The company operates three integrated apps: Ethiochinet Freight Owner, Ethiochinet Driver, and Ethiochinet Vehicle Owner.',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#organization` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'About', item: url },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
    </>
  );
}
