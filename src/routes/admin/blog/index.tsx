import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import BlogAdminPage from "../../../components/blog/BlogAdminPage";

export const Route = createFileRoute("/admin/blog/")({
  component: AdminBlogPageComponent,
});

function AdminBlogPageComponent() {
  const { colors } = useTheme();

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
        <div className="mb-8">
          <a
            href="/blog"
            className="text-sm" 
            style={{ color: "var(--primary)" }}
          >
            ← Back to Blog
          </a>
        </div>
        <BlogAdminPage />
      </motion.div>
    </div>
  );
}
