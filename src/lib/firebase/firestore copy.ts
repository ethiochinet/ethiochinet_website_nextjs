// src/lib/firebase/firestore.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// Blog posts
export const getBlogPosts = async (category?: string, limitCount?: number) => {
  try {
    const q = collection(db, 'blogPosts');
    const constraints = [];
    
    if (category) {
      constraints.push(where('category', '==', category));
    }
    
    constraints.push(orderBy('publishedAt', 'desc'));
    
    if (limitCount) {
      constraints.push(limit(limitCount));
    }
    
    const querySnapshot = await getDocs(query(q, ...constraints));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// FAQ
export const getFAQs = async () => {
  try {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

// Testimonials
export const getTestimonials = async () => {
  try {
    const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

// Careers
export const getJobVacancies = async () => {
  try {
    const q = query(collection(db, 'jobVacancies'), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching job vacancies:', error);
    return [];
  }
};

export const getJobVacancy = async (id: string) => {
  try {
    const docRef = doc(db, 'jobVacancies', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching job vacancy:', error);
    return null;
  }
};

// Form submissions
export const submitContactForm = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
};

export const submitNewsletter = async (email: string) => {
  try {
    const docRef = await addDoc(collection(db, 'newsletterSubscriptions'), {
      email,
      subscribedAt: Timestamp.now(),
      status: 'active'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error };
  }
};

export const submitInvestmentInterest = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'investmentRegistrations'), {
      ...data,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting investment interest:', error);
    return { success: false, error };
  }
};

//  the submitJobApplication function
export const submitJobApplication = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'jobApplications'), {
      ...data,
      appliedAt: Timestamp.now(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting job application:', error);
    return { success: false, error };
  }
};