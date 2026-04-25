import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import BlogListing from "../../components/blog/BlogListing";
import BlogDetail from "../../components/blog/BlogDetail";
import { useState } from "react";
import type { Blog } from "../../types/blog";

export const Route = createFileRoute("/blog/")({
  component: BlogPageComponent,
});

function BlogPageComponent() {
  const { colors } = useTheme();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {selectedBlog ? (
          <BlogDetail
            blog={selectedBlog}
            onBack={() => setSelectedBlog(null)}
            onSelectBlog={setSelectedBlog}
          />
        ) : (
          <>
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">Blog</h1>
                <p style={{ color: `${colors.foreground}99` }} className="text-sm">
                  Thoughts on web development, performance, and best practices
                </p>
              </div>
              <a
                href="/admin/blog"
                className="px-3 py-2 text-xs rounded border transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--primary)",
                  color: "white",
                }}
                title="Blog Admin (Ctrl+Click to open in new tab)"
              >
                Admin
              </a>
            </div>
            <BlogListing onSelectBlog={setSelectedBlog} />
          </>
        )}
      </motion.div>
    </div>
  );
}
