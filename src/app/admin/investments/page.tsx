'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiMail, HiPhone, HiCurrencyDollar, HiCalendar, HiCheck, HiX } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminInvestmentsPage() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'investmentRegistrations'));
      const investmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInvestments(investmentsData);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast.error('Failed to load investment inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (investment: any) => {
    if (confirm('Are you sure you want to delete this investment inquiry?')) {
      try {
        await deleteDoc(doc(db, 'investmentRegistrations', investment.id));
        toast.success('Investment inquiry deleted successfully');
        fetchInvestments();
      } catch (error) {
        console.error('Error deleting investment:', error);
        toast.error('Failed to delete investment inquiry');
      }
    }
  };

  const handleStatusChange = async (investment: any, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'investmentRegistrations', investment.id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Investment status updated to ${newStatus}`);
      fetchInvestments();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const columns = [
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const statusColors = {
          new: 'bg-yellow-100 text-yellow-800',
          contacted: 'bg-blue-100 text-blue-800',
          meeting: 'bg-purple-100 text-purple-800',
          closed: 'bg-green-100 text-green-800',
          lost: 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
            {value || 'new'}
          </span>
        );
      }
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'organization', label: 'Organization' },
    { 
      key: 'interest', 
      label: 'Interest',
      render: (value: string) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { 
      key: 'message', 
      label: 'Message',
      render: (value: string) => value?.substring(0, 50) + '...'
    },
    { 
      key: 'createdAt', 
      label: 'Received',
      render: (value: any) => value?.toDate?.().toLocaleString() || 'N/A'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Investment Inquiries</h1>
        <p className="text-gray-600">Manage potential investor contacts</p>
      </div>

      <DataTable
        columns={columns}
        data={investments}
        onDelete={handleDelete}
        searchPlaceholder="Search by name, email, or organization..."
      />

      {/* Status Update Modal would go here - for simplicity, we'll add quick action buttons in the table actions */}
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.status === 'new').length}
            </span>
          </div>
          <p className="text-gray-600">New Inquiries</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.status === 'contacted').length}
            </span>
          </div>
          <p className="text-gray-600">Contacted</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.status === 'meeting').length}
            </span>
          </div>
          <p className="text-gray-600">Meetings Scheduled</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiCurrencyDollar className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.interest === 'series-a').length}
            </span>
          </div>
          <p className="text-gray-600">Series A Interests</p>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Seed Interest</p>
            <p className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.interest === 'seed').length}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Series A Interest</p>
            <p className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.interest === 'series-a').length}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Partnership Interest</p>
            <p className="text-2xl font-bold text-gray-900">
              {investments.filter(i => i.interest === 'partnership').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}