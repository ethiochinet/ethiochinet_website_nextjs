'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
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
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

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
    href: 'https://facebook.com/ethiochinets', 
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
    href: 'https://t.me/ethiochinet_logistics', 
    label: 'Telegram',
    color: 'hover:bg-[#0088cc]'
  },
  { 
    icon: FaYoutube, 
    href: 'https://www.youtube.com/@ethiochinetlogistics', 
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

// Email validation function
const isValidEmail = (email: string): boolean => {
  // Remove whitespace
  const trimmedEmail = email.trim();
  
  // Basic checks
  if (!trimmedEmail) return false;
  if (trimmedEmail.length > 254) return false;
  
  // RFC 5322 compliant regex for email validation
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!emailRegex.test(trimmedEmail)) return false;
  
  // Check for common typos and disposable email domains
  const localPart = trimmedEmail.split('@')[0];
  const domain = trimmedEmail.split('@')[1].toLowerCase();
  
  // Check local part length
  if (localPart.length > 64) return false;
  
  // Check for common disposable email domains (optional - you can expand this list)
  const disposableDomains = [
    'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
    'sharklasers.com', 'yopmail.com', 'temp-mail.org', 'fakeinbox.com'
  ];
  
  if (disposableDomains.includes(domain)) {
    return false; // Reject disposable emails
  }
  
  return true;
};

// Newsletter Form Component with Firebase
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmedEmail = email.trim();
    
    // Validate email
    if (!trimmedEmail) {
      setError('Email is required');
      toast.error('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists in database
      const q = query(
        collection(db, 'newsletterSubscriptions'), 
        where('email', '==', trimmedEmail)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setError('This email is already subscribed');
        toast.error('This email is already subscribed to our newsletter');
        setLoading(false);
        return;
      }

      // Save to Firebase
      const docRef = await addDoc(collection(db, 'newsletterSubscriptions'), {
        email: trimmedEmail,
        subscribedAt: Timestamp.now(),
        status: 'active',
        source: 'footer',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      console.log('Newsletter subscription saved with ID:', docRef.id);
      
      // Show success message
      toast.success('Successfully subscribed to newsletter!', {
        description: 'Thank you for subscribing to Ethiochinet updates.',
        duration: 5000,
      });
      
      setEmail(''); // Clear the input
      setError('');
      
    } catch (error) {
      console.error('Error saving newsletter subscription:', error);
      setError('Failed to subscribe. Please try again.');
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Real-time validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear error when user starts typing
    if (error) setError('');
    
    // Optional: Show validation as user types
    if (newEmail.length > 0 && !isValidEmail(newEmail)) {
      // You can show a subtle hint without blocking submission
      // setError('Please enter a valid email address');
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => {
              // Validate on blur
              if (email && !isValidEmail(email)) {
                setError('Please enter a valid email address');
              }
            }}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-gray-500 transition-colors ${
              error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-700 focus:border-teal-500'
            }`}
            disabled={loading}
            required
            aria-label="Email address for newsletter"
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
          />
          {error && (
            <p id="email-error" className="absolute -bottom-6 left-0 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className={`bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            loading || !email ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Subscribe to newsletter"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-6">
        Get updates about new features and industry insights. 
        <br />We respect your privacy and will never share your email.
      </p>
    </form>
  );
};

// ... rest of your Footer component remains the same

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
              <span className="font-bold text-xl">Ethiochinet Logistics Technology</span>
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
                <a href="tel:+2519037799555" className="hover:text-teal-400 transition-colors">
                  +251 903 77 99 55 
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiLocationMarker className="w-5 h-5 text-teal-500" />
                <span>Bole, Gerji Mebrat Hail, Addis Ababa, Ethiopia</span>
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

          {/* Newsletter with Firebase Integration */}
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