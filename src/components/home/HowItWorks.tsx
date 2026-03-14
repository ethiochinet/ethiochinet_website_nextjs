// src/components/home/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { HiDownload, HiUserCircle, HiDocumentText, HiTruck, HiLocationMarker, HiCash } from 'react-icons/hi';

const stepsForOwners = [
  { icon: HiDownload, title: 'Download App', description: 'Get the Ethiochinet App from App Store or Google Play' },
  { icon: HiUserCircle, title: 'Register', description: 'Create your account as a freight owner' },
  { icon: HiDocumentText, title: 'Post Freight', description: 'Enter your cargo details and requirements' },
  { icon: HiTruck, title: 'Match with Drivers', description: 'Get matched with verified drivers instantly' },
  { icon: HiLocationMarker, title: 'Track Delivery', description: 'Monitor your cargo in real-time' },
];

const stepsForDrivers = [
  { icon: HiDownload, title: 'Download App', description: 'Get the Ethiochinet Driver App' },
  { icon: HiUserCircle, title: 'Register Vehicle', description: 'Register your vehicle and get verified' },
  { icon: HiDocumentText, title: 'Browse Freight', description: 'View available loads in your area' },
  { icon: HiTruck, title: 'Accept Jobs', description: 'Choose jobs that suit your schedule' },
  { icon: HiCash, title: 'Deliver & Earn', description: 'Complete deliveries and get paid securely' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to start your logistics journey with Ethiochinet
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Freight Owners */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-teal-600 mb-8 text-center">
              For Freight Owners
            </h3>
            <div className="space-y-6">
              {stepsForOwners.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-sm font-semibold">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 ml-8">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* For Drivers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-8 text-center">
              For Drivers
            </h3>
            <div className="space-y-6">
              {stepsForDrivers.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 ml-8">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}