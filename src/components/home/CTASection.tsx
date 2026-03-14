// src/components/home/CTASection.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of freight owners and drivers already using Ethiochinet
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/download"
              className="flex items-center justify-center space-x-3 bg-white text-teal-600 px-6 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <FaApple className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </Link>
            
            <Link
              href="/download"
              className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <FaGooglePlay className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register-owner"
              className="px-6 py-3 bg-white/20 text-white rounded-lg border-2 border-white hover:bg-white/30 transition-colors font-medium"
            >
              Register as Freight Owner
            </Link>
            <Link
              href="/register-driver"
              className="px-6 py-3 bg-white/20 text-white rounded-lg border-2 border-white hover:bg-white/30 transition-colors font-medium"
            >
              Register as Driver
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}