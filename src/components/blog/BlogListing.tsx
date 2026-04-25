import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import BlogCard from '../blog/BlogCard';
import BlogSearch from '../blog/BlogSearch';
import { listPublishedBlogs, getAllTags } from '../../lib/blog-api';
import type { Blog, BlogListResponse } from '../../types/blog';

interface BlogListingProps {
  onSelectBlog: (blog: Blog) => void;
}

export default function BlogListing({ onSelectBlog }: BlogListingProps) {
  const [blogs, setBlog] = useState<BlogListResponse | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadBlogs();
    loadTags();
  }, [page, search, selectedTags]);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await listPublishedBlogs(page, 9, search, selectedTags);
      setBlog(response);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await getAllTags();
      setAllTags(tags);
    } catch (err: any) {
      console.error(err);
    }
  };

  const totalPages = blogs ? Math.ceil(blogs.total / blogs.limit) : 0;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Search and Filters */}
      <BlogSearch
        onSearch={(query) => {
          setSearch(query);
          setPage(1);
        }}
        onTagFilter={(tags) => {
          setSelectedTags(tags);
          setPage(1);
        }}
        allTags={allTags}
      />

      {/* Blogs Grid */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader className="w-5 h-5 animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : blogs && blogs.blogs.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BlogCard blog={blog} onClick={() => onSelectBlog(blog)} />
              </motion.div>
            ))}
          </div>

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
                  // Show first, last, and current +/- 1
                  const show =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - page) <= 1;

                  if (!show) {
                    if (pageNum === 2 && page > 3) return <span key={`dots-${i}`}>…</span>;
                    return null;
                  }

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

          {/* Results info */}
          <div className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            Showing {(page - 1) * blogs.limit + 1} to {Math.min(page * blogs.limit, blogs.total)} of {blogs.total} posts
          </div>
        </div>
      ) : (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p>No blogs found. Check back soon!</p>
        </div>
      )}
    </motion.section>
  );
}
