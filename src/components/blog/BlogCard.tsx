import { Calendar, Eye, Clock, Tag } from 'lucide-react';
import type { Blog } from '../../types/blog';
import { useTheme } from '../../context/ThemeContext';

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
  const { colors, mode } = useTheme();
  const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article
      onClick={onClick}
      className="cursor-pointer group rounded-lg border p-4 sm:p-5 transition-colors hover:border-opacity-100"
      style={{
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
        backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.65)',
      }}
    >
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="mb-4 h-40 sm:h-48 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3
          className="text-base sm:text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity"
          style={{ color: colors.foreground }}
        >
          {blog.title}
        </h3>

        <p className="text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: `${colors.foreground}b3` }}>
          {blog.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-3" style={{ color: `${colors.foreground}99` }}>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {publishDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readingTime} min read
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {blog.viewCount} views
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] px-2 py-1 rounded border"
                style={{
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                  backgroundColor: 'transparent',
                  color: `${colors.foreground}99`,
                }}
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-[10px] text-gray-500">+{blog.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
