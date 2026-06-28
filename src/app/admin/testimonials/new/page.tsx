'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiArrowLeft, HiSave } from 'react-icons/hi';
import Link from 'next/link';
import { toast } from 'sonner';

export default function NewTestimonial() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    rating: 5,
    content: '',
    image: '',
    order: 0,
    status: 'approved',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        ...formData,
        rating: Number(formData.rating),
        order: Number(formData.order),
        createdAt: Timestamp.now(),
      });
      toast.success('Testimonial added successfully');
      router.push('/admin/testimonials');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/testimonials" className="text-teal-600 hover:text-teal-700 inline-flex items-center mb-2">
            <HiArrowLeft className="w-4 h-4 mr-1" />
            Back to Testimonials
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add Testimonial</h1>
        </div>
        <button
          type="submit"
          form="testimonialForm"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Testimonial'}
        </button>
      </div>

      <form id="testimonialForm" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. Abebe Kebede"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role / Title *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. Freight Owner, Driver"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company (optional)</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. Addis Transport PLC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL (optional)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="approved">Approved (visible on site)</option>
              <option value="pending">Pending (hidden)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
            <input
              type="number"
              min={0}
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-500 mt-1">Lower number = shown first</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content *</label>
          <textarea
            required
            rows={5}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="What did the customer say about Ethiochinet?"
          />
        </div>
      </form>
    </div>
  );
}
