'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (post: any) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'blogPosts', post.id));
        toast.success('Post deleted successfully');
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post');
      }
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'category', 
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'published' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'publishedAt', 
      label: 'Published',
      render: (value: any) => value?.toDate?.().toLocaleDateString() || 'N/A'
    },
    {
      key: 'author',
      label: 'Author',
      render: (value: any) => value?.name || 'N/A'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Post
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        onEdit={(post) => window.location.href = `/admin/blog/edit/${post.id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search posts by title or category..."
      />

      {/* Preview link */}
      <div className="mt-4 text-right">
        <Link href="/blog" target="_blank" className="text-teal-600 hover:text-teal-700 text-sm inline-flex items-center">
          <HiEye className="w-4 h-4 mr-1" />
          View live blog
        </Link>
      </div>
    </div>
  );
}