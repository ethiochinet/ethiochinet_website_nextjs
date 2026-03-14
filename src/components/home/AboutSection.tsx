// src/components/home/AboutSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Ethiochinet</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To revolutionize Ethiopia's logistics sector by creating a seamless digital platform that 
                  connects freight owners with reliable drivers, making transportation efficient, transparent, 
                  and accessible to all.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become Ethiopia's most trusted digital logistics platform, empowering businesses and 
                  drivers while contributing to the growth of the nation's economy through innovative technology 
                  solutions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">The Challenge</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ethiopia's logistics industry faces significant challenges: fragmented communication, lack of 
                  transparency, inefficient freight matching, and limited access to reliable transportation. 
                  These issues cost businesses time and money while limiting opportunities for drivers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Our Solution</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ethiochinet bridges the gap between freight owners and drivers through our innovative mobile 
                  applications. We provide real-time matching, transparent pricing, secure payments, and 
                  end-to-end tracking, making logistics simple and reliable for everyone involved.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/about-logistics.jpg"
              alt="Ethiopian Logistics"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}