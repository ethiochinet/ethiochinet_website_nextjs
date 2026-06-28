import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import CareersClient from './CareersClient';

const url = `${siteConfig.url}/careers`;

export const metadata: Metadata = {
  title: 'Careers at Ethiochinet | Join Our Team in Ethiopia',
  description:
    'Join Ethiochinet Logistics Technology and help build Ethiopia\'s future of freight. Explore open positions in technology, operations, business development, and more. Located in Addis Ababa.',
  keywords: [
    'Ethiochinet careers',
    'logistics jobs Ethiopia',
    'tech jobs Addis Ababa',
    'startup jobs Ethiopia',
    'freight company jobs Ethiopia',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Careers at Ethiochinet | Join Our Team',
    description:
      'Help transform Ethiopia\'s logistics industry. Explore open positions at Ethiochinet Logistics Technology.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const careersSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url,
      name: 'Careers at Ethiochinet Logistics Technology',
      description: 'Open job positions at Ethiochinet — Ethiopia\'s leading digital freight logistics platform.',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: url },
      ],
    },
  ],
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
      />
      <CareersClient />
    </>
  );
}
