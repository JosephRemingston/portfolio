import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye, Clock, Tag as TagIcon } from 'lucide-react';
import BlogCard from '../blog/BlogCard';
import { incrementViewCount, getRelatedBlogs } from '../../lib/blog-api';
import type { Blog } from '../../types/blog';

interface BlogDetailProps {
  blog: Blog;
  onBack: () => void;
  onSelectBlog: (blog: Blog) => void;
}

export default function BlogDetail({ blog, onBack, onSelectBlog }: BlogDetailProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    incrementViewCount(blog.id);
    loadRelatedBlogs();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blog.id]);

  const loadRelatedBlogs = async () => {
    try {
      const related = await getRelatedBlogs(blog.id, blog.tags, 3);
      setRelatedBlogs(related);
    } catch (err: any) {
      console.error(err);
    }
  };

  const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-2 rounded border transition-colors text-sm"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to blogs
      </button>

      {/* Container */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Cover Image */}
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{blog.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {publishDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {blog.readingTime} min read
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {blog.viewCount} views
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-sm px-3 py-1 rounded border" style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                }}>
                  <TagIcon className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none text-base leading-relaxed"
          style={{
            color: 'var(--foreground)',
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author */}
        <div
          className="p-4 rounded border"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div className="text-sm">
            <p style={{ color: 'var(--text-muted)' }}>By {blog.author}</p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-xl font-semibold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard
                key={relatedBlog.id}
                blog={relatedBlog}
                onClick={() => onSelectBlog(relatedBlog)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
