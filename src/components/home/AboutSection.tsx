// src/components/home/AboutSection.tsx
'use client';

import { motion } from 'framer-motion';
import { HiTruck, HiLocationMarker, HiDocumentText, HiUserGroup } from 'react-icons/hi';

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
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-teal-600 via-teal-700 to-blue-800 flex items-center justify-center"
          >
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

            {/* Floating stat cards */}
            <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full">
              {[
                { icon: HiTruck, label: '3 Ethiochinet Apps', value: '3 Apps', color: 'bg-teal-500' },
                { icon: HiLocationMarker, label: 'Cities Served', value: '15+', color: 'bg-blue-500' },
                { icon: HiUserGroup, label: 'Registered Drivers', value: '500+', color: 'bg-teal-500' },
                { icon: HiDocumentText, label: 'Digital Agreements', value: '1000+', color: 'bg-blue-500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
                >
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-teal-200 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-white/60 text-sm tracking-widest uppercase">
                Ethiopia's Digital Logistics Platform
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}