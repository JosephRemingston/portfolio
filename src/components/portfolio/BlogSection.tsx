import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { listPublishedBlogs } from '../../lib/blog-api';
import BlogCard from '../blog/BlogCard';
import type { Blog } from '../../types/blog';
import { ANIMATION } from '../../lib/constants';
import { useTheme } from '../../context/ThemeContext';

interface BlogSectionProps {
  onSelectBlog: (blog: Blog) => void;
}

export default function BlogSection({ onSelectBlog }: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await listPublishedBlogs(1, 6);
        setBlogs(response.blogs);
      } catch (err) {
        console.error('Failed to load blogs:', err);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 flex justify-center">
        <Loader className="w-5 h-5 animate-spin" style={{ color: 'var(--primary)' }} />
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ color: `${colors.foreground}99` }}>
        Latest <span style={{ color: colors.foreground }} className="font-medium">
          posts
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.06 }}
            transition={{ delay: index * 0.1 }}
          >
            <BlogCard
              blog={blog}
              onClick={() => onSelectBlog(blog)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
