import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import BlogClient from './BlogClient';

const url = `${siteConfig.url}/blog`;

export const metadata: Metadata = {
  title: 'Blog & News | Ethiochinet Logistics Insights',
  description:
    'Industry insights, platform updates, and logistics tips from Ethiochinet — covering freight technology, Ethiopian logistics trends, and startup news.',
  keywords: [
    'Ethiochinet blog',
    'Ethiopia logistics news',
    'freight technology Africa',
    'digital logistics insights Ethiopia',
    'logistics startup Ethiopia',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    type: 'website',
    title: 'Blog & News | Ethiochinet Logistics Insights',
    description:
      'Industry insights and updates from Ethiochinet — Ethiopia\'s digital freight logistics platform.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${url}/#blog`,
  url,
  name: 'Ethiochinet Blog & News',
  description: 'Insights and updates from Ethiochinet and the Ethiopian logistics industry.',
  publisher: { '@id': `${siteConfig.url}/#organization` },
  inLanguage: 'en',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
    ],
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient />
    </>
  );
}
