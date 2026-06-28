'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getJobVacancy, submitJobApplication } from '@/lib/firebase/firestore';
import { HiArrowLeft, HiLink } from 'react-icons/hi';

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
  linkedIn: string;
  cvUrl: string; // Changed from cv (FileList) to cvUrl (string)
  coverLetter: string;
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
      // Submit application with Google Drive URL
      const applicationData = {
        jobId: params.id,
        jobTitle: job?.title,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        linkedIn: data.linkedIn || null,
        cvUrl: data.cvUrl, // Google Drive URL
        coverLetter: data.coverLetter,
        status: 'pending',
        appliedAt: new Date().toISOString()
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

  // LinkedIn URL validation
  const validateLinkedInUrl = (url: string) => {
    if (!url) return true; // Optional field
    const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
    return linkedInRegex.test(url) || 'Please enter a valid LinkedIn profile URL';
  };

  // Google Drive URL validation
  const validateGoogleDriveUrl = (url: string) => {
    if (!url) return 'CV URL is required';
    
    // Check if it's a Google Drive URL
    const isGoogleDriveUrl = url.includes('drive.google.com') || 
                            url.includes('docs.google.com') ||
                            url.includes('drive.google.com/file/d/');
    
    if (!isGoogleDriveUrl) {
      return 'Please enter a valid Google Drive URL';
    }
    
    // Check if URL has a file ID
    const hasFileId = url.includes('/d/') || url.includes('id=');
    if (!hasFileId) {
      return 'URL must point to a specific file';
    }
    
    return true;
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

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="text-gray-700">{resp}</li>
                    ))}
                  </ul>
                </>
              )}
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
                  {...register('fullName', { 
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="Enter your full name"
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
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="you@example.com"
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
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9+\-\s()]{10,}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="+251 912 345 678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* LinkedIn URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <HiLink className="w-4 h-4 mr-1 text-teal-600" />
                    LinkedIn Profile URL (Optional)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    {...register('linkedIn', { 
                      validate: validateLinkedInUrl
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 pl-10"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                  <HiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {errors.linkedIn && (
                  <p className="mt-1 text-sm text-red-600">{errors.linkedIn.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Share your LinkedIn profile to help us learn more about your professional background
                </p>
              </div>

              {/* Google Drive URL Field - Replaces file upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <HiLink className="w-4 h-4 mr-1 text-teal-600" />
                    CV (Google Drive URL) *
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    {...register('cvUrl', { 
                      required: 'CV URL is required',
                      validate: validateGoogleDriveUrl
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 pl-10"
                    placeholder="https://drive.google.com/file/d/your-file-id/view"
                  />
                  <HiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {errors.cvUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvUrl.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Share a Google Drive link to your CV. Make sure the file is set to "Anyone with the link can view"
                </p>
                
                {/* Help Box */}
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800 font-medium mb-1">How to get a Google Drive shareable link:</p>
                  <ol className="text-xs text-blue-700 list-decimal pl-4 space-y-1">
                    <li>Upload your CV to Google Drive</li>
                    <li>Right-click the file → Share → Get link</li>
                    <li>Click "Change to anyone with the link"</li>
                    <li>Copy the link and paste it here</li>
                  </ol>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={5}
                  {...register('coverLetter')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}