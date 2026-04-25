import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogListing from '../blog/BlogListing';
import BlogDetail from '../blog/BlogDetail';
import type { Blog } from '../../types/blog';

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {selectedBlog ? (
        <BlogDetail
          blog={selectedBlog}
          onBack={() => setSelectedBlog(null)}
          onSelectBlog={setSelectedBlog}
        />
      ) : (
        <BlogListing onSelectBlog={setSelectedBlog} />
      )}
    </motion.div>
  );
}
