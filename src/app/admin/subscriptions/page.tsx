'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiMail, HiDownload } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'newsletterSubscriptions'));
      const subsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscriptions(subsData);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sub: any) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await deleteDoc(doc(db, 'newsletterSubscriptions', sub.id));
        toast.success('Subscriber removed successfully');
        fetchSubscriptions();
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        toast.error('Failed to remove subscriber');
      }
    }
  };

  const exportToCSV = () => {
    const csvData = subscriptions.map(sub => ({
      Email: sub.email,
      'Subscribed Date': sub.subscribedAt?.toDate?.().toLocaleString() || sub.createdAt?.toDate?.().toLocaleString() || 'N/A',
      Status: sub.status || 'active',
      Source: sub.source || 'footer'
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns = [
    { key: 'email', label: 'Email' },
    { 
      key: 'subscribedAt', 
      label: 'Subscribed Date',
      render: (value: any, item: any) => 
        value?.toDate?.().toLocaleString() || item.createdAt?.toDate?.().toLocaleString() || 'N/A'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value || 'active'}
        </span>
      )
    },
    { 
      key: 'source', 
      label: 'Source',
      render: (value: string) => value || 'footer'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscriptions</h1>
          <p className="text-gray-600">Manage email subscribers</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiDownload className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </div>

      <DataTable
        columns={columns}
        data={subscriptions}
        onDelete={handleDelete}
        searchPlaceholder="Search by email..."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-teal-500" />
            <span className="text-2xl font-bold text-gray-900">{subscriptions.length}</span>
          </div>
          <p className="text-gray-600">Total Subscribers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">
              {subscriptions.filter(s => s.status !== 'unsubscribed').length}
            </span>
          </div>
          <p className="text-gray-600">Active Subscribers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">
              {new Set(subscriptions.map(s => s.source)).size}
            </span>
          </div>
          <p className="text-gray-600">Subscription Sources</p>
        </div>
      </div>
    </div>
  );
}