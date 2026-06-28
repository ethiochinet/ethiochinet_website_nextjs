import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import FaqClient from './FaqClient';

const url = `${siteConfig.url}/faq`;

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Ethiochinet Logistics',
  description:
    'Find answers to common questions about Ethiochinet — how to register as a freight owner, driver, or vehicle owner; how freight matching works; digital agreements; payment processes; and real-time tracking.',
  keywords: [
    'Ethiochinet FAQ',
    'how to register Ethiochinet',
    'freight matching Ethiopia questions',
    'how does Ethiochinet work',
    'logistics app Ethiopia help',
  ],
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'FAQ | Ethiochinet Logistics',
    description:
      'Answers to common questions about registering, freight matching, digital agreements, and tracking on Ethiochinet.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${url}/#faqpage`,
      url,
      name: 'Ethiochinet Frequently Asked Questions',
      description: 'Common questions about Ethiochinet Logistics Technology and its three integrated apps.',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Ethiochinet Logistics Technology?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ethiochinet Logistics Technology is Ethiopia\'s digital freight logistics platform operating a suite of three integrated applications: Ethiochinet Freight Owner, Ethiochinet Driver, and Ethiochinet Vehicle Owner. These apps connect freight owners, drivers, and vehicle owners/operators to streamline the entire freight transportation process — from registering loads and signing digital agreements to real-time tracking and payment.',
          },
        },
        {
          '@type': 'Question',
          name: 'What apps does Ethiochinet offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ethiochinet operates three integrated mobile apps: (1) Ethiochinet Freight Owner — for businesses and individuals who need to transport goods; (2) Ethiochinet Driver — for freight vehicle drivers who accept and complete transport jobs; and (3) Ethiochinet Vehicle Owner — for vehicle owners or operators who register their fleet and assign drivers.',
          },
        },
        {
          '@type': 'Question',
          name: 'What can a freight owner do on Ethiochinet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Using the Ethiochinet Freight Owner app, freight owners can register their freight requirements, enter into digital transport agreements, authorize the commencement of transport, track their freight in transit in real-time, and confirm delivery upon completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Ethiochinet Driver app work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Drivers use the Ethiochinet Driver app to accept freight orders, top up their digital wallet, and enter into digital agreements. They then proceed to the designated location to load freight and begin transport. Once transport has commenced, drivers monitor the shipment in real time. After delivering the freight, drivers receive payment. When available for work, drivers can set their status to indicate their current location and readiness for new jobs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Ethiochinet Vehicle Owner app used for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Ethiochinet Vehicle Owner app enables vehicle owners or operators to register their vehicle information, assign qualified drivers to each registered vehicle, and monitor all orders, agreements, and deliveries associated with that vehicle — tracked by plate number and carried out by the assigned driver.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a digital agreement on Ethiochinet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A digital agreement on Ethiochinet is an electronic transport contract signed between a freight owner and a driver directly through the platform, before transport begins. It replaces paper-based agreements and ensures both parties have clear, documented commitments for each freight job.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does a freight owner need to authorize transport before it begins?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Ethiochinet Freight Owner app includes an explicit authorization step — the freight owner must authorize the commencement of transport before the driver proceeds. This gives freight owners full control over when their cargo begins its journey.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do drivers indicate they are available for new jobs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When drivers are available for work, they can set their status in the Ethiochinet Driver app to indicate their current location and readiness for new freight jobs. This helps match them with nearby freight owners looking for transport.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the digital wallet work for drivers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Ethiochinet Driver app includes a digital wallet that drivers top up to participate on the platform. After successfully delivering freight, drivers receive their payment directly into this wallet, enabling a fully digital and cashless payment process.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does a vehicle owner assign a driver on Ethiochinet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Through the Ethiochinet Vehicle Owner app, vehicle owners register their vehicle information and then assign a specific driver to each vehicle. All orders, agreements, and deliveries for that vehicle are subsequently tracked under the assigned driver and the vehicle\'s plate number.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can vehicle owners monitor multiple vehicles on Ethiochinet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Ethiochinet Vehicle Owner app allows owners to register and manage multiple vehicles. Each vehicle\'s activity — including orders, agreements, and deliveries — is tracked individually by plate number and linked to its assigned driver.',
          },
        },
        {
          '@type': 'Question',
          name: 'In which cities does Ethiochinet operate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ethiochinet operates in 15+ Ethiopian cities, including Addis Ababa and major freight corridors such as the Djibouti–Addis route. The network is actively expanding to cover more of the country.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Ethiochinet available on both Android and iOS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Ethiochinet Freight Owner and Ethiochinet Driver apps are available on both iOS (App Store) and Android (Google Play). The Ethiochinet Vehicle Owner app is also available on both platforms.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
      ],
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
