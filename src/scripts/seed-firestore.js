const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Firebase configuration...\n');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('✅ Firebase configuration loaded');
console.log('📋 Project ID:', firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('✅ Firebase initialized successfully\n');

// ==================== SAMPLE DATA ====================

// 1. FAQs Collection
const sampleFAQs = [
  {
    question: "How does Ethiochinet work?",
    answer: "Ethiochinet connects freight owners with verified drivers through our mobile apps. Freight owners can post loads, and drivers can find and accept transport jobs in real-time.",
    category: "general",
    order: 1,
    createdAt: Timestamp.now()
  },
  {
    question: "How can drivers register?",
    answer: "Drivers can download the Ethiochinet Driver App from App Store or Google Play, create an account, submit their documents for verification, and register their vehicle.",
    category: "drivers",
    order: 2,
    createdAt: Timestamp.now()
  },
  {
    question: "How do freight owners post cargo?",
    answer: "Download the Ethiochinet App, register as a freight owner, and you can post your cargo details including pickup location, destination, cargo type, and preferred delivery date.",
    category: "freight owners",
    order: 3,
    createdAt: Timestamp.now()
  },
  {
    question: "Is payment secure?",
    answer: "Yes! All payments are processed through secure payment gateways. Funds are held in escrow and released to drivers only after successful delivery confirmation.",
    category: "payments",
    order: 4,
    createdAt: Timestamp.now()
  },
  {
    question: "What cities do you serve?",
    answer: "We currently serve Addis Ababa, Bahir Dar, Gondar, Hawassa, Dire Dawa, Mekelle, and all major routes between these cities.",
    category: "coverage",
    order: 5,
    createdAt: Timestamp.now()
  },
  {
    question: "How are drivers verified?",
    answer: "All drivers undergo thorough verification including license validation, vehicle inspection, background check, and in-person interview before being approved.",
    category: "drivers",
    order: 6,
    createdAt: Timestamp.now()
  }
];

// 2. Testimonials Collection
const sampleTestimonials = [
  {
    name: "Abebe Kebede",
    role: "Freight Owner",
    company: "ABC Trading PLC",
    rating: 5,
    content: "Ethiochinet has transformed how I transport goods. I can find reliable drivers quickly and track my shipments in real-time. The platform is a game-changer!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    order: 1,
    createdAt: Timestamp.now(),
    status: "approved"
  },
  {
    name: "Tigist Haile",
    role: "Driver",
    rating: 5,
    content: "As a driver, I love how easy it is to find loads. The app shows me available jobs near me and payments are processed securely. I've increased my income by 40%!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    order: 2,
    createdAt: Timestamp.now(),
    status: "approved"
  },
  {
    name: "Gemechu Desta",
    role: "Fleet Owner",
    company: "Desta Transport Services",
    rating: 5,
    content: "Managing my fleet of 15 trucks has never been easier. The app helps me keep my trucks on the road with consistent loads and reduces empty returns.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    order: 3,
    createdAt: Timestamp.now(),
    status: "approved"
  },
  {
    name: "Meron Assefa",
    role: "Freight Owner",
    company: "Meron Trading House",
    rating: 4,
    content: "The real-time tracking feature gives me peace of mind. I know exactly where my goods are at all times. Customer support is also very responsive.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    order: 4,
    createdAt: Timestamp.now(),
    status: "approved"
  }
];

// 3. Blog Posts Collection
const sampleBlogPosts = [
  {
    title: "The Future of Logistics in Ethiopia",
    slug: "future-of-logistics-ethiopia",
    excerpt: "Discover how technology is transforming the logistics sector in Ethiopia and what it means for businesses and drivers.",
    content: `Ethiopia's logistics sector is at a turning point. With the rise of digital platforms like Ethiochinet, traditional challenges are being addressed through technology.

    Key trends shaping the future:
    1. Digital matching of freight and vehicles
    2. Real-time tracking and transparency
    3. Secure digital payments
    4. Data-driven route optimization
    5. Integration with cross-border trade

    The adoption of these technologies is expected to reduce logistics costs by up to 30% and improve delivery times significantly.`,
    featuredImage: "https://images.unsplash.com/photo-1586528116311-ada1f6f0f0d0",
    category: "Logistics Technology",
    tags: ["technology", "future", "ethiopia", "logistics"],
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      bio: "Logistics expert and technology enthusiast with 10+ years in the industry"
    },
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    status: "published"
  },
  {
    title: "How Digital Platforms are Empowering Ethiopian Drivers",
    slug: "digital-platforms-empowering-drivers",
    excerpt: "Ethiopian drivers are finding new opportunities through digital logistics platforms. Here's how.",
    content: `Digital platforms are creating unprecedented opportunities for drivers in Ethiopia. Gone are the days of waiting at truck stops hoping for loads.

    Benefits for drivers:
    • Access to more jobs and better routes
    • Transparent pricing and fair compensation
    • Secure and timely payments
    • Reduced empty kilometers
    • Professional development opportunities

    Drivers using Ethiochinet report an average 40% increase in monthly earnings.`,
    featuredImage: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644",
    category: "Driver Stories",
    tags: ["drivers", "empowerment", "earnings"],
    author: {
      name: "Sarah Tekle",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      bio: "Journalist covering technology and social impact in East Africa"
    },
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    status: "published"
  },
  {
    title: "5 Tips for Freight Owners to Optimize Their Logistics",
    slug: "tips-freight-owners-optimize-logistics",
    excerpt: "Save time and money with these practical tips for freight owners using digital platforms.",
    content: `Whether you're shipping goods regularly or occasionally, these tips will help you get the most out of Ethiochinet.

    1. Plan ahead - Post loads 24-48 hours in advance
    2. Provide accurate cargo details including dimensions and weight
    3. Be clear about pickup and delivery requirements
    4. Build relationships with reliable drivers
    5. Use the tracking feature to monitor shipments

    Following these tips can reduce your logistics costs by up to 25%.`,
    featuredImage: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55",
    category: "Freight Tips",
    tags: ["freight", "tips", "optimization"],
    author: {
      name: "Michael Kebede",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      bio: "Supply chain consultant and logistics expert"
    },
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    status: "published"
  }
];

