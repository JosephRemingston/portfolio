import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, LogOut, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import AuthLoading from './AuthLoading';
import AdminBlogList from './AdminBlogList';
import BlogEditor from './BlogEditor';
import type { Blog } from '../../types/blog';

export default function BlogAdminPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setView('edit');
  };

  const handleNew = () => {
    setSelectedBlog(null);
    setView('new');
  };

  const handleBack = () => {
    setSelectedBlog(null);
    setView('list');
  };

  const handleSave = () => {
    setView('list');
    setSelectedBlog(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading state while checking auth
  if (isLoading) {
    return <AuthLoading />;
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Show admin dashboard if authenticated
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {view === 'list' && (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Blog Management</h1>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNew}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all"
                style={{
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                }}
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all disabled:opacity-50"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-muted)',
                }}
                title="Sign out"
              >
                {isLoggingOut ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <AdminBlogList onEdit={handleEdit} />
        </>
      )}

      {(view === 'new' || view === 'edit') && (
        <BlogEditor
          blog={selectedBlog || undefined}
          onBack={handleBack}
          onSave={handleSave}
        />
      )}
    </motion.div>
  );
}
