'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy, where } from 'firebase/firestore'; // Added 'where' import
import { db, auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { HiMail, HiDownload, HiEye, HiCheck, HiX, HiRefresh } from 'react-icons/hi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '@/components/admin/DataTable';

export default function AdminApplicantsPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [jobs, setJobs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Debug states
  const [authStatus, setAuthStatus] = useState<string>('Checking authentication...');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  const [firestoreUser, setFirestoreUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthStatus(`✅ Authenticated as: ${user.email} (UID: ${user.uid})`);
        console.log('User authenticated:', user.email);
        
        // Check user role in Firestore
        try {
          console.log('Checking Firestore for user:', user.email);
          const usersRef = collection(db, 'users');
          const userQuery = query(usersRef, where('email', '==', user.email));
          const userSnapshot = await getDocs(userQuery);
          
          if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();
            setFirestoreUser({ id: userDoc.id, ...userData });
            setUserRole(userData.role);
            console.log('User role from Firestore:', userData.role);
            setDebugInfo(prev => [...prev, { 
              type: 'success', 
              message: `Found user in Firestore with role: ${userData.role}` 
            }]);
          } else {
            setUserRole('no-role');
            setFirestoreUser(null);
            console.log('No user document found in Firestore');
            setDebugInfo(prev => [...prev, { 
              type: 'error', 
              message: 'No user document found in Firestore users collection' 
            }]);
          }
        } catch (error: any) {
          console.error('Error fetching user role:', error);
          setDebugInfo(prev => [...prev, { 
            type: 'error', 
            message: `Error checking user role: ${error.message}` 
          }]);
        }
      } else {
        setAuthStatus('❌ Not authenticated');
        console.log('No user authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authStatus.includes('Authenticated')) {
      if (userRole === 'admin') {
        console.log('User is admin, fetching data...');
        fetchData();
      } else if (userRole === 'no-role') {
        setError('You are authenticated but not found in Firestore users collection');
        setLoading(false);
      } else if (userRole && userRole !== 'admin') {
        setError(`You have role "${userRole}" but need "admin" privileges`);
        setLoading(false);
      }
    }
  }, [authStatus, userRole]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo([]);

      console.log('=== Starting fetchData ===');
      console.log('Current user:', auth.currentUser?.email);

      // Test 1: Check if we can access any collection
      try {
        const testQuery = await getDocs(collection(db, 'jobVacancies'));
        console.log('✅ Test 1: Can access jobVacancies collection');
        setDebugInfo(prev => [...prev, { type: 'success', message: 'Can access jobVacancies' }]);
      } catch (error: any) {
        console.error('❌ Test 1: Cannot access jobVacancies:', error);
        setDebugInfo(prev => [...prev, { type: 'error', message: `jobVacancies: ${error.message}` }]);
      }

      // Test 2: Try to access jobApplications
      try {
        const testQuery = await getDocs(collection(db, 'jobApplications'));
        console.log('✅ Test 2: Can access jobApplications collection');
        setDebugInfo(prev => [...prev, { type: 'success', message: 'Can access jobApplications' }]);
      } catch (error: any) {
        console.error('❌ Test 2: Cannot access jobApplications:', error);
        setDebugInfo(prev => [...prev, { type: 'error', message: `jobApplications: ${error.message}` }]);
      }

      // Fetch jobs
      console.log('Fetching jobs...');
      const jobsSnapshot = await getDocs(collection(db, 'jobVacancies'));
      console.log(`Found ${jobsSnapshot.size} jobs`);
      
      const jobsMap: Record<string, string> = {};
      jobsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        jobsMap[doc.id] = data.title || 'Unknown Position';
        console.log('Job:', doc.id, data.title);
      });
      setJobs(jobsMap);

      // Fetch applications
      console.log('Fetching applications...');
      const q = query(collection(db, 'jobApplications'), orderBy('appliedAt', 'desc'));
      const appsSnapshot = await getDocs(q);
      console.log(`Found ${appsSnapshot.size} applications`);
      
      const appsData = appsSnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Application:', doc.id, data.fullName, data.status);
        return {
          id: doc.id,
          ...data
        };
      });
      
      setApplicants(appsData);
      setDebugInfo(prev => [...prev, { type: 'success', message: `Loaded ${appsData.length} applications` }]);

    } catch (error: any) {
      console.error('❌ Error in fetchData:', error);
      setError(error.message);
      setDebugInfo(prev => [...prev, { type: 'error', message: error.message }]);
      toast.error('Failed to load applications: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicant: any, newStatus: string) => {
    try {
      console.log('Updating status for:', applicant.id, 'to', newStatus);
      await updateDoc(doc(db, 'jobApplications', applicant.id), {
        status: newStatus,
        reviewedAt: new Date().toISOString()
      });
      toast.success(`Status updated to ${newStatus}`);
      fetchData();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status: ' + error.message);
    }
  };

  const handleDelete = async (applicant: any) => {
    if (confirm('Delete this application?')) {
      try {
        console.log('Deleting application:', applicant.id);
        await deleteDoc(doc(db, 'jobApplications', applicant.id));
        toast.success('Application deleted');
        fetchData();
      } catch (error: any) {
        console.error('Error deleting application:', error);
        toast.error('Failed to delete: ' + error.message);
      }
    }
  };

  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'jobTitle', 
      label: 'Position',
      render: (value: string, item: any) => value || jobs[item.jobId] || 'N/A'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'reviewed' ? 'bg-blue-100 text-blue-800' :
          value === 'interviewed' ? 'bg-purple-100 text-purple-800' :
          value === 'accepted' ? 'bg-green-100 text-green-800' :
          value === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value || 'pending'}
        </span>
      )
    },
    { 
      key: 'appliedAt', 
      label: 'Applied',
      render: (value: any) => value?.toDate?.().toLocaleDateString() || 'N/A'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applicants</h1>
          <p className="text-gray-600">Total: {applicants.length} applications</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <HiRefresh className="w-5 h-5 mr-2" />
          Refresh
        </button>
      </div>

      {/* Debug Panel */}
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Debug Information</h3>
        <div className="space-y-2 text-sm">
          <p className={authStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {authStatus}
          </p>
          {userRole && (
            <p className={userRole === 'admin' ? 'text-green-600' : 'text-yellow-600'}>
              Role: {userRole}
            </p>
          )}
          {debugInfo.map((info, index) => (
            <p key={index} className={
              info.type === 'success' ? 'text-green-600' :
              info.type === 'error' ? 'text-red-600' :
              'text-yellow-600'
            }>
              {info.type === 'success' ? '✅' : info.type === 'error' ? '❌' : '⚠️'} {info.message}
            </p>
          ))}
          {error && (
            <p className="text-red-600 font-semibold">Error: {error}</p>
          )}
        </div>
      </div>

      {applicants.length === 0 && !error ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500">No applications yet</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={applicants}
          searchPlaceholder="Search by name, email, or position..."
          actions={(item) => (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedApplicant(item);
                  setShowDetails(true);
                }}
                className="text-teal-600 hover:text-teal-900"
                title="View Details"
              >
                <HiEye className="w-4 h-4" />
              </button>
              {item.cvUrl && (
                <a
                  href={item.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900"
                  title="Download CV"
                >
                  <HiDownload className="w-4 h-4" />
                </a>
              )}
              <select
                value={item.status || 'pending'}
                onChange={(e) => handleStatusChange(item, e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="interviewed">Interviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => handleDelete(item)}
                className="text-red-600 hover:text-red-900"
                title="Delete"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Applicant Details</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{selectedApplicant.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="font-medium">
                          {selectedApplicant.jobTitle || jobs[selectedApplicant.jobId]}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${selectedApplicant.email}`} className="text-teal-600 hover:underline">
                          {selectedApplicant.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a href={`tel:${selectedApplicant.phone}`} className="text-teal-600 hover:underline">
                          {selectedApplicant.phone}
                        </a>
                      </div>
                      {selectedApplicant.linkedIn && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">LinkedIn</p>
                          <a 
                            href={selectedApplicant.linkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:underline break-all"
                          >
                            {selectedApplicant.linkedIn}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedApplicant.coverLetter && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Cover Letter</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedApplicant.coverLetter}</p>
                    </div>
                  )}

                  {selectedApplicant.cvUrl && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">CV</h3>
                      <a
                        href={selectedApplicant.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                      >
                        <HiDownload className="w-5 h-5 mr-2" />
                        Download CV
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}