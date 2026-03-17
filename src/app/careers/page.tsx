// src/app/careers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getJobVacancies } from '@/lib/firebase/firestore';
import { HiBriefcase, HiLocationMarker, HiClock } from 'react-icons/hi';

interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedAt: any;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobVacancies();
      setJobs(data as JobVacancy[]);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers at Ethiochinet</h1>
          <p className="text-xl text-gray-600 mb-8">
            Join us in transforming Ethiopia's logistics industry through technology
          </p>
          <div className="relative h-64 rounded-2xl overflow-hidden">
                          <Image
             src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
              alt="Ethiochinet Team Collaboration"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation First</h3>
              <p className="text-gray-600">We're always pushing boundaries to find better solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Collaborative</h3>
              <p className="text-gray-600">We believe in the power of teamwork and diverse perspectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mission-Driven</h3>
              <p className="text-gray-600">Every team member contributes to transforming logistics in Ethiopia</p>
            </div>
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
                >
                  <Link href={`/careers/${job.id}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <HiBriefcase className="w-4 h-4" />
                            <span>{job.department}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <HiLocationMarker className="w-4 h-4" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <HiClock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </span>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">
                        Apply Now
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">No open positions at the moment. Please check back later.</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}