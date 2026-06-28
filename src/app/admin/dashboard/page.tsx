'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  HiDocumentText, 
  HiBriefcase, 
  HiCurrencyDollar, 
  HiMail, 
  HiUserGroup, 
  HiStar, 
  HiQuestionMarkCircle,
  HiChartBar,
  HiRefresh
} from 'react-icons/hi';
import { toast } from 'sonner';

interface DashboardStats {
  totalBlogPosts: number;
  totalJobs: number;
  totalInvestments: number;
  totalContacts: number;
  totalPartners: number;
  totalTestimonials: number;
  totalFAQs: number;
  totalSubscriptions: number;
}

const statCards = [
  { title: 'Blog Posts', key: 'totalBlogPosts', icon: HiDocumentText, color: 'bg-blue-500', href: '/admin/blog' },
  { title: 'Job Vacancies', key: 'totalJobs', icon: HiBriefcase, color: 'bg-green-500', href: '/admin/jobs' },
  { title: 'Investments', key: 'totalInvestments', icon: HiCurrencyDollar, color: 'bg-purple-500', href: '/admin/investments' },
  { title: 'Contact Messages', key: 'totalContacts', icon: HiMail, color: 'bg-yellow-500', href: '/admin/contacts' },
  { title: 'Partners', key: 'totalPartners', icon: HiUserGroup, color: 'bg-indigo-500', href: '/admin/partners' },
  { title: 'Testimonials', key: 'totalTestimonials', icon: HiStar, color: 'bg-pink-500', href: '/admin/testimonials' },
  { title: 'FAQs', key: 'totalFAQs', icon: HiQuestionMarkCircle, color: 'bg-orange-500', href: '/admin/faqs' },
  { title: 'Subscriptions', key: 'totalSubscriptions', icon: HiMail, color: 'bg-teal-500', href: '/admin/subscriptions' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogPosts: 0,
    totalJobs: 0,
    totalInvestments: 0,
    totalContacts: 0,
    totalPartners: 0,
    totalTestimonials: 0,
    totalFAQs: 0,
    totalSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  const [authStatus, setAuthStatus] = useState<string>('Checking authentication...');

  useEffect(() => {
    // Check authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(`✅ Authenticated as: ${user.email}`);
        fetchDashboardData();
      } else {
        setAuthStatus('❌ Not authenticated');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async () => {
    setDebugInfo([]);
    
    try {
      const collections = [
        { name: 'blogPosts', label: 'Blog Posts' },
        { name: 'jobVacancies', label: 'Job Vacancies' },
        { name: 'investmentRegistrations', label: 'Investments' },
        { name: 'contactMessages', label: 'Contacts' },
        { name: 'partners', label: 'Partners' },
        { name: 'testimonials', label: 'Testimonials' },
        { name: 'faqs', label: 'FAQs' },
        { name: 'newsletterSubscriptions', label: 'Subscriptions' }
      ];

      const results: number[] = [];
      
      for (const col of collections) {
        try {
          console.log(`Fetching ${col.name}...`);
          const snapshot = await getDocs(collection(db, col.name));
          results.push(snapshot.size);
          setDebugInfo(prev => [...prev, { 
            collection: col.label, 
            status: 'success', 
            count: snapshot.size 
          }]);
        } catch (error: any) {
          console.error(`Error fetching ${col.name}:`, error);
          results.push(0);
          setDebugInfo(prev => [...prev, { 
            collection: col.label, 
            status: 'error', 
            error: error.message 
          }]);
        }
      }

      setStats({
        totalBlogPosts: results[0],
        totalJobs: results[1],
        totalInvestments: results[2],
        totalContacts: results[3],
        totalPartners: results[4],
        totalTestimonials: results[5],
        totalFAQs: results[6],
        totalSubscriptions: results[7],
      });

      // Fetch recent contact messages
      try {
        const contactsQuery = query(
          collection(db, 'contactMessages'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const contactsSnapshot = await getDocs(contactsQuery);
        const recentContacts = contactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentActivities(recentContacts);
      } catch (error: any) {
        console.error('Error fetching contacts:', error);
        setDebugInfo(prev => [...prev, { 
          collection: 'Recent Contacts', 
          status: 'error', 
          error: error.message 
        }]);
      }

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">{authStatus}</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <HiRefresh className="w-5 h-5 mr-2" />
          Refresh
        </button>
      </div>

      {/* Debug Panel */}
      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Collection Access Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {debugInfo.map((info, index) => (
            <div 
              key={index} 
              className={`p-2 rounded text-sm ${
                info.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <span className="font-medium">{info.collection}:</span>{' '}
              {info.status === 'success' 
                ? `✅ ${info.count} items` 
                : `❌ ${info.error}`}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const value = stats[card.key as keyof DashboardStats];
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={card.href}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">{card.title}</h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Contact Messages</h2>
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.message?.substring(0, 100)}...</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {activity.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent messages</p>
          )}
          <div className="mt-4 text-right">
            <Link href="/admin/contacts" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              View all →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/blog/new">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-center cursor-pointer">
                <HiDocumentText className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">New Blog Post</span>
              </div>
            </Link>
            <Link href="/admin/jobs/new">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-center cursor-pointer">
                <HiBriefcase className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">New Job</span>
              </div>
            </Link>
            <Link href="/admin/partners/new">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-center cursor-pointer">
                <HiUserGroup className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Partner</span>
              </div>
            </Link>
            <Link href="/admin/testimonials/new">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-center cursor-pointer">
                <HiStar className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Testimonial</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}