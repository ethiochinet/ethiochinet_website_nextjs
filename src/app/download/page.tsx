// src/app/download/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { HiQrcode, HiDeviceMobile } from 'react-icons/hi';

export default function DownloadPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Download Our Apps</h1>
          <p className="text-xl text-gray-600">
            Get started with Ethiochinet today. Choose the app that's right for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Freight Owner App */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-teal-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Ethiochinet App</h2>
              <p className="text-teal-100">For Freight Owners</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <Image
                    src="/images/app-mockup-owner.png"
                    alt="Ethiochinet App"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">App Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                    <span>Post freight in seconds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                    <span>Find verified trucks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                    <span>Track cargo in real-time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                    <span>Secure digital payments</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all w-full"
                >
                  <FaApple className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Link>
                
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-teal-600 text-white px-6 py-4 rounded-xl hover:bg-teal-700 transition-all w-full"
                >
                  <FaGooglePlay className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Driver App */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Ethiochinet Driver App</h2>
              <p className="text-blue-100">For Vehicle Owners & Drivers</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <Image
                    src="/images/app-mockup-driver.png"
                    alt="Ethiochinet Driver App"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">App Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Find available freight</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Accept transport jobs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Track trips and earnings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Instant payment withdrawals</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all w-full"
                >
                  <FaApple className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Link>
                
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all w-full"
                >
                  <FaGooglePlay className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QR Codes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Scan to Download</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <HiQrcode className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Ethiochinet App</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <HiQrcode className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Driver App</p>
            </div>
          </div>
        </motion.div>

        {/* Registration Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Already have the app?</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Sign In on Mobile App
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-white text-teal-600 rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors font-medium"
            >
              Register as Freight Owner
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Register as Driver
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}