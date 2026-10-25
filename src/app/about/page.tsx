import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import AboutClient from './AboutClient';

const url = `${siteConfig.url}/about`;

export const metadata: Metadata = {
  title: 'About Ethiochinet | Our Story, Mission & Vision',
  description:
    'Ethiochinet is an AI-native freight logistics platform that intelligently connects freight owners with the most suitable available trucks and drivers while optimizing the entire transportation journey.',
  keywords: ['about Ethiochinet', 'Ethiopia logistics company', 'digital freight startup Ethiopia', 'logistics technology Addis Ababa'],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'About Ethiochinet | Our Story, Mission & Vision',
    description:
      'AI-powered freight logistics: Ethiochinet intelligently matches freight owners with the most suitable available trucks and drivers and optimizes the entire transportation journey.',
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
    'Ethiochinet Logistics Technology is an AI-native freight logistics platform that intelligently connects freight owners with the most suitable available trucks and drivers while optimizing the entire transportation journey. The company operates three integrated apps: Ethiochinet Freight Owner, Ethiochinet Driver, and Ethiochinet Vehicle Owner.',
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
