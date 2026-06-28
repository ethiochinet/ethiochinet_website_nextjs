'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { HiPlus, HiEye } from 'react-icons/hi';
import { toast } from 'sonner';
import Image from 'next/image';
import DataTable from '@/components/admin/DataTable';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'partners'));
      const partnersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPartners(partnersData);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (partner: any) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      try {
        await deleteDoc(doc(db, 'partners', partner.id));
        toast.success('Partner deleted successfully');
        fetchPartners();
      } catch (error) {
        console.error('Error deleting partner:', error);
        toast.error('Failed to delete partner');
      }
    }
  };

  const columns = [
    { 
      key: 'logo', 
      label: 'Logo',
      render: (value: string, item: any) => (
        <div className="relative w-16 h-16">
          <Image
            src={value || '/images/placeholder.png'}
            alt={item.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )
    },
    { key: 'name', label: 'Name' },
    { 
      key: 'category', 
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { 
      key: 'featured', 
      label: 'Featured',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
    { key: 'order', label: 'Display Order' },
    { 
      key: 'website', 
      label: 'Website',
      render: (value: string) => value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
          Visit
        </a>
      ) : 'N/A'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-600">Manage partner organizations</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Partner
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={partners}
        onEdit={(partner) => window.location.href = `/admin/partners/edit/${partner.id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search partners by name or category..."
      />
    </div>
  );
}