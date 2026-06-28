'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiSave } from 'react-icons/hi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState({
    registeredDrivers: 0,
    freightPosted: 0,
    deliveriesCompleted: 0,
    citiesServed: 0,
    app_download: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statsId, setStatsId] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'statistics'));
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setStatsId(doc.id);
        setStats(doc.data() as any);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (statsId) {
        // Update existing
        await updateDoc(doc(db, 'statistics', statsId), {
          ...stats,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new
        const docRef = await addDoc(collection(db, 'statistics'), {
          ...stats,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        setStatsId(docRef.id);
      }
      toast.success('Statistics updated successfully');
    } catch (error) {
      console.error('Error saving statistics:', error);
      toast.error('Failed to save statistics');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Statistics</h1>
          <p className="text-gray-600">Update real-time platform numbers</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Drivers
            </label>
            <input
              type="number"
              value={stats.registeredDrivers}
              onChange={(e) => setStats({ ...stats, registeredDrivers: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Freight Posted
            </label>
            <input
              type="number"
              value={stats.freightPosted}
              onChange={(e) => setStats({ ...stats, freightPosted: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deliveries Completed
            </label>
            <input
              type="number"
              value={stats.deliveriesCompleted}
              onChange={(e) => setStats({ ...stats, deliveriesCompleted: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cities Served
            </label>
            <input
              type="number"
              value={stats.citiesServed}
              onChange={(e) => setStats({ ...stats, citiesServed: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Downloads (as string, e.g., "10000")
            </label>
            <input
              type="text"
              value={stats.app_download}
              onChange={(e) => setStats({ ...stats, app_download: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="10000"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These statistics will be displayed on the homepage hero section and stats section. Make sure to enter accurate numbers.
          </p>
        </div>
      </motion.div>
    </div>
  );
}