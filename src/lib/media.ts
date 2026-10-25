export type MediaType = 'tv' | 'youtube' | 'news' | 'other';

export interface MediaFeature {
  id: string;
  type: MediaType;
  title: string;
  outlet: string;
  url: string;
  thumbnail?: string;
  outletLogo?: string;
  summary?: string;
  publishedDate?: string; // YYYY-MM-DD
  featured: boolean;
  status: 'published' | 'hidden';
  order: number;
}

export const MEDIA_COLLECTION = 'mediaFeatures';

export const mediaTypeLabels: Record<MediaType, string> = {
  tv: 'TV',
  youtube: 'YouTube',
  news: 'News / Online',
  other: 'Other',
};

// Handles youtube.com/watch?v=, youtu.be/, /embed/, /shorts/ and /live/ links.
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
}

// Falls back to the YouTube thumbnail when no image was set.
export function getMediaThumbnail(item: Pick<MediaFeature, 'thumbnail' | 'url'>): string | null {
  if (item.thumbnail) return item.thumbnail;
  const id = getYouTubeId(item.url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function formatMediaDate(date?: string): string {
  if (!date) return '';
  const d = new Date(`${date}T00:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function sortMedia(items: MediaFeature[]): MediaFeature[] {
  return [...items].sort(
    (a, b) =>
      (a.order ?? 0) - (b.order ?? 0) ||
      (b.publishedDate || '').localeCompare(a.publishedDate || '')
  );
}
