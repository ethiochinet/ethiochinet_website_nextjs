import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MEDIA_COLLECTION, MediaFeature, sortMedia } from '@/lib/media';

// Filters on status only and sorts client-side, so no composite index is needed.
export async function getPublishedMedia(): Promise<MediaFeature[]> {
  const snap = await getDocs(query(collection(db, MEDIA_COLLECTION), where('status', '==', 'published')));
  return sortMedia(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as MediaFeature[]);
}
