'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { 
  HiHome, 
  HiDocumentText, 
  HiBriefcase, 
  HiCurrencyDollar, 
  HiMail, 
  HiUserGroup, 
  HiStar, 
  HiQuestionMarkCircle,
  HiChartBar,
  HiLogout,
  HiMenu,
  HiX
} from 'react-icons/hi';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HiHome },
  { name: 'Blog Posts', href: '/admin/blog', icon: HiDocumentText },
  { name: 'Job Vacancies', href: '/admin/jobs', icon: HiBriefcase },
  { name: 'Applicants', href: '/admin/applicants', icon: HiUserGroup }, // New link
  { name: 'Investments', href: '/admin/investments', icon: HiCurrencyDollar },
  { name: 'Contact Messages', href: '/admin/contacts', icon: HiMail },
  { name: 'Partners', href: '/admin/partners', icon: HiUserGroup },
  { name: 'Testimonials', href: '/admin/testimonials', icon: HiStar },
  { name: 'FAQs', href: '/admin/faqs', icon: HiQuestionMarkCircle },
  { name: 'Statistics', href: '/admin/statistics', icon: HiChartBar },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: HiMail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 bg-teal-600">
            <span className="text-white font-bold text-lg">Ethiochinet Admin</span>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-teal-100"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HiLogout className="mr-3 h-5 w-5 text-gray-400" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {auth.currentUser?.email}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}