import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export type BlogPostProps = {
  title: string;
  author: string;
  excerpt: string;
  date: string;
  publishDate: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
};

export default function BlogPost({ title, author, excerpt, date, publishDate, readTime, image, category, slug }: BlogPostProps) {
  // Format the date safely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date not available';
    }
  };

  return (
    <Link 
      to={`/blog/${encodeURIComponent(slug)}`}
      className="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#008080] text-white text-sm rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[#008080]">By {author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(publishDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-[#351431] mb-2 group-hover:text-[#008080] transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {excerpt}
        </p>
        <span 
          className="inline-flex items-center gap-2 text-[#008080] font-medium"
        >
          Read More
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}