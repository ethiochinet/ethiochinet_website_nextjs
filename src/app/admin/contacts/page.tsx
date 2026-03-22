'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiMail, HiPhone, HiUser, HiCalendar, HiCheck, HiX } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contactMessages'));
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (message: any) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contactMessages', message.id));
        toast.success('Message deleted successfully');
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  const handleMarkAsRead = async (message: any) => {
    try {
      await updateDoc(doc(db, 'contactMessages', message.id), {
        status: 'read',
        readAt: new Date().toISOString()
      });
      toast.success('Message marked as read');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const columns = [
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'new' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}>
          {value || 'new'}
        </span>
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
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
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600">Manage customer inquiries</p>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        onDelete={handleDelete}
        searchPlaceholder="Search messages by name, email, or subject..."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{messages.length}</span>
          </div>
          <p className="text-gray-600">Total Messages</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">
              {messages.filter(m => m.status === 'new').length}
            </span>
          </div>
          <p className="text-gray-600">Unread Messages</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <HiMail className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">
              {messages.filter(m => m.status === 'read').length}
            </span>
          </div>
          <p className="text-gray-600">Read Messages</p>
        </div>
      </div>
    </div>
  );
}