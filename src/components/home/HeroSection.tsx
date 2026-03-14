'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-100/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-teal-100/20 to-transparent"></div>
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Added pt-32 to account for fixed header */}
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen pt-32 lg:pt-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
                🚀 Ethiopia's #1 Digital Logistics Platform
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6"
            >
              Ethiopia's Digital Logistics Platform
              <span className="block text-teal-600 mt-2">
                Connecting Freight Owners and Drivers
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Revolutionizing freight transportation in Ethiopia through technology. 
              Post loads, find trucks, and track deliveries in real-time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link
                href="/download"
                className="flex items-center justify-center space-x-3 bg-teal-600 text-white px-6 py-4 rounded-xl hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Link>
              
              <Link
                href="/download"
                className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Link>
            </motion.div>

            {/* Registration Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/download"
                className="px-6 py-3 bg-white text-teal-600 rounded-lg border-2 border-teal-600 font-semibold hover:bg-teal-50 transition-colors"
              >
                Register as Freight Owner
              </Link>
              <Link
                href="/download"
                className="px-6 py-3 bg-white text-teal-600 rounded-lg border-2 border-teal-600 font-semibold hover:bg-teal-50 transition-colors"
              >
                Register as Driver
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              <div>
                <div className="text-3xl font-bold text-teal-600">5,000+</div>
                <div className="text-sm text-gray-600">Registered Drivers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">10,000+</div>
                <div className="text-sm text-gray-600">Freight Posted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">15+</div>
                <div className="text-sm text-gray-600">Cities Served</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - App Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2 relative hidden lg:block"
          >
            <div className="relative h-[500px] w-full flex items-center justify-center">
              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
              </div>
              
              {/* Freight Owner App Mockup */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
                className="absolute left-0 top-10 w-64 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 z-10"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-teal-600 h-14 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">Ethiochinet</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-8 bg-teal-100 rounded-lg"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-teal-600 text-white text-xs text-center py-2">
                  Freight Owner App
                </div>
              </motion.div>

              {/* Driver App Mockup */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1,
                  repeatType: "reverse"
                }}
                className="absolute right-0 bottom-10 w-64 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 z-10"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-blue-600 h-14 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">Driver App</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-8 bg-blue-100 rounded-lg"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-2">
                  Driver App
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}