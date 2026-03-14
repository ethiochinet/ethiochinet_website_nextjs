// src/app/careers/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getJobVacancy, submitJobApplication } from '@/lib/firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { HiArrowLeft, HiUpload } from 'react-icons/hi';

interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cv: FileList;
}

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobVacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationForm>();

  useEffect(() => {
    if (params.id) {
      loadJob();
    }
  }, [params.id]);

  const loadJob = async () => {
    try {
      const data = await getJobVacancy(params.id as string);
      setJob(data as JobVacancy);
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    setSubmitting(true);
    try {
      // Upload CV to Firebase Storage
      const storage = getStorage();
      const cvFile = data.cv[0];
      const cvRef = ref(storage, `cvs/${Date.now()}_${cvFile.name}`);
      await uploadBytes(cvRef, cvFile);
      const cvUrl = await getDownloadURL(cvRef);

      // Submit application
      const applicationData = {
        jobId: params.id,
        jobTitle: job?.title,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter,
        cvUrl,
        status: 'pending'
      };

      const result = await submitJobApplication(applicationData);
      
      if (result.success) {
        toast.success('Application submitted successfully!');
        router.push('/careers');
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse max-w-3xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link href="/careers" className="text-teal-600 hover:text-teal-700">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back Button */}
          <Link
            href="/careers"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-teal-600 mb-8 transition-colors"
          >
            <HiArrowLeft />
            <span>Back to Careers</span>
          </Link>

          {/* Job Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-teal-600 font-medium mb-4">{job.department}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {job.location}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {job.type}
              </span>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 mb-6">{job.description}</p>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={5}
                  {...register('coverLetter')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV (PDF, DOC, DOCX) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register('cv', { 
                      required: 'CV is required',
                      validate: {
                        fileType: (files) => {
                          const file = files[0];
                          if (!file) return true;
                          const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                          return validTypes.includes(file.type) || 'Please upload a PDF or Word document';
                        },
                        fileSize: (files) => {
                          const file = files[0];
                          if (!file) return true;
                          return file.size <= 5 * 1024 * 1024 || 'File size must be less than 5MB';
                        }
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cv.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}