import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

function PostCard({ post }) {
  return (
    <div className="glass-card rounded-lg overflow-hidden card-hover fancy-border animate-fade-in">
      {post.imageURL && (
        <div className="relative overflow-hidden group">
          <img
            className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
            src={post.imageURL}
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1 text-primary-500" />
              <span>{post.username}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-primary-500" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Link
          to={`/post/${post._id}`}
          className="btn-primary inline-flex items-center group"
        >
          <span>Read More</span>
          <svg 
            className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
