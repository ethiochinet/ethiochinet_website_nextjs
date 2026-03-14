// src/app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getBlogPostBySlug } from '@/lib/firebase/firestore';
import { HiArrowLeft, HiCalendar, HiUser } from 'react-icons/hi';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featuredImage: string;
  category: string;
  publishedAt: any;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      loadPost();
    }
  }, [params.slug]);

  const loadPost = async () => {
    try {
      const data = await getBlogPostBySlug(params.slug as string);
      setPost(data as BlogPost);
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-teal-600 hover:text-teal-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-teal-600 mb-8 transition-colors"
          >
            <HiArrowLeft />
            <span>Back to Blog</span>
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <HiUser className="w-5 h-5" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <HiCalendar className="w-5 h-5" />
                <span>{format(post.publishedAt?.toDate(), 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-md">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}