// 4. Job Vacancies Collection
const sampleJobs = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Addis Ababa",
    type: "Full-time",
    description: "We're looking for a senior software engineer to help build and scale our platform. You'll work on challenging problems in logistics technology.",
    requirements: [
      "5+ years experience with React/Next.js",
      "Strong TypeScript skills",
      "Experience with Node.js and Firebase",
      "Understanding of cloud architecture",
      "Problem-solving mindset"
    ],
    responsibilities: [
      "Build new features for our mobile apps and website",
      "Mentor junior developers",
      "Architect scalable solutions",
      "Optimize performance",
      "Collaborate with product team"
    ],
    qualifications: [
      "Bachelor's in Computer Science or related field",
      "Experience with logistics tech is a plus",
      "Strong communication skills"
    ],
    salary: "Competitive + Equity",
    postedAt: Timestamp.now(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    isActive: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Logistics Operations Manager",
    department: "Operations",
    location: "Addis Ababa",
    type: "Full-time",
    description: "Join our operations team to ensure smooth freight matching and delivery. You'll be the bridge between technology and logistics.",
    requirements: [
      "3+ years logistics experience",
      "Strong communication and negotiation skills",
      "Problem-solving abilities",
      "Experience with digital platforms",
      "Fluent in Amharic and English"
    ],
    responsibilities: [
      "Manage driver relationships",
      "Optimize routes and scheduling",
      "Handle customer issues",
      "Monitor service quality",
      "Train new drivers"
    ],
    qualifications: [
      "Degree in Logistics or related field",
      "Knowledge of Ethiopian roads and routes",
      "Customer service experience"
    ],
    salary: "Competitive",
    postedAt: Timestamp.now(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Addis Ababa",
    type: "Full-time",
    description: "Help us grow Ethiochinet's presence across Ethiopia. You'll lead marketing campaigns and community engagement.",
    requirements: [
      "3+ years marketing experience",
      "Social media expertise",
      "Content creation skills",
      "Event planning experience",
      "Fluent in Amharic and English"
    ],
    responsibilities: [
      "Develop marketing campaigns",
      "Manage social media accounts",
      "Create content for blog and newsletters",
      "Organize driver meetups",
      "Track marketing metrics"
    ],
    qualifications: [
      "Degree in Marketing or related field",
      "Experience with digital marketing",
      "Creative thinking"
    ],
    salary: "Competitive",
    postedAt: Timestamp.now(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: Timestamp.now()
  }
];

// 5. Partners Collection
const samplePartners = [
  {
    name: "Commercial Bank of Ethiopia",
    logo: "https://via.placeholder.com/200x100/0d9488/ffffff?text=CBE",
    website: "https://www.combanketh.et",
    category: "banking",
    order: 1,
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    name: "Ethio Telecom",
    logo: "https://via.placeholder.com/200x100/0d9488/ffffff?text=Ethio+Telecom",
    website: "https://www.ethiotelecom.et",
    category: "telecom",
    order: 2,
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    name: "Ministry of Transport",
    logo: "https://via.placeholder.com/200x100/0d9488/ffffff?text=MoT",
    website: "https://www.mot.gov.et",
    category: "government",
    order: 3,
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    name: "IceAddis",
    logo: "https://via.placeholder.com/200x100/0d9488/ffffff?text=IceAddis",
    website: "https://www.iceaddis.com",
    category: "incubator",
    order: 4,
    featured: true,
    createdAt: Timestamp.now()
  }
];

// 6. Statistics Collection
const sampleStatistics = {
  registeredDrivers: 5247,
  freightPosted: 12453,
  deliveriesCompleted: 10892,
  citiesServed: 15,
  updatedAt: Timestamp.now()
};

// ==================== SEEDING FUNCTION ====================

async function seedCollection(collectionName, data, isArray = true) {
  console.log(`\n📝 Seeding ${collectionName}...`);
  
  try {
    if (isArray) {
      // Handle array of documents
      for (const item of data) {
        try {
          const docRef = await addDoc(collection(db, collectionName), item);
          console.log(`   ✅ Added: ${item.name || item.title || item.question?.substring(0, 30) || 'Document'} (ID: ${docRef.id})`);
        } catch (error) {
          console.error(`   ❌ Error adding to ${collectionName}:`, error.message);
        }
      }
    } else {
      // Handle single document
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log(`   ✅ Added statistics document (ID: ${docRef.id})`);
    }
  } catch (error) {
    console.error(`   ❌ Error with ${collectionName}:`, error.message);
  }
}

async function seedDatabase() {
  console.log('🌱 ==================================');
  console.log('🌱 STARTING DATABASE SEEDING');
  console.log('🌱 ==================================\n');

  // Seed all collections
  await seedCollection('faqs', sampleFAQs);
  await seedCollection('testimonials', sampleTestimonials);
  await seedCollection('blogPosts', sampleBlogPosts);
  await seedCollection('jobVacancies', sampleJobs);
  await seedCollection('partners', samplePartners);
  await seedCollection('statistics', sampleStatistics, false);

  console.log('\n🌱 ==================================');
  console.log('🌱 DATABASE SEEDING COMPLETED!');
  console.log('🌱 ==================================');
  console.log('\n📊 Collections seeded:');
  console.log('   ✅ faqs -', sampleFAQs.length, 'documents');
  console.log('   ✅ testimonials -', sampleTestimonials.length, 'documents');
  console.log('   ✅ blogPosts -', sampleBlogPosts.length, 'documents');
  console.log('   ✅ jobVacancies -', sampleJobs.length, 'documents');
  console.log('   ✅ partners -', samplePartners.length, 'documents');
  console.log('   ✅ statistics - 1 document');
  console.log('\n🔍 Next steps:');
  console.log('   1. Verify data in Firebase Console');
  console.log('   2. Update security rules for production');
  console.log('   3. Add more sample data as needed');
}

// Run the seed function
seedDatabase();