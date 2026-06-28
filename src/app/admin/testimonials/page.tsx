'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { HiPlus, HiStar } from 'react-icons/hi';
import { toast } from 'sonner';
import Image from 'next/image';
import DataTable from '@/components/admin/DataTable';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (testimonial: any) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', testimonial.id));
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const handleToggleStatus = async (testimonial: any) => {
    try {
      await updateDoc(doc(db, 'testimonials', testimonial.id), {
        status: testimonial.status === 'approved' ? 'pending' : 'approved'
      });
      toast.success(`Testimonial ${testimonial.status === 'approved' ? 'unapproved' : 'approved'}`);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update testimonial status');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <HiStar
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const columns = [
    { 
      key: 'image', 
      label: 'Image',
      render: (value: string, item: any) => (
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={value || '/images/avatar-placeholder.jpg'}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'company', label: 'Company' },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (value: number) => renderStars(value)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
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
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage customer testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Testimonial
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={testimonials}
        onEdit={(testimonial) => window.location.href = `/admin/testimonials/edit/${testimonial.id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search testimonials by name or company..."
      />
    </div>
  );
}