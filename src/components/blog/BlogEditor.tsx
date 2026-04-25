import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Loader } from 'lucide-react';
import TipTapEditor from '../blog/TipTapEditor';
import { supabase } from '../../lib/supabase';
import type { Blog, CreateBlogInput } from '../../types/blog';
import { createBlog, updateBlog, deleteBlog, togglePublishBlog } from '../../lib/blog-api';

interface BlogEditorProps {
  blog?: Blog;
  onBack: () => void;
  onSave: () => void;
}

export default function BlogEditor({ blog, onBack, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [content, setContent] = useState(blog?.content || '');
  const [coverImage, setCoverImage] = useState(blog?.coverImage || '');
  const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
  const [status, setStatus] = useState<'draft' | 'published'>(blog?.status || 'draft');
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      setError('Title, excerpt, and content are required');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const input: CreateBlogInput = {
        title: title.trim(),
        content,
        excerpt: excerpt.trim(),
        coverImage: coverImage.trim() || undefined,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
      };

      if (blog) {
        await updateBlog(blog.id, input);
        setSuccess('Blog updated successfully');
      } else {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (!userId) {
          // For public/demo mode, generate a UUID
          await createBlog(input, 'demo-user-' + Date.now());
        } else {
          await createBlog(input, userId);
        }
        setSuccess('Blog created successfully');
      }

      setTimeout(() => onSave(), 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!blog) return;

    try {
      setIsLoading(true);
      setError('');
      await togglePublishBlog(blog.id, status === 'draft');
      setStatus(status === 'published' ? 'draft' : 'published');
      setSuccess(`Blog ${status === 'published' ? 'unpublished' : 'published'}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blog) return;
    if (!confirm('Delete this blog permanently? This cannot be undone.')) return;

    try {
      setIsLoading(true);
      setError('');
      await deleteBlog(blog.id);
      setSuccess('Blog deleted');
      setTimeout(() => onSave(), 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded border text-sm transition-colors mb-4"
            style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold">{blog ? 'Edit blog' : 'New blog post'}</h1>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">
            {blog ? 'Update and manage your blog post' : 'Create a new blog post for your portfolio'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-col sm:flex-row">
          {blog && (
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="px-4 py-2 rounded border text-sm transition-colors flex items-center justify-center gap-2"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--foreground)',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 rounded text-white text-sm transition-opacity flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          {blog && (
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 rounded border text-sm transition-opacity"
              style={{
                borderColor: '#ef4444',
                color: '#ef4444',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div className="mb-6 p-4 rounded border text-sm" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded border text-sm" style={{ borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
          {success}
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Title <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your blog post title"
            className="w-full px-3 py-2 rounded border outline-none transition-colors focus:border-opacity-100"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontSize: '16px', // prevents zoom on mobile
            }}
          />
          <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">
            URL slug will be auto-generated from this
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Excerpt <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary shown in blog listing"
            rows={3}
            className="w-full px-3 py-2 rounded border outline-none resize-none transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontSize: '16px',
            }}
          />
          <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">
            {excerpt.length} / 200 characters
          </p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Content <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{
            borderColor: 'var(--border-color)',
            border: '1px solid',
            borderRadius: '6px',
            backgroundColor: 'transparent',
          }}>
            <TipTapEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog post here..."
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 rounded border outline-none transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontSize: '16px',
            }}
          />
          {coverImage && (
            <div className="mt-3 rounded border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <img src={coverImage} alt="Cover preview" className="w-full h-48 object-cover" />
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, typescript, performance (comma-separated)"
            className="w-full px-3 py-2 rounded border outline-none transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontSize: '16px',
            }}
          />
          {tags && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.split(',').map((tag) => {
                const trimmed = tag.trim();
                return trimmed ? (
                  <span
                    key={trimmed}
                    className="px-2 py-1 rounded text-xs border"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'transparent',
                      color: 'var(--foreground)',
                    }}
                  >
                    {trimmed}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* SEO Section */}
        <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--foreground)' }}>
            SEO Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Blog title'}
                maxLength={60}
                className="w-full px-3 py-2 rounded border outline-none transition-colors"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                  fontSize: '16px',
                }}
              />
              <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">
                {metaTitle.length} / 60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || 'Blog excerpt'}
                maxLength={160}
                rows={2}
                className="w-full px-3 py-2 rounded border outline-none resize-none transition-colors"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                  fontSize: '16px',
                }}
              />
              <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">
                {metaDescription.length} / 160 characters
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
