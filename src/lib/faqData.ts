export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const staticFaqs: FAQ[] = [
  {
    id: 'static-1',
    question: 'What is Ethiochinet Logistics Technology?',
    answer:
      'Ethiochinet Logistics Technology is Ethiopia\'s digital freight logistics platform operating a suite of three integrated applications: Ethiochinet Freight Owner, Ethiochinet Driver, and Ethiochinet Vehicle Owner. These apps connect freight owners, drivers, and vehicle owners/operators to streamline the entire freight transportation process — from registering loads and signing digital agreements to real-time tracking and payment.',
    category: 'General',
    order: 1,
  },
  {
    id: 'static-2',
    question: 'What apps does Ethiochinet offer?',
    answer:
      'Ethiochinet operates three integrated mobile apps: (1) Ethiochinet Freight Owner — for businesses and individuals who need to transport goods; (2) Ethiochinet Driver — for freight vehicle drivers who accept and complete transport jobs; and (3) Ethiochinet Vehicle Owner — for vehicle owners or operators who register their fleet and assign drivers.',
    category: 'General',
    order: 2,
  },
  {
    id: 'static-3',
    question: 'What can a freight owner do on Ethiochinet?',
    answer:
      'Using the Ethiochinet Freight Owner app, freight owners can register their freight requirements, enter into digital transport agreements, authorize the commencement of transport, track their freight in transit in real-time, and confirm delivery upon completion.',
    category: 'Freight Owner',
    order: 3,
  },
  {
    id: 'static-4',
    question: 'Does a freight owner need to authorize transport before it begins?',
    answer:
      'Yes. The Ethiochinet Freight Owner app includes an explicit authorization step — the freight owner must authorize the commencement of transport before the driver proceeds. This gives freight owners full control over when their cargo begins its journey.',
    category: 'Freight Owner',
    order: 4,
  },
  {
    id: 'static-5',
    question: 'How does the Ethiochinet Driver app work?',
    answer:
      'Drivers use the Ethiochinet Driver app to accept freight orders, top up their digital wallet, and enter into digital agreements. They then proceed to the designated location to load freight and begin transport. Once transport has commenced, drivers monitor the shipment in real time. After delivering the freight, drivers receive payment. When available for work, drivers can set their status to indicate their current location and readiness for new jobs.',
    category: 'Driver',
    order: 5,
  },
  {
    id: 'static-6',
    question: 'How do drivers indicate they are available for new jobs?',
    answer:
      'When drivers are available for work, they can set their status in the Ethiochinet Driver app to indicate their current location and readiness for new freight jobs. This helps match them with nearby freight owners looking for transport.',
    category: 'Driver',
    order: 6,
  },
  {
    id: 'static-7',
    question: 'How does the digital wallet work for drivers?',
    answer:
      'The Ethiochinet Driver app includes a digital wallet that drivers top up to participate on the platform. After successfully delivering freight, drivers receive their payment directly into this wallet, enabling a fully digital and cashless payment process.',
    category: 'Driver',
    order: 7,
  },
  {
    id: 'static-8',
    question: 'What is the Ethiochinet Vehicle Owner app used for?',
    answer:
      'The Ethiochinet Vehicle Owner app enables vehicle owners or operators to register their vehicle information, assign qualified drivers to each registered vehicle, and monitor all orders, agreements, and deliveries associated with that vehicle — tracked by plate number and carried out by the assigned driver.',
    category: 'Vehicle Owner',
    order: 8,
  },
  {
    id: 'static-9',
    question: 'How does a vehicle owner assign a driver on Ethiochinet?',
    answer:
      'Through the Ethiochinet Vehicle Owner app, vehicle owners register their vehicle information and then assign a specific driver to each vehicle. All orders, agreements, and deliveries for that vehicle are subsequently tracked under the assigned driver and the vehicle\'s plate number.',
    category: 'Vehicle Owner',
    order: 9,
  },
  {
    id: 'static-10',
    question: 'Can vehicle owners monitor multiple vehicles?',
    answer:
      'Yes. The Ethiochinet Vehicle Owner app allows owners to register and manage multiple vehicles. Each vehicle\'s activity — including orders, agreements, and deliveries — is tracked individually by plate number and linked to its assigned driver.',
    category: 'Vehicle Owner',
    order: 10,
  },
  {
    id: 'static-11',
    question: 'What is a digital agreement on Ethiochinet?',
    answer:
      'A digital agreement on Ethiochinet is an electronic transport contract signed between a freight owner and a driver through the platform before transport begins. It replaces paper-based agreements and ensures both parties have clear, documented commitments for each freight job.',
    category: 'General',
    order: 11,
  },
  {
    id: 'static-12',
    question: 'In which cities does Ethiochinet operate?',
    answer:
      'Ethiochinet operates in 15+ Ethiopian cities, including Addis Ababa and major freight corridors such as the Djibouti–Addis route. The network is actively expanding to cover more of the country.',
    category: 'General',
    order: 12,
  },
  {
    id: 'static-13',
    question: 'Is Ethiochinet available on both Android and iOS?',
    answer:
      'Yes. The Ethiochinet Freight Owner and Ethiochinet Driver apps are available on both iOS (App Store) and Android (Google Play). The Ethiochinet Vehicle Owner app is also available on both platforms.',
    category: 'General',
    order: 13,
  },
];
