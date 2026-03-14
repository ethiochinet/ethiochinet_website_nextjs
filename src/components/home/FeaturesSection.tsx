// src/components/home/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  HiOutlineTruck, 
  HiOutlineUserGroup, 
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineBell
} from 'react-icons/hi';

const features = [
  {
    icon: HiOutlineTruck,
    title: 'Smart Freight Matching',
    description: 'AI-powered algorithm matches your freight with the most suitable drivers in real-time.',
    color: 'teal'
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Verified Drivers',
    description: 'All drivers undergo thorough verification for your peace of mind.',
    color: 'blue'
  },
  {
    icon: HiOutlineBell,
    title: 'Real-time Notifications',
    description: 'Instant updates on your freight status, driver location, and delivery confirmations.',
    color: 'purple'
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Secure Platform',
    description: 'End-to-end encrypted transactions and secure payment processing.',
    color: 'green'
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: 'Transparent Pricing',
    description: 'Clear, upfront pricing with no hidden fees or surprises.',
    color: 'orange'
  },
  {
    icon: HiOutlineChartBar,
    title: 'Nationwide Network',
    description: 'Access to a growing network of drivers across all major Ethiopian cities.',
    color: 'red'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your logistics operations efficiently
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
              >
                <div className={`w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}