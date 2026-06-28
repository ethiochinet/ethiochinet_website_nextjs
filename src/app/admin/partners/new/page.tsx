'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiArrowLeft, HiSave, HiLink, HiX } from 'react-icons/hi';
import { toast } from 'sonner';
import Image from 'next/image';

export default function NewPartnerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    category: '',
    website: '',
    order: 0,
    featured: false,
  });

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, logoUrl: url });
    
    // Reset error state and show preview for any URL
    setLogoError(false);
    if (url) {
      setLogoPreview(url);
    } else {
      setLogoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Create partner document - no URL validation
      const partnerData = {
        name: formData.name,
        logo: formData.logoUrl || null,
        website: formData.website || null,
        category: formData.category,
        order: Number(formData.order),
        featured: formData.featured,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, 'partners'), partnerData);
      
      toast.success('Partner added successfully');
      router.push('/admin/partners');
      router.refresh();
    } catch (error) {
      console.error('Error adding partner:', error);
      toast.error('Failed to add partner');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link 
            href="/admin/partners" 
            className="inline-flex items-center text-gray-600 hover:text-teal-600 mb-2 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4 mr-1" />
            Back to Partners
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Partner</h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            {/* Logo URL Input - No Validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <HiLink className="w-4 h-4 mr-1 text-teal-600" />
                  Logo URL
                </span>
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={handleLogoUrlChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                    placeholder="https://example.com/logo.png"
                  />
                  <HiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                {/* Logo Preview - Shows for any URL */}
                {logoPreview && !logoError && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600 mb-3">Preview:</p>
                    <div className="relative w-32 h-16 mx-auto">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        fill
                        className="object-contain"
                        onError={() => setLogoError(true)}
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                
                {logoError && (
                  <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                    ⚠️ Preview unavailable - but URL will still be saved
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Enter any URL for your partner's logo (no validation required)
                </p>
              </div>
            </div>

            {/* Partner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Ethiopian Airlines"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select category</option>
                <option value="aviation">Aviation</option>
                <option value="banking">Banking</option>
                <option value="telecom">Telecommunications</option>
                <option value="government">Government</option>
                <option value="education">Education</option>
                <option value="incubator">Incubator</option>
                <option value="technology">Technology</option>
                <option value="Client">Client</option>
              </select>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first
              </p>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured partner (display prominently)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <Link
                href="/admin/partners"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                <HiSave className="w-5 h-5 mr-2" />
                {saving ? 'Saving...' : 'Save Partner'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}