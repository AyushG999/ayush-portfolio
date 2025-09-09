import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import { 
  CalendarIcon, 
  UserIcon, 
  ArrowLeftIcon,
  ClockIcon,
  BookmarkIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    apiRequest(`/api/posts/${id}`)
      .then(post => {
        setPost(post);
        // Calculate estimated read time (rough estimate: 200 words per minute)
        const wordCount = post.content.split(/\s+/).length;
        setReadTime(Math.ceil(wordCount / 200));
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-dots-pattern">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 animate-fade-in"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Posts
          </Link>
          
          <div className="glass-card rounded-xl p-8 shadow-2xl animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-up">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>{post.username}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {post.imageURL && (
              <div className="relative rounded-lg overflow-hidden mb-8 animate-fade-in fancy-border" style={{ animationDelay: '0.3s' }}>
                <img
                  src={post.imageURL}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            <div className="flex justify-end space-x-4 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Save for later">
                <BookmarkIcon className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Share">
                <ShareIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {post.content}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enjoyed this article?</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">
                  Follow {post.username}
                </button>
                <button className="btn-primary bg-gray-600 hover:bg-gray-500">
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostDetail;
