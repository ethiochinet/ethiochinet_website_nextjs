'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { toast } from 'sonner';
import PartnerForm, { PartnerFormData, toPartnerDoc } from '@/components/admin/PartnerForm';

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<PartnerFormData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'partners', id));
        if (!snap.exists()) {
          setNotFound(true);
          return;
        }
        const data = snap.data() as any;
        setInitialData({
          name: data.name || '',
          logo: data.logo || '',
          category: data.category || '',
          website: data.website || '',
          order: data.order ?? 0,
          featured: data.featured ?? false,
          isActive: data.isActive ?? true,
        });
      } catch (error) {
        console.error('Error loading partner:', error);
        toast.error('Failed to load partner');
        setNotFound(true);
      }
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (data: PartnerFormData) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'partners', id), { ...toPartnerDoc(data), updatedAt: Timestamp.now() });
      toast.success('Partner updated successfully');
      router.push('/admin/partners');
      router.refresh();
    } catch (error) {
      console.error('Error updating partner:', error);
      toast.error('Failed to update partner');
    } finally {
      setSaving(false);
    }
  };

  if (notFound) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Partner not found.</p>
        <Link href="/admin/partners" className="text-teal-600 hover:text-teal-700">Back to Partners</Link>
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
    <PartnerForm
      heading="Edit Partner"
      initialData={initialData}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
