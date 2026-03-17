'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function StatsSection() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        console.log('Fetching stats...');
        const statsDocRef = doc(db, 'statistics', 'sdMb0ulv8z7FfKjHclMH');
        const docSnap = await getDoc(statsDocRef);
        
        if (docSnap.exists()) {
          console.log('Stats found:', docSnap.data());
          setStats(docSnap.data());
        } else {
          setError('No stats found');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div className="p-10 text-white bg-gray-900">Loading...</div>;
  if (error) return <div className="p-10 text-red-500 bg-gray-900">{error}</div>;
  if (!stats) return <div className="p-10 text-white bg-gray-900">No data</div>;

  return (
    <div className="bg-gray-900 text-white p-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ethiochinet by the <span className="text-teal-300">Numbers</span>
          </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-teal-800 p-6 rounded-lg">
          <div className="text-4xl font-bold">{stats.registeredDrivers?.toLocaleString()}+</div>
          <div className="mt-2">Registered Drivers</div>
        </div>
        
        <div className="bg-teal-800 p-6 rounded-lg">
          <div className="text-4xl font-bold">{stats.freightPosted?.toLocaleString()}+</div>
          <div className="mt-2">Freight Posted</div>
        </div>
        
        <div className="bg-teal-800 p-6 rounded-lg">
          <div className="text-4xl font-bold">{stats.deliveriesCompleted?.toLocaleString()}+</div>
          <div className="mt-2">Deliveries Completed</div>
        </div>
        
        <div className="bg-teal-800 p-6 rounded-lg">
          <div className="text-4xl font-bold">{stats.citiesServed}</div>
          <div className="mt-2">Cities Served</div>
        </div>
        
        <div className="bg-teal-800 p-6 rounded-lg">
          <div className="text-4xl font-bold">{Number(stats.app_download || 0).toLocaleString()}+</div>
          <div className="mt-2">App Downloads</div>
        </div>
      </div>
      
     
    </div>
  );
}