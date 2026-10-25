'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import Image from 'next/image';
import { HiPlus, HiExternalLink } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';
import { MEDIA_COLLECTION, MediaFeature, mediaTypeLabels, getMediaThumbnail, formatMediaDate, sortMedia } from '@/lib/media';

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, MEDIA_COLLECTION));
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })) as MediaFeature[];
      setItems(sortMedia(data));
    } catch (error) {
      console.error('Error fetching media coverage:', error);
      toast.error('Failed to load media coverage');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: MediaFeature) => {
    if (confirm(`Delete "${item.title}"?`)) {
      try {
        await deleteDoc(doc(db, MEDIA_COLLECTION, item.id));
        toast.success('Media item deleted');
        fetchItems();
      } catch (error) {
        console.error('Error deleting media item:', error);
        toast.error('Failed to delete media item');
      }
    }
  };

  const columns = [
    {
      key: 'thumbnail',
      label: 'Preview',
      render: (_: string, item: MediaFeature) => {
        const thumb = getMediaThumbnail(item);
        return (
          <div className="relative w-20 h-12 rounded overflow-hidden bg-gray-100">
            {thumb && <Image src={thumb} alt={item.title} fill className="object-cover" />}
          </div>
        );
      },
    },
    { key: 'title', label: 'Title' },
    { key: 'outlet', label: 'Outlet' },
    {
      key: 'type',
      label: 'Type',
      render: (value: MediaFeature['type']) => (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{mediaTypeLabels[value] || value}</span>
      ),
    },
    { key: 'publishedDate', label: 'Date', render: (value: string) => formatMediaDate(value) },
    {
      key: 'status',
      label: 'Status',
      render: (value: string, item: MediaFeature) => (
        <div className="flex flex-col gap-1">
          <span className={`px-2 py-1 rounded-full text-xs w-fit ${
            value === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
          }`}>
            {value}
          </span>
          {item.featured && (
            <span className="px-2 py-1 rounded-full text-xs w-fit bg-teal-100 text-teal-800">homepage</span>
          )}
        </div>
      ),
    },
    { key: 'order', label: 'Order' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading media coverage...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Coverage</h1>
          <p className="text-gray-600">TV features, YouTube videos, and news articles about Ethiochinet</p>
        </div>
        <Link
          href="/admin/media/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Media
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={items}
        onEdit={(item) => window.location.href = `/admin/media/edit/${item.id}`}
        onDelete={handleDelete}
        actions={(item) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-teal-600"
            title="Open link"
          >
            <HiExternalLink className="w-5 h-5" />
          </a>
        )}
        searchPlaceholder="Search by title or outlet..."
      />
    </div>
  );
}
