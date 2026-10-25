'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import PartnerForm, { PartnerFormData, emptyPartner, toPartnerDoc } from '@/components/admin/PartnerForm';

export default function NewPartnerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: PartnerFormData) => {
    setSaving(true);
    try {
      await addDoc(collection(db, 'partners'), {
        ...toPartnerDoc(data),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
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
    <PartnerForm
      heading="Add New Partner"
      initialData={emptyPartner}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
