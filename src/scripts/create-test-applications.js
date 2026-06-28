// scripts/create-test-applications.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testApplications = [
  {
    fullName: 'Abebe Kebede',
    email: 'abebe.kebede@example.com',
    phone: '+251911223344',
    jobId: 'test-job-1',
    jobTitle: 'Software Engineer',
    coverLetter: 'I am very interested in this position...',
    cvUrl: 'https://example.com/cv1.pdf',
    status: 'pending',
    appliedAt: Timestamp.now(),
    linkedIn: 'https://linkedin.com/in/abebe'
  },
  {
    fullName: 'Tigist Haile',
    email: 'tigist.haile@example.com',
    phone: '+251922334455',
    jobId: 'test-job-2',
    jobTitle: 'Marketing Specialist',
    coverLetter: 'I have 5 years of experience in marketing...',
    cvUrl: 'https://example.com/cv2.pdf',
    status: 'reviewed',
    appliedAt: Timestamp.now(),
    linkedIn: 'https://linkedin.com/in/tigist'
  }
];

async function createTestApplications() {
  console.log('Creating test applications...');
  
  for (const app of testApplications) {
    try {
      const docRef = await addDoc(collection(db, 'jobApplications'), app);
      console.log(`✅ Created application for ${app.fullName} with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`❌ Error creating application for ${app.fullName}:`, error);
    }
  }
  
  console.log('Done!');
}

createTestApplications();