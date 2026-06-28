import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import DownloadClient from './DownloadClient';

const url = `${siteConfig.url}/download`;

export const metadata: Metadata = {
  title: 'Download Ethiochinet Apps | Freight Owner, Driver & Vehicle Owner',
  description:
    'Download the Ethiochinet suite of three integrated logistics apps. Ethiochinet Freight Owner for cargo management, Ethiochinet Driver for accepting orders, and Ethiochinet Vehicle Owner for fleet operations — available on iOS and Android.',
  keywords: [
    'download Ethiochinet app',
    'freight owner app Ethiopia',
    'driver app Ethiopia download',
    'vehicle owner app logistics Ethiopia',
    'logistics app Android iOS Ethiopia',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Download Ethiochinet Apps | Freight Owner, Driver & Vehicle Owner',
    description:
      'Three integrated logistics apps for freight owners, drivers, and vehicle owners — download from the App Store or Google Play.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const appsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MobileApplication',
      name: 'Ethiochinet Freight Owner',
      operatingSystem: 'ANDROID, IOS',
      applicationCategory: 'BusinessApplication',
      description:
        'Enables freight owners to register freight requirements, enter into digital agreements, authorize transport, track cargo in real-time, and confirm delivery.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'ETB' },
      downloadUrl: siteConfig.apps.freightOwner.appStore,
      installUrl: siteConfig.apps.freightOwner.googlePlay,
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: ['am', 'en'],
      countriesSupported: 'ET',
    },
    {
      '@type': 'MobileApplication',
      name: 'Ethiochinet Driver',
      operatingSystem: 'ANDROID, IOS',
      applicationCategory: 'BusinessApplication',
      description:
        'Allows drivers to accept freight orders, top up their digital wallet, enter digital agreements, proceed to pickup, monitor shipments in real-time, and receive payment upon delivery.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'ETB' },
      downloadUrl: siteConfig.apps.driver.appStore,
      installUrl: siteConfig.apps.driver.googlePlay,
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: ['am', 'en'],
      countriesSupported: 'ET',
    },
    {
      '@type': 'MobileApplication',
      name: 'Ethiochinet Vehicle Owner',
      operatingSystem: 'ANDROID, IOS',
      applicationCategory: 'BusinessApplication',
      description:
        'Enables vehicle owners to register vehicle information, assign drivers, and monitor orders, agreements, and deliveries tracked by plate number.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'ETB' },
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: ['am', 'en'],
      countriesSupported: 'ET',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Download', item: url },
      ],
    },
  ],
};

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appsSchema) }}
      />
      <DownloadClient />
    </>
  );
}
