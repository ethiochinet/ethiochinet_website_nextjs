'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Partner logos - replace with actual paths to your partner images
const partners = [
  { 
    name: 'Ethiopian Airlines', 
    logo: '/images/partners/ethiopian-airlines.png',
    width: 180,
    height: 60
  },
  { 
    name: 'Commercial Bank of Ethiopia', 
    logo: '/images/partners/cbe.png',
    width: 180,
    height: 60
  },
  { 
    name: 'Ethio Telecom', 
    logo: '/images/partners/ethio-telecom.png',
    width: 180,
    height: 60
  },
  { 
    name: 'Ministry of Transport', 
    logo: '/images/partners/mot.png',
    width: 180,
    height: 60
  },
  { 
    name: 'Addis Ababa University', 
    logo: '/images/partners/aau.png',
    width: 180,
    height: 60
  },
  { 
    name: 'Ethiopian Chamber of Commerce', 
    logo: '/images/partners/ecc.png',
    width: 180,
    height: 60
  },
  { 
    name: 'IceAddis', 
    logo: '/images/partners/iceaddis.png',
    width: 180,
    height: 60
  },
  { 
    name: 'BlueMoon', 
    logo: '/images/partners/bluemoon.png',
    width: 180,
    height: 60
  },
];

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-20 w-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                  style={{ maxWidth: '80%', maxHeight: '80px' }}
                />
              </div>
              <div className="absolute inset-0 bg-teal-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              {/* Tooltip on hover */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {partner.name}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600">
            Join <span className="font-bold text-teal-600">50+</span> organizations trusting Ethiochinet
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">Trusted by industry leaders</span>
          </div>
        </div>
      </div>
    </section>
  );
}