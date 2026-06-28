// src/app/privacy/page.tsx
'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 1, 2024</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700">
                Ethiochinet Logistics Technology ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our website and mobile applications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Vehicle and driver information for our driver app users</li>
                <li>Freight and cargo details from freight owners</li>
                <li>Location data for tracking deliveries</li>
                <li>Payment information (processed securely through our payment partners)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide and maintain our services</li>
                <li>To match freight owners with suitable drivers</li>
                <li>To process transactions and send notifications</li>
                <li>To improve and personalize user experience</li>
                <li>To communicate with you about updates and promotions</li>
                <li>To ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell or rent your personal information to third parties. We may share information 
                with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Service providers who assist in operating our platform</li>
                <li>Payment processors for secure transactions</li>
                <li>Law enforcement when required by law</li>
                <li>Other users as necessary for service provision (e.g., sharing pickup/delivery details)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your information, including 
                encryption, secure servers, and regular security audits. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                Email: info@ethiochinet.com
                <br />
                Phone: +251 903 77 99 55
                <br />
                Address: Bole , Gerji Mebrat Hail<br />
                2nd Floor, Office 107<br />
                Addis Ababa, Ethiopia
              </p>
            </section>
          </div>
        </motion.article>
      </div>
    </div>
  );
}