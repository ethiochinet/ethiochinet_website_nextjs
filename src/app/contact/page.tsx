import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import ContactClient from './ContactClient';

const url = `${siteConfig.url}/contact`;

export const metadata: Metadata = {
  title: 'Contact Us | Ethiochinet Logistics Technology',
  description:
    'Contact Ethiochinet Logistics Technology. Reach us at info@ethiochinet.com or call +251 903 77 99 55 / +251 970 55 55 77. Office located in Bole, Gerji Mebrat Hail, Addis Ababa, Ethiopia.',
  keywords: [
    'contact Ethiochinet',
    'Ethiochinet support',
    'logistics company Addis Ababa contact',
    'freight platform Ethiopia contact',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Contact Ethiochinet | Get in Touch',
    description:
      'Reach the Ethiochinet team — email, phone, or visit us at our office in Bole, Addis Ababa.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${url}/#webpage`,
      url,
      name: 'Contact Ethiochinet Logistics Technology',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${siteConfig.url}/#organization` },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#localbusiness`,
      name: siteConfig.company,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      image: `${siteConfig.url}/images/ethiochinet_logo-transparent.png`,
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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      sameAs: Object.values(siteConfig.social),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: url },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
