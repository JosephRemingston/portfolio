import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Calendar, Eye, Clock, Tag as TagIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { incrementViewCount, getRelatedBlogs } from '../../lib/blog-api';
import BlogCard from './BlogCard';
import type { Blog } from '../../types/blog';

interface BlogDetailModalProps {
  blog: Blog;
  onClose: () => void;
}

export default function BlogDetailModal({ blog, onClose }: BlogDetailModalProps) {
  const { colors } = useTheme();
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    incrementViewCount(blog.id);
    loadRelatedBlogs();
  }, [blog.id]);

  const loadRelatedBlogs = async () => {
    try {
      const related = await getRelatedBlogs(blog.id, blog.tags, 3);
      setRelatedBlogs(related);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: `${colors.background}dd` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen py-8 px-4 flex items-center justify-center"
          >
            <div
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border p-8 relative"
              style={{
                backgroundColor: colors.background,
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-lg border transition-colors"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-muted)',
                }}
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Back button */}
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-3 py-2 rounded border transition-colors mb-6 text-sm"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {/* Cover Image */}
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
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
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 rounded border"
                        style={{
                          borderColor: 'var(--border-color)',
                          backgroundColor: 'transparent',
                          color: 'var(--foreground)',
                        }}
                      >
                        <TagIcon className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: 'var(--border-color)' }} />

              {/* Content */}
              <div
                className="prose dark:prose-invert max-w-none text-base leading-relaxed mb-6"
                style={{
                  color: 'var(--foreground)',
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Author section */}
              <div
                className="p-4 rounded border mb-6"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <p className="text-sm font-medium mb-1">Written by</p>
                <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                  {blog.author}
                </p>
              </div>

              {/* Related blogs */}
              {relatedBlogs.length > 0 && (
                <>
                  <div className="h-px mb-6" style={{ backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Related posts</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedBlogs.map((relatedBlog) => (
                        <BlogCard
                          key={relatedBlog.id}
                          blog={relatedBlog}
                          onClick={() => {
                            // Just close the modal and let parent handle the new selection
                            handleClose();
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
