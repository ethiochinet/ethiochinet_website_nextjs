'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import MediaCard from '@/components/media/MediaCard';
import { getPublishedMedia } from '@/lib/firebase/mediaFeatures';
import { MediaFeature } from '@/lib/media';

export default function MediaSection() {
  const [items, setItems] = useState<MediaFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedMedia()
      .then((data) => setItems(data.filter((item) => item.featured)))
      .catch((error) => console.error('Error fetching media coverage:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) {
    return null;
  }

  // One logo per outlet for the "As seen on" strip.
  const logos = items.filter(
    (item, i) => item.outletLogo && items.findIndex((o) => o.outlet === item.outlet && o.outletLogo) === i
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured in the Media</h2>
          <p className="text-xl text-gray-600">
            Ethiochinet on TV, YouTube, and in the news
          </p>
        </motion.div>

        {logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-12">
            <span className="text-sm uppercase tracking-widest text-gray-500">As seen on</span>
            {logos.map((item) => (
              <div key={item.id} className="relative h-10 w-28 grayscale hover:grayscale-0 transition">
                <Image src={item.outletLogo!} alt={item.outlet} fill className="object-contain" />
              </div>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MediaCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/media"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            View all media coverage
            <HiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
