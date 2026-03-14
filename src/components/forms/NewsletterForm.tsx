// src/components/forms/NewsletterForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { submitNewsletter } from '@/lib/firebase/firestore';
import { HiMail } from 'react-icons/hi';

interface FormData {
  email: string;
}

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await submitNewsletter(data.email);
      if (result.success) {
        toast.success('Successfully subscribed to newsletter!');
        reset();
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="relative">
        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-white placeholder-gray-500"
        />
      </div>
      {errors.email && (
        <p className="text-sm text-red-400">{errors.email.message}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}