'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'faqs'));
      const faqsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFaqs(faqsData);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (faq: any) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteDoc(doc(db, 'faqs', faq.id));
        toast.success('FAQ deleted successfully');
        fetchFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        toast.error('Failed to delete FAQ');
      }
    }
  };

  const columns = [
    { 
      key: 'question', 
      label: 'Question',
      render: (value: string) => value?.substring(0, 60) + '...'
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { key: 'order', label: 'Display Order' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600">Manage frequently asked questions</p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add FAQ
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        onEdit={(faq) => window.location.href = `/admin/faqs/edit/${faq.id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search FAQs by question..."
      />
    </div>
  );
}