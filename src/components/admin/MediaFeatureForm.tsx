'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowLeft, HiSave } from 'react-icons/hi';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { MediaFeature, MediaType, mediaTypeLabels, getMediaThumbnail, getYouTubeId } from '@/lib/media';

export type MediaFeatureFormData = Omit<MediaFeature, 'id'>;

export const emptyMediaFeature: MediaFeatureFormData = {
  type: 'youtube',
  title: '',
  outlet: '',
  url: '',
  thumbnail: '',
  outletLogo: '',
  summary: '',
  publishedDate: '',
  featured: true,
  status: 'published',
  order: 0,
};

interface MediaFeatureFormProps {
  heading: string;
  initialData: MediaFeatureFormData;
  saving: boolean;
  onSubmit: (data: MediaFeatureFormData) => void;
}

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500';

const urlPlaceholders: Record<MediaType, string> = {
  tv: 'YouTube link of the TV segment, or the station\'s page',
  youtube: 'https://www.youtube.com/watch?v=...',
  news: 'https://news-site.com/article-about-ethiochinet',
  other: 'https://...',
};

export default function MediaFeatureForm({ heading, initialData, saving, onSubmit }: MediaFeatureFormProps) {
  const [formData, setFormData] = useState<MediaFeatureFormData>(initialData);
  const set = (patch: Partial<MediaFeatureFormData>) => setFormData({ ...formData, ...patch });

  const isYouTube = !!getYouTubeId(formData.url);
  const previewThumb = getMediaThumbnail(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, order: Number(formData.order) || 0 });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/media" className="text-teal-600 hover:text-teal-700 inline-flex items-center mb-2">
            <HiArrowLeft className="w-4 h-4 mr-1" />
            Back to Media Coverage
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{heading}</h1>
        </div>
        <button
          type="submit"
          form="mediaForm"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <form id="mediaForm" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media Type *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(mediaTypeLabels) as MediaType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => set({ type })}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  formData.type === type
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {mediaTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => set({ title: e.target.value })}
              className={inputClass}
              placeholder="e.g. Ethiochinet brings AI freight matching to Ethiopian truckers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media Outlet / Channel *</label>
            <input
              type="text"
              required
              value={formData.outlet}
              onChange={(e) => set({ outlet: e.target.value })}
              className={inputClass}
              placeholder="e.g. EBC, Fana TV, Addis Standard"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Published / Aired Date</label>
            <input
              type="date"
              value={formData.publishedDate}
              onChange={(e) => set({ publishedDate: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Link *</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => set({ url: e.target.value })}
              className={inputClass}
              placeholder={urlPlaceholders[formData.type]}
            />
            <p className="text-xs text-gray-500 mt-1">
              {isYouTube
                ? 'YouTube link detected: the video will play on the website and its thumbnail is used automatically.'
                : 'YouTube links play directly on the website. Other links open in a new tab.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ImageUploadField
              label="Thumbnail Image"
              value={formData.thumbnail || ''}
              onChange={(url) => set({ thumbnail: url })}
              folder="media"
              helperText={isYouTube ? 'Optional: leave empty to use the YouTube thumbnail.' : 'Recommended: a screenshot or the article image (16:9).'}
            />
            {!formData.thumbnail && previewThumb && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 mt-3">
                <Image src={previewThumb} alt="YouTube thumbnail preview" fill className="object-cover" />
              </div>
            )}
          </div>
          <ImageUploadField
            label="Outlet Logo"
            value={formData.outletLogo || ''}
            onChange={(url) => set({ outletLogo: url })}
            folder="media/logos"
            helperText="Optional: shown in the 'As seen on' logo strip on the homepage."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Summary</label>
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) => set({ summary: e.target.value })}
            className={inputClass}
            placeholder="One or two sentences about what the coverage says about Ethiochinet."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => set({ status: e.target.value as MediaFeatureFormData['status'] })}
              className={inputClass}
            >
              <option value="published">Published (visible on site)</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
            <input
              type="number"
              min={0}
              value={formData.order}
              onChange={(e) => set({ order: Number(e.target.value) })}
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">Lower number = shown first</p>
          </div>

          <label className="flex items-center gap-3 md:mt-8">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => set({ featured: e.target.checked })}
              className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">Feature on homepage</span>
          </label>
        </div>
      </form>
    </div>
  );
}
