'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import MediaFeatureForm, { MediaFeatureFormData, emptyMediaFeature } from '@/components/admin/MediaFeatureForm';
import { MEDIA_COLLECTION } from '@/lib/media';

export default function NewMediaFeature() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: MediaFeatureFormData) => {
    setSaving(true);
    try {
      await addDoc(collection(db, MEDIA_COLLECTION), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      toast.success('Media item added');
      router.push('/admin/media');
    } catch (error) {
      console.error('Error adding media item:', error);
      toast.error('Failed to add media item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MediaFeatureForm
      heading="Add Media Coverage"
      initialData={emptyMediaFeature}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
