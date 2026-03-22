'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-teal-600">Ethiochinet</span>
            </h1>
            <p className="text-xl text-gray-600">
              Transforming Ethiopia's logistics landscape through innovative technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize Ethiopia's logistics sector by creating a seamless digital platform that 
                connects freight owners with reliable drivers, making transportation efficient, transparent, 
                and accessible to all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become Ethiopia's most trusted digital logistics platform, empowering businesses and 
                drivers while contributing to the growth of the nation's economy through innovative technology 
                solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ethiochinet was born from a simple observation: Ethiopia's logistics sector was fragmented, 
                inefficient, and lacked transparency. Freight owners struggled to find reliable drivers, 
                while drivers spent days waiting for loads.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                In 2023, our founding team of logistics experts and technologists came together with a vision 
                to bridge this gap. We built Ethiochinet to digitally connect freight owners with drivers, 
                bringing efficiency and transparency to the industry.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve thousands of users across 15+ Ethiopian cities, and we're just getting started. 
                Our platform continues to evolve, adding new features to better serve our community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/myethiochinet.firebasestorage.app/o/user_images%2Fteamethiochinet.png?alt=media&token=a81885ff-6bd2-4392-ab25-b9de0b873426"
                alt="Ethiochinet Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Trust & Transparency",
                description: "We build trust through transparent operations and clear communication."
              },
              {
                icon: "💡",
                title: "Innovation First",
                description: "We continuously innovate to solve logistics challenges."
              },
              {
                icon: "🌟",
                title: "Customer Focus",
                description: "Our users' success is our success. We put them first."
              },
              {
                icon: "🌍",
                title: "Local Impact",
                description: "We're committed to Ethiopia's economic growth."
              },
              {
                icon: "⚡",
                title: "Efficiency",
                description: "We optimize every aspect of the logistics process."
              },
              {
                icon: "🤲",
                title: "Community",
                description: "We build a strong community of drivers and freight owners."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Join the Logistics Revolution</h2>
            <p className="text-xl text-teal-100 mb-8">
              Be part of Ethiopia's digital logistics transformation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/download"
                className="px-8 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}