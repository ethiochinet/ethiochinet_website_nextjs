// src/app/investment/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { submitInvestmentInterest } from '@/lib/firebase/firestore';
import Image from 'next/image';

interface InvestmentForm {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

export default function InvestmentPage() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InvestmentForm>();

  const onSubmit = async (data: InvestmentForm) => {
    setSubmitting(true);
    try {
      const result = await submitInvestmentInterest(data);
      if (result.success) {
        toast.success('Thank you for your interest! We\'ll contact you soon.');
        reset();
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invest in Ethiopia's Digital Logistics Future
          </h1>
          <p className="text-xl text-gray-600">
            Join us in transforming the logistics landscape of Ethiopia through technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Investment Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Key Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Invest in Ethiochinet?</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Market Opportunity</span>
                  <span className="text-teal-600 font-bold">$500M+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700"> Users</span>
                  <span className="text-teal-600 font-bold">6,400+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Monthly Freight Transport</span>
                  <span className="text-teal-600 font-bold">4,000+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Cities Covered</span>
                  <span className="text-teal-600 font-bold">15+</span>
                </div>
              </div>
            </div>

            {/* Growth Potential */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Growth Potential</h2>
              <p className="text-gray-700 mb-4">
                Ethiopia's logistics market is rapidly evolving with increasing demand for digital solutions. 
                Ethiochinet is positioned to capture this growing market with our innovative platform.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Expanding to 25+ cities by 2027</li>
                <li>Integration with cross-border trade routes</li>
                <li>AI-powered route optimization</li>
                <li>Digital payment solutions for drivers</li>
              </ul>
            </div>

            {/* Investment Highlights */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Investment Highlights</h2>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold">Strong Founding Team</div>
                  <p className="text-teal-100">Experienced in logistics and technology</p>
                </div>
                <div>
                  <div className="font-semibold">Proven Traction</div>
                  <p className="text-teal-100">Growing user base and transaction volume</p>
                </div>
                <div>
                  <div className="font-semibold">Scalable Technology</div>
                  <p className="text-teal-100">Modern platform ready for expansion</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Investment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Express Interest</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization / Company *
                </label>
                <input
                  type="text"
                  {...register('organization', { required: 'Organization is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Interest *
                </label>
                <select
                  {...register('interest', { required: 'Please select an option' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                >
                  <option value="">Select interest level</option>
                  <option value="seed">Seed Investment</option>
                  <option value="series-a">Series A</option>
                  <option value="partnership">Strategic Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.interest && (
                  <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="Tell us more about your investment interest..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Interest'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}