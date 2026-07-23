'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { HiArrowLeft, HiSave } from 'react-icons/hi';
import Link from 'next/link';
import { toast } from 'sonner';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Logistics Technology',
    status: 'draft',
    featuredImage: '',
    tags: '',
    authorName: '',
    authorAvatar: '',
    authorBio: '',
  });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const docRef = doc(db, 'blogPosts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          category: data.category || 'Logistics Technology',
          status: data.status || 'draft',
          featuredImage: data.featuredImage || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
          authorName: data.author?.name || '',
          authorAvatar: data.author?.avatar || '',
          authorBio: data.author?.bio || '',
        });
      } else {
        toast.error('Post not found');
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { authorName, authorAvatar, authorBio, ...rest } = formData;
      const updateData: any = {
        ...rest,
        author: {
          name: authorName || 'Ethiochinet Admin',
          avatar: authorAvatar || '',
          bio: authorBio || '',
        },
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        updatedAt: Timestamp.now(),
      };

      if (formData.status === 'published') {
        updateData.publishedAt = Timestamp.now();
      }

      await updateDoc(doc(db, 'blogPosts', id), updateData);
      toast.success('Post updated successfully');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/blog" className="text-teal-600 hover:text-teal-700 inline-flex items-center mb-2">
            <HiArrowLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        </div>
        <button
          type="submit"
          form="blogEditForm"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form id="blogEditForm" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="leave-empty-to-keep-existing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Summary) *</label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
              placeholder="Markdown supported — e.g. **bold**, _italic_, ## headings, - lists, [links](url)"
            />
            <p className="text-xs text-gray-500 mt-1">Markdown is supported and rendered on the blog page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Logistics Technology</option>
                <option>Startup Updates</option>
                <option>Freight Industry</option>
                <option>Driver Stories</option>
                <option>Ethiopian Economy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <ImageUploadField
            label="Featured Image"
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            folder="user_images"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="technology, logistics, ethiopia"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">Author Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                <input
                  type="text"
                  required
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Mulualem Tesfaye"
                />
              </div>

              <ImageUploadField
                label="Author Avatar"
                value={formData.authorAvatar}
                onChange={(url) => setFormData({ ...formData, authorAvatar: url })}
                folder="user_images"
                previewShape="circle"
                required
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio (optional)</label>
                <input
                  type="text"
                  value={formData.authorBio}
                  onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Logistics Specialist at Ethiochinet"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
