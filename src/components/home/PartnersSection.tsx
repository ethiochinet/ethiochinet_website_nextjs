'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category: string;
  order: number;
  featured: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const partnersRef = collection(db, 'partners');
      const q = query(partnersRef, orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const partnersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Partner[];
      
      setPartners(partnersData);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg h-32 animate-pulse">
                <div className="h-full bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-teal-600">Partners</span> & Supporters
          </h2>
          <p className="text-xl text-gray-600">
            Working together with industry leaders to transform Ethiopia's logistics sector
          </p>
        </motion.div>

        {/* Partners Grid */}
        {partners.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {partner.website ? (
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <PartnerLogo partner={partner} />
                  </a>
                ) : (
                  <PartnerLogo partner={partner} />
                )}
                
                {/* Category badge */}
                <div className="absolute top-2 right-2 bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {partner.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No partners to display at the moment.</p>
          </div>
        )}

        {/* Stats Highlight */}
        {partners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-lg text-gray-600">
              Join <span className="font-bold text-teal-600">{partners.length}+</span> organizations trusting Ethiochinet
            </p>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-b from-gray-50 to-white px-4 text-sm text-gray-500">
              Trusted by industry leaders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div className="relative h-20 w-full flex items-center justify-center">
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm text-center px-2">
            {partner.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-20 w-full flex items-center justify-center">
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={partner.logo}
        alt={partner.name}
        width={180}
        height={60}
        className={`object-contain filter group-hover:brightness-110 transition-all duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ maxWidth: '80%', maxHeight: '80px' }}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoading(false)}
      />
    </div>
  );
}