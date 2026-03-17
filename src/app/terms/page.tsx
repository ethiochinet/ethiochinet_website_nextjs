// src/app/terms/page.tsx
'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 1, 2024</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using Ethiochinet's platform, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any part of these terms, 
                you may not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700">
                Ethiochinet provides a digital platform connecting freight owners with vehicle owners and 
                drivers. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Freight posting and matching</li>
                <li>Real-time shipment tracking</li>
                <li>Digital payment processing</li>
                <li>Driver and vehicle verification</li>
                <li>Communication tools between parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">To use our services, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Notify us of any unauthorized use</li>
                <li>Comply with all applicable laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate information about freight or vehicles</li>
                <li>Honor commitments made through the platform</li>
                <li>Maintain appropriate licenses and insurance</li>
                <li>Follow all traffic laws and safety regulations</li>
                <li>Treat other users with respect</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Payments and Fees</h2>
              <p className="text-gray-700">
                Ethiochinet may charge fees for certain services. All fees will be clearly disclosed before 
                you incur them. Payments are processed securely through our payment partners. Freight owners 
                agree to pay the agreed amount for completed deliveries.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">You may not use our platform to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Transport illegal or prohibited goods</li>
                <li>Harass or harm other users</li>
                <li>Attempt to circumvent our fees</li>
                <li>Use bots or automated systems</li>
                <li>Infringe on intellectual property rights</li>
                <li>Engage in fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Dispute Resolution</h2>
              <p className="text-gray-700">
                In the event of a dispute between users, Ethiochinet may facilitate communication but is not 
                responsible for resolving the dispute. Users agree to attempt informal resolution first. If 
                unresolved, disputes shall be governed by the laws of Ethiopia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700">
                Ethiochinet is not liable for any indirect, incidental, or consequential damages arising from 
                use of our platform. Our total liability shall not exceed the fees paid by you in the 12 months 
                preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account for violations of these terms, illegal activities, 
                or for any other reason at our discretion. You may terminate your account at any time by 
                contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of our platform after 
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms, please contact us at:
                <br />
                Email: sales@ethiochinet.com
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