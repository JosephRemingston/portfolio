import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  allTags: string[];
}

export default function BlogSearch({ onSearch, onTagFilter, allTags }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, onSearch]);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    onTagFilter(newTags);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
          }}
        />
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Filter by tag
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className="px-3 py-1.5 rounded border text-xs transition-colors"
                style={{
                  borderColor: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: selectedTags.includes(tag) ? 'var(--primary)' : 'transparent',
                  color: selectedTags.includes(tag) ? 'white' : 'var(--foreground)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
