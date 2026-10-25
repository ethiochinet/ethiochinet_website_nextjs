'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HiPlay, HiExternalLink, HiX, HiNewspaper, HiDesktopComputer } from 'react-icons/hi';
import { MediaFeature, mediaTypeLabels, getMediaThumbnail, getYouTubeEmbedUrl, formatMediaDate } from '@/lib/media';

export function VideoModal({ embedUrl, title, onClose }: { embedUrl: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          aria-label="Close video"
        >
          <HiX className="w-8 h-8" />
        </button>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function MediaCard({ item }: { item: MediaFeature }) {
  const [playing, setPlaying] = useState(false);
  const thumb = getMediaThumbnail(item);
  const embedUrl = getYouTubeEmbedUrl(item.url);
  const TypeIcon = item.type === 'news' ? HiNewspaper : HiDesktopComputer;

  const body = (
    <>
      <div className="relative aspect-video bg-gradient-to-br from-teal-600 to-blue-800">
        {thumb ? (
          <Image src={thumb} alt={item.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <TypeIcon className="w-16 h-16 text-white/60" />
          </div>
        )}
        {embedUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <HiPlay className="w-10 h-10 text-teal-600" />
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800">
          {mediaTypeLabels[item.type]}
        </span>
      </div>
      <div className="p-5 text-left">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="font-semibold text-teal-600">{item.outlet}</span>
          {item.publishedDate && <span>{formatMediaDate(item.publishedDate)}</span>}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
        {!embedUrl && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 mt-3">
            {item.type === 'news' ? 'Read article' : 'Watch'} <HiExternalLink className="w-4 h-4" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    'group block w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100';

  return (
    <>
      {embedUrl ? (
        <button type="button" onClick={() => setPlaying(true)} className={cardClass}>
          {body}
        </button>
      ) : (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
          {body}
        </a>
      )}
      {playing && embedUrl && (
        <VideoModal embedUrl={embedUrl} title={item.title} onClose={() => setPlaying(false)} />
      )}
    </>
  );
}
