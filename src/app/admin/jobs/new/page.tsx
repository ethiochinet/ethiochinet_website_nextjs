'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiArrowLeft, HiSave, HiPlus, HiX } from 'react-icons/hi';
import Link from 'next/link';
import { toast } from 'sonner';

export default function NewJobPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [qualifications, setQualifications] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    salary: '',
    isActive: true
  });

  const handleAddField = (setter: Function, currentArray: string[]) => {
    setter([...currentArray, '']);
  };

  const handleRemoveField = (setter: Function, currentArray: string[], index: number) => {
    if (currentArray.length > 1) {
      setter(currentArray.filter((_, i) => i !== index));
    }
  };

  const handleFieldChange = (setter: Function, currentArray: string[], index: number, value: string) => {
    const newArray = [...currentArray];
    newArray[index] = value;
    setter(newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Filter out empty requirements/responsibilities
      const filteredRequirements = requirements.filter(req => req.trim() !== '');
      const filteredResponsibilities = responsibilities.filter(resp => resp.trim() !== '');
      const filteredQualifications = qualifications.filter(qual => qual.trim() !== '');

      const jobData = {
        ...formData,
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
        qualifications: filteredQualifications,
        postedAt: Timestamp.now(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'jobVacancies'), jobData);
      toast.success('Job created successfully');
      router.push('/admin/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/jobs" className="text-teal-600 hover:text-teal-700 inline-flex items-center mb-2">
            <HiArrowLeft className="w-4 h-4 mr-1" />
            Back to Jobs
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Job Posting</h1>
        </div>
        <button
          type="submit"
          form="jobForm"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {saving ? 'Creating...' : 'Create Job'}
        </button>
      </div>

      <form id="jobForm" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Engineering, Operations, Marketing"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Addis Ababa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range (Optional)
            </label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Competitive, $50k - $70k, Negotiable"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Describe the role, responsibilities, and ideal candidate..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements *
            </label>
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  required={index === 0}
                  value={req}
                  onChange={(e) => handleFieldChange(setRequirements, requirements, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Requirement ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(setRequirements, requirements, index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setRequirements, requirements)}
              className="mt-2 flex items-center text-teal-600 hover:text-teal-700"
            >
              <HiPlus className="w-4 h-4 mr-1" />
              Add Requirement
            </button>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities *
            </label>
            {responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  required={index === 0}
                  value={resp}
                  onChange={(e) => handleFieldChange(setResponsibilities, responsibilities, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Responsibility ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(setResponsibilities, responsibilities, index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setResponsibilities, responsibilities)}
              className="mt-2 flex items-center text-teal-600 hover:text-teal-700"
            >
              <HiPlus className="w-4 h-4 mr-1" />
              Add Responsibility
            </button>
          </div>

          {/* Qualifications (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualifications (Optional)
            </label>
            {qualifications.map((qual, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={qual}
                  onChange={(e) => handleFieldChange(setQualifications, qualifications, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Qualification ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(setQualifications, qualifications, index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setQualifications, qualifications)}
              className="mt-2 flex items-center text-teal-600 hover:text-teal-700"
            >
              <HiPlus className="w-4 h-4 mr-1" />
              Add Qualification
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active (visible on careers page)
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}