import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import InvestmentClient from './InvestmentClient';

const url = `${siteConfig.url}/investment`;

export const metadata: Metadata = {
  title: 'Investment Opportunities | Ethiochinet Logistics Technology',
  description:
    'Invest in Ethiochinet Logistics Technology — Ethiopia\'s fastest-growing digital freight platform. 6,400+ users, 4,000+ monthly freight transports, 15+ cities. $500M+ market opportunity. Seed and Series A investment open.',
  keywords: [
    'invest in Ethiochinet',
    'Ethiopia logistics startup investment',
    'freight tech Africa investment',
    'Ethiopian startup investment opportunity',
    'logistics technology investment Ethiopia',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Investment Opportunities | Ethiochinet Logistics Technology',
    description:
      'A $500M+ market, 6,400+ users, and 15+ cities served. Invest in Ethiopia\'s leading digital freight platform.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const investmentSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url,
      name: 'Investment Opportunities — Ethiochinet Logistics Technology',
      description:
        'Ethiochinet Logistics Technology is seeking investment to expand its digital freight platform across Ethiopia and beyond. The company has 6,400+ active users and covers 15+ cities.',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${siteConfig.url}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Investment', item: url },
      ],
    },
  ],
};

export default function InvestmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investmentSchema) }}
      />
      <InvestmentClient />
    </>
  );
}
