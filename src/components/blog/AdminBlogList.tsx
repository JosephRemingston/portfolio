import { useEffect, useState } from 'react';
import { Edit2, Eye, EyeOff, Trash2, Copy, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { listAllBlogs, deleteBlog, togglePublishBlog } from '../../lib/blog-api';
import type { Blog } from '../../types/blog';

interface AdminBlogListProps {
  onEdit: (blog: Blog) => void;
}

export default function AdminBlogList({ onEdit }: AdminBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadBlogs();
  }, [page, search]);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await listAllBlogs(page, limit, search);
      setBlogs(response.blogs);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blog: Blog) => {
    if (!confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;

    try {
      setIsLoading(true);
      await deleteBlog(blog.id);
      loadBlogs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePublish = async (blog: Blog) => {
    try {
      setIsLoading(true);
      await togglePublishBlog(blog.id, blog.status === 'draft');
      loadBlogs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopySlug = (slug: string) => {
    navigator.clipboard.writeText(slug);
    // Visual feedback could be added here
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full px-3 py-2 rounded border outline-none transition-colors"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Error messages */}
      {error && (
        <div className="p-3 rounded border text-sm" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          {error}
        </div>
      )}

      {/* Blogs list */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader className="w-5 h-5 animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : blogs.length > 0 ? (
        <div className="space-y-2 divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                {/* Title and slug */}
                <div className="mb-2">
                  <h3 className="font-medium text-sm truncate" style={{ color: 'var(--foreground)' }}>
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <code
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px solid',
                      }}
                    >
                      {blog.slug}
                    </code>
                    <button
                      onClick={() => handleCopySlug(blog.slug)}
                      className="p-1 rounded transition-colors"
                      style={{
                        color: 'var(--text-muted)',
                      }}
                      title="Copy slug"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span
                    className="px-2 py-1 rounded border"
                    style={{
                      borderColor: blog.status === 'published' ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: blog.status === 'published' ? 'transparent' : 'transparent',
                      color: blog.status === 'published' ? 'var(--primary)' : 'var(--text-muted)',
                    }}
                  >
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  <span>{blog.readingTime} min read</span>
                  <span>{blog.viewCount} views</span>
                  {blog.featured && (
                    <span
                      className="px-2 py-1 rounded border"
                      style={{
                        borderColor: '#f59e0b',
                        color: '#f59e0b',
                      }}
                    >
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handlePublish(blog)}
                  className="p-2 rounded border transition-colors"
                  style={{
                    borderColor: blog.status === 'published' ? 'var(--primary)' : 'var(--border-color)',
                    color: blog.status === 'published' ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                  title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {blog.status === 'published' ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onEdit(blog)}
                  className="p-2 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-muted)',
                  }}
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog)}
                  className="p-2 rounded border transition-colors"
                  style={{
                    borderColor: '#ef4444',
                    color: '#ef4444',
                  }}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
          <p>No blogs yet. Create your first post!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded border text-sm transition-colors disabled:opacity-50"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--foreground)',
            }}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className="px-3 py-2 rounded border text-sm transition-colors"
                  style={{
                    borderColor: page === pageNum ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: page === pageNum ? 'var(--primary)' : 'transparent',
                    color: page === pageNum ? 'white' : 'var(--foreground)',
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="px-3 py-2 rounded border text-sm transition-colors disabled:opacity-50"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--foreground)',
            }}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
}
