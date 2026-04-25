import { Loader } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AuthLoading() {
  const { colors } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="text-center space-y-4">
        <Loader className="w-8 h-8 animate-spin mx-auto" style={{ color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Checking authentication...</p>
      </div>
    </div>
  );
}
