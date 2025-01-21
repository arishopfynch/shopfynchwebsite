import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { getBlogPosts } from '../utils/blogService';
import { Helmet } from 'react-helmet-async';
import BlogCTA from './BlogCTA';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        const allPosts = await getBlogPosts();
        const foundPost = allPosts?.find(p => p.slug === decodeURIComponent(slug || '') && p.published);
        setPost(foundPost || null);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Link to="/blog" className="text-[#008080] hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <Link to="/blog" className="text-[#008080] hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const description = post.excerpt || '';
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title || '');

  return (
    <article className="py-24 bg-white">
      <Helmet>
        <title>{post.title} | Fynch Blog</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={post.image} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={post.image} />
        
        {/* Article specific */}
        <meta property="article:published_time" content={new Date(post.publish_date).toISOString()} />
        <meta property="article:section" content={post.category} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#008080] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#E9FFF9] text-[#008080] rounded-full text-sm font-medium mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#351431] mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.read_time_minutes}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-headings:text-[#351431] prose-a:text-[#008080] hover:prose-a:text-[#006666] prose-blockquote:border-l-[#008080] prose-blockquote:bg-[#E9FFF9]/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg mb-12 max-w-none"
          >
            {post.middle_cta_enabled ? (
              <>
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content.split('</p>')[0] + '</p>'
                }} />
                <BlogCTA
                  title={post.cta_title}
                  description={post.cta_description}
                  buttonText={post.cta_button_text}
                  className="my-12"
                />
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content.split('</p>').slice(1).join('</p>')
                }} />
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </div>

          {post.bottom_cta_enabled && (
            <BlogCTA
              title={post.cta_title}
              description={post.cta_description}
              buttonText={post.cta_button_text}
              className="mb-12"
            />
          )}

          {/* Share Section */}
          <div className="border-t border-gray-100 mt-12 pt-8">
            <div className="flex items-center gap-4">
              <Share2 className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600 font-medium">Share this article:</span>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}