'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MediaCard from '@/components/media/MediaCard';
import { getPublishedMedia } from '@/lib/firebase/mediaFeatures';
import { MediaFeature, MediaType, mediaTypeLabels } from '@/lib/media';

type Filter = 'all' | MediaType;

export default function MediaClient() {
  const [items, setItems] = useState<MediaFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    getPublishedMedia()
      .then(setItems)
      .catch((error) => console.error('Error fetching media coverage:', error))
      .finally(() => setLoading(false));
  }, []);

  const types = (Object.keys(mediaTypeLabels) as MediaType[]).filter((t) => items.some((i) => i.type === t));
  const visible = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ethiochinet <span className="text-teal-600">in the Media</span>
            </h1>
            <p className="text-xl text-gray-600">
              TV features, YouTube interviews, and news coverage of Ethiopia's AI-powered freight logistics platform
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {types.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {(['all', ...types] as Filter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === t ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t === 'all' ? 'All' : mediaTypeLabels[t]}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : visible.length === 0 ? (
            <p className="text-center text-gray-600 py-16">Media coverage will appear here soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
