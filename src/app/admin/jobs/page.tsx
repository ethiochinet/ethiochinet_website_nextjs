'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { HiPlus, HiEye } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'jobVacancies'));
      const jobsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (job: any) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteDoc(doc(db, 'jobVacancies', job.id));
        toast.success('Job deleted successfully');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
      }
    }
  };

  const handleToggleStatus = async (job: any) => {
    try {
      // Toggle job active status
      // You'll need to implement this
      toast.success('Job status updated');
    } catch (error) {
      toast.error('Failed to update job status');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { 
      key: 'isActive', 
      label: 'Status',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'postedAt', 
      label: 'Posted',
      render: (value: any) => value?.toDate?.().toLocaleDateString() || 'N/A'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Vacancies</h1>
          <p className="text-gray-600">Manage job postings</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Job
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        onEdit={(job) => window.location.href = `/admin/jobs/edit/${job.id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search jobs by title or department..."
      />

      <div className="mt-4 text-right">
        <Link href="/careers" target="_blank" className="text-teal-600 hover:text-teal-700 text-sm inline-flex items-center">
          <HiEye className="w-4 h-4 mr-1" />
          View live careers page
        </Link>
      </div>
    </div>
  );
}