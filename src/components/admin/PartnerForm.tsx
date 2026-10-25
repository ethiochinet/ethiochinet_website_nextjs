'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiSave } from 'react-icons/hi';
import ImageUploadField from '@/components/admin/ImageUploadField';

export interface PartnerFormData {
  name: string;
  logo: string;
  category: string;
  website: string;
  order: number;
  featured: boolean;
  isActive: boolean;
}

export const emptyPartner: PartnerFormData = {
  name: '',
  logo: '',
  category: '',
  website: '',
  order: 0,
  featured: false,
  isActive: true,
};

export const partnerCategories: { value: string; label: string }[] = [
  { value: 'aviation', label: 'Aviation' },
  { value: 'banking', label: 'Banking' },
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'government', label: 'Government' },
  { value: 'education', label: 'Education' },
  { value: 'incubator', label: 'Incubator' },
  { value: 'technology', label: 'Technology' },
  { value: 'Client', label: 'Client' },
];

// Firestore shape: empty optional fields are stored as null, like the original add form.
export function toPartnerDoc(data: PartnerFormData) {
  return {
    name: data.name.trim(),
    logo: data.logo || null,
    website: data.website || null,
    category: data.category,
    order: Number(data.order) || 0,
    featured: data.featured,
    isActive: data.isActive,
  };
}

interface PartnerFormProps {
  heading: string;
  initialData: PartnerFormData;
  saving: boolean;
  onSubmit: (data: PartnerFormData) => void;
}

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500';

export default function PartnerForm({ heading, initialData, saving, onSubmit }: PartnerFormProps) {
  const [formData, setFormData] = useState<PartnerFormData>(initialData);
  const set = (patch: Partial<PartnerFormData>) => setFormData({ ...formData, ...patch });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          <h1 className="text-2xl font-bold text-gray-900">{heading}</h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            <ImageUploadField
              label="Logo"
              value={formData.logo}
              onChange={(url) => set({ logo: url })}
              folder="partners"
              helperText="Upload a logo or paste its URL. A transparent PNG works best."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => set({ name: e.target.value })}
                className={inputClass}
                placeholder="e.g., Ethiopian Airlines"
              />
              <p className="mt-1 text-xs text-gray-500">Shown under the logo on the website</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => set({ category: e.target.value })}
                className={inputClass}
              >
                <option value="">Select category</option>
                {partnerCategories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
                {formData.category && !partnerCategories.some((c) => c.value === formData.category) && (
                  <option value={formData.category}>{formData.category}</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => set({ website: e.target.value })}
                className={inputClass}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => set({ order: parseInt(e.target.value) || 0 })}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => set({ isActive: e.target.value === 'active' })}
                className={inputClass}
              >
                <option value="active">Active (visible on website)</option>
                <option value="inactive">Inactive (hidden from website)</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => set({ featured: e.target.checked })}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured partner (display prominently)
              </label>
            </div>

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
