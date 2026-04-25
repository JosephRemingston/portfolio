import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLogin() {
  const { login, isLoading, error } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setFormError(err.message || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: colors.background }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-lg border relative z-10"
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: colors.background,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LogIn className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          </div>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">
            Sign in to manage your blog
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full px-3 py-2 rounded border outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-3 py-2 rounded border outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Error message */}
          {(formError || error) && (
            <div
              className="p-3 rounded border text-sm"
              style={{
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
              }}
            >
              {formError || error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 rounded border font-medium text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              borderColor: 'var(--primary)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Help text */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            First time? Create an account in Supabase dashboard
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
