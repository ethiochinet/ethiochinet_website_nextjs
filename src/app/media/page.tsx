import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import MediaClient from './MediaClient';

const url = `${siteConfig.url}/media`;

export const metadata: Metadata = {
  title: 'Ethiochinet in the Media | TV, YouTube & News Coverage',
  description:
    'Watch and read Ethiochinet Logistics coverage on TV, YouTube, and in the news: Ethiopia\'s AI-powered freight logistics platform connecting freight owners with the most suitable trucks and drivers.',
  keywords: [
    'Ethiochinet news',
    'Ethiochinet TV',
    'Ethiochinet YouTube',
    'Ethiochinet media coverage',
    'chinet logistics news',
    'AI freight logistics Ethiopia news',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Ethiochinet in the Media',
    description: 'TV features, YouTube videos, and news coverage of Ethiochinet Logistics.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const mediaSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${url}/#webpage`,
  url,
  name: 'Ethiochinet in the Media',
  description: 'TV, YouTube, and news coverage of Ethiochinet Logistics.',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#organization` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Media', item: url },
    ],
  },
};

export default function MediaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaSchema) }}
      />
      <MediaClient />
    </>
  );
}
