'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { toast } from 'sonner';
import MediaFeatureForm, { MediaFeatureFormData, emptyMediaFeature } from '@/components/admin/MediaFeatureForm';
import { MEDIA_COLLECTION } from '@/lib/media';

export default function EditMediaFeature() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<MediaFeatureFormData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, MEDIA_COLLECTION, id));
        if (!snap.exists()) {
          setNotFound(true);
          return;
        }
        const data = snap.data() as any;
        setInitialData({
          ...emptyMediaFeature,
          ...Object.fromEntries(
            Object.keys(emptyMediaFeature).filter((k) => data[k] !== undefined).map((k) => [k, data[k]])
          ),
        });
      } catch (error) {
        console.error('Error loading media item:', error);
        toast.error('Failed to load media item');
        setNotFound(true);
      }
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (data: MediaFeatureFormData) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, MEDIA_COLLECTION, id), { ...data, updatedAt: Timestamp.now() });
      toast.success('Media item updated');
      router.push('/admin/media');
    } catch (error) {
      console.error('Error updating media item:', error);
      toast.error('Failed to update media item');
    } finally {
      setSaving(false);
    }
  };

  if (notFound) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Media item not found.</p>
        <Link href="/admin/media" className="text-teal-600 hover:text-teal-700">Back to Media Coverage</Link>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <MediaFeatureForm
      heading="Edit Media Coverage"
      initialData={initialData}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
