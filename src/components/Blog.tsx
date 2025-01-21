import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BlogPost, { BlogPostProps } from './BlogPost';
import { getBlogPosts, BlogPost as BlogPostType } from '../utils/blogService';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts.filter(post => post.published));
      } catch (err) {
        console.error('Error in Blog component:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 bg-[#E9FFF9]">
      <Helmet>
        <title>Why Now? | Fynch - Social Shopping Platform</title>
        <meta name="description" content="Discover the latest trends, strategies, and success stories in social commerce. Learn why social shopping is transforming e-commerce today." />
        <meta property="og:title" content="Why Now? | Fynch - Social Shopping Platform" />
        <meta property="og:description" content="Discover the latest trends, strategies, and success stories in social commerce. Learn why social shopping is transforming e-commerce today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Now? | Fynch - Social Shopping Platform" />
        <meta name="twitter:description" content="Discover the latest trends, strategies, and success stories in social commerce. Learn why social shopping is transforming e-commerce today." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#351431] mb-4">
            Latest Insights & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, strategies, and success stories in social commerce
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogPost 
                key={post.id}
                title={post.title}
                author={post.author}
                excerpt={post.excerpt}
                date={post.created_at || ''}
                publishDate={post.publish_date}
                readTime={post.read_time_minutes}
                image={post.image}
                category={post.category}
                slug={post.slug}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}