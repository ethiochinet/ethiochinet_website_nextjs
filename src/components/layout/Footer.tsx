'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter, 
  FaTelegram, 
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaApple,
  FaGooglePlay 
} from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Investment', href: '/investment' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  apps: [
    { name: 'Ethiochinet App', href: '/download' },
    { name: 'Driver App', href: '/download' },
  ],
};

const socialLinks = [
  { 
    icon: FaFacebook, 
    href: 'https://facebook.com/ethiochinet', 
    label: 'Facebook',
    color: 'hover:bg-[#1877f2]'
  },
  { 
    icon: FaTwitter, 
    href: 'https://twitter.com/ethiochinet', 
    label: 'Twitter',
    color: 'hover:bg-[#1da1f2]'
  },
  { 
    icon: FaLinkedin, 
    href: 'https://linkedin.com/company/ethiochinet', 
    label: 'LinkedIn',
    color: 'hover:bg-[#0a66c2]'
  },
  { 
    icon: FaInstagram, 
    href: 'https://instagram.com/ethiochinet', 
    label: 'Instagram',
    color: 'hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737]'
  },
  { 
    icon: FaTelegram, 
    href: 'https://t.me/ethiochinet', 
    label: 'Telegram',
    color: 'hover:bg-[#0088cc]'
  },
  { 
    icon: FaYoutube, 
    href: 'https://youtube.com/@ethiochinet', 
    label: 'YouTube',
    color: 'hover:bg-[#ff0000]'
  },
  { 
    icon: FaTiktok, 
    href: 'https://tiktok.com/@ethiochinet', 
    label: 'TikTok',
    color: 'hover:bg-[#000000]'
  },
];

// Newsletter Form Component
const NewsletterForm = () => {
  return (
    <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-white placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          Subscribe
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Get updates about new features and industry insights
      </p>
    </form>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl">Ethiochinet</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming Ethiopia's logistics through technology, connecting freight owners with drivers 
              seamlessly across the nation.
            </p>

            {/* Social Media Links - Highlighted Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white group relative`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      
                      {/* Tooltip on hover */}
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <HiMail className="w-5 h-5 text-teal-500" />
                <a href="mailto:info@ethiochinet.com" className="hover:text-teal-400 transition-colors">
                  info@ethiochinet.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiPhone className="w-5 h-5 text-teal-500" />
                <a href="tel:+251911234567" className="hover:text-teal-400 transition-colors">
                  +251 911 234 567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiLocationMarker className="w-5 h-5 text-teal-500" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-500 text-center lg:text-left">
              © {currentYear} Ethiochinet Logistics Technology. All rights reserved.
            </div>

            {/* App Download Buttons */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaApple className="text-xl" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <FaGooglePlay className="text-xl" />
                <div className="text-left">
                  <div className="text-xs text-teal-200">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* Social Media Quick Links */}
            <div className="flex items-center space-x-3 lg:hidden">
              {socialLinks.slice(0, 4).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-teal-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-teal-400 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="hover:text-teal-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}