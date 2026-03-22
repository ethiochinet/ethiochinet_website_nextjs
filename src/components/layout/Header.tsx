'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
// import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  // Navigation items with translations
  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.careers'), href: '/careers' },
    { name: t('navigation.investment'), href: '/investment' },
    { name: t('navigation.contact'), href: '/contact' },
    { name: t('navigation.faq'), href: '/faq' },
  ];

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 overflow-hidden"
            >
              {!logoError ? (
                <Image
                  src="/images/ethiochinet_logo-transparent.png"
                  alt="Ethiochinet Logo"
                  fill
                  className="object-contain dark:brightness-90 dark:contrast-125"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                // Fallback to text logo if image fails to load
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
              )}
            </motion.div>
            
            <span className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Ethiochinet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-colors ${
                    isActive 
                      ? 'text-teal-600 dark:text-teal-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            {/* <ThemeToggle /> */}
            
            {/* App Buttons */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/download"
                className="flex items-center space-x-2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <FaApple className="text-xl" />
                <span className="text-sm font-medium">{t('common.appStore') || 'App Store'}</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/download"
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <FaGooglePlay className="text-xl" />
                <span className="text-sm font-medium">{t('common.googlePlay') || 'Google Play'}</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSwitcher />
            {/* <ThemeToggle /> */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm lg:hidden"
                style={{ top: '64px' }}
              />
              
              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 shadow-xl lg:hidden border-t border-gray-100 dark:border-gray-800"
              >
                <div className="container mx-auto px-4 py-6 space-y-4">
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-semibold' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 dark:border-gray-800 my-4"></div>

                  {/* App Download Buttons */}
                  <div className="space-y-3 px-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {t('footer.downloadApps') || 'Download our apps'}
                    </p>
                    <Link
                      href="/download"
                      className="flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaApple className="text-xl" />
                      <span className="font-medium">{t('common.appStore') || 'App Store'}</span>
                    </Link>
                    <Link
                      href="/download"
                      className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaGooglePlay className="text-xl" />
                      <span className="font-medium">{t('common.googlePlay') || 'Google Play'}</span>
                    </Link>
                  </div>

                  {/* Registration Links */}
                  <div className="flex flex-col space-y-2 px-4 pt-2">
                    <Link
                      href="/download"
                      className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('hero.registerOwner') || 'Register as Freight Owner'} →
                    </Link>
                    <Link
                      href="/download"
                      className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('hero.registerDriver') || 'Register as Freight Vehicle Driver/Owner'} →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}