'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineCode } from 'react-icons/hi';
import { HiShieldCheck, HiDocumentText } from 'react-icons/hi2';

// Separate section components for better performance
const Section = ({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) => (
  <div className="mb-8 last:mb-0">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center">
      {Icon && <Icon className="w-5 h-5 text-teal-600 mr-2" />}
      {title}
    </h2>
    {children}
  </div>
);

const CookieTable = () => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left font-semibold text-gray-900">Cookie Type</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-900">Purpose</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-900">Duration</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {[
          ['Session Cookies', 'Maintain your session while logged in', 'Browser session'],
          ['Authentication Cookies', 'Verify your identity', '30 days'],
          ['Preference Cookies', 'Remember your settings', '1 year'],
          ['Analytics Cookies', 'Google Analytics tracking', '2 years'],
        ].map(([type, purpose, duration]) => (
          <tr key={type}>
            <td className="px-4 py-2 font-medium">{type}</td>
            <td className="px-4 py-2 text-gray-600">{purpose}</td>
            <td className="px-4 py-2 text-gray-600">{duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CookieList = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default function CookiesPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Simple Header - No animations on initial load */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <HiOutlineCode className="w-16 h-16 mx-auto mb-4 text-teal-200" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookies Policy</h1>
          <p className="text-teal-100 max-w-2xl mx-auto text-sm">
            How we use cookies on Ethiochinet
          </p>
          <p className="text-teal-200 text-xs mt-2">Last updated: March 2026</p>
        </div>
      </div>

      {/* Main Content - Simplified */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          
          <Section title="Introduction" icon={HiDocumentText}>
            <p className="text-gray-600 text-sm leading-relaxed">
              This Cookies Policy explains what cookies are and how we use them on Ethiochinet. 
              By using our platform, you consent to our use of cookies as described.
            </p>
          </Section>

          <Section title="What Are Cookies?">
            <div className="bg-teal-50 rounded-lg p-4 mb-3">
              <p className="text-gray-700 text-sm">
                Cookies are small text files stored on your device when you visit a website. 
                They help websites work efficiently and provide useful information to owners.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">First-party</h3>
                <p className="text-gray-600 text-xs">Set by Ethiochinet only</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Third-party</h3>
                <p className="text-gray-600 text-xs">Set by trusted partners</p>
              </div>
            </div>
          </Section>

          <Section title="How We Use Cookies">
            <div className="space-y-4">
              {[
                {
                  title: 'Essential Cookies',
                  desc: 'Required for platform function',
                  items: ['Authentication & security', 'Session management', 'Load balancing']
                },
                {
                  title: 'Functional Cookies',
                  desc: 'Enhance your experience',
                  items: ['Remember preferences', 'Save language settings', 'Personalize content']
                },
                {
                  title: 'Analytics Cookies',
                  desc: 'Help us improve',
                  items: ['Track page visits', 'Measure campaigns', 'Understand demographics']
                }
              ].map((section) => (
                <div key={section.title} className="border-l-3 border-teal-600 pl-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{section.title}</h3>
                  <p className="text-gray-500 text-xs mb-2">{section.desc}</p>
                  <CookieList items={section.items} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Types of Cookies">
            <CookieTable />
          </Section>

          <Section title="Third-Party Cookies">
            <p className="text-gray-600 text-sm mb-2">We use services that may set their own cookies:</p>
            <div className="flex flex-wrap gap-2">
              {['Google Analytics', 'Firebase', 'Stripe', 'Social Media'].map((service) => (
                <span key={service} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                  {service}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Your Choices" icon={HiShieldCheck}>
            <div className="space-y-3">
              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Browser Settings</h3>
                <CookieList items={[
                  'Delete all cookies',
                  'Block all cookies',
                  'Allow cookies from specific sites'
                ]} />
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Mobile Settings</h3>
                <CookieList items={[
                  'iOS: Settings → Privacy → Advertising',
                  'Android: Settings → Google → Ads'
                ]} />
              </div>
            </div>
          </Section>

          {/* Note */}
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 my-4">
            <p className="text-yellow-800 text-xs">
              <strong>Note:</strong> Disabling essential cookies may affect platform functionality.
            </p>
          </div>

          <Section title="Contact Us">
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="text-gray-700 mb-2">Questions about cookies?</p>
              <p className="text-gray-600 text-xs">
                <strong>Email:</strong> privacy@ethiochinet.com<br />
                <strong>Phone:</strong> +251 903 77 99 55
              </p>
            </div>
          </Section>

          {/* Related Links */}
          <div className="border-t pt-4 mt-4">
            <div className="flex flex-wrap gap-3 text-xs">
              <Link href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-teal-600 hover:underline">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-teal-600 hover:underline">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}