import { s as useTheme } from "./supabase-DIJitN88.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { Calendar, Clock, Eye, Tag } from "lucide-react";
//#region node_modules/.nitro/vite/services/ssr/assets/BlogCard-CL3EuOyU.js
function BlogCard({ blog, onClick }) {
	const { colors, mode } = useTheme();
	const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
	return /* @__PURE__ */ jsxs("article", {
		onClick,
		className: "cursor-pointer group rounded-lg border p-4 sm:p-5 transition-colors hover:border-opacity-100",
		style: {
			borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
			backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.65)"
		},
		children: [blog.coverImage && /* @__PURE__ */ jsx("div", {
			className: "mb-4 h-40 sm:h-48 overflow-hidden rounded-lg bg-gray-100",
			children: /* @__PURE__ */ jsx("img", {
				src: blog.coverImage,
				alt: blog.title,
				className: "w-full h-full object-cover transition-transform group-hover:scale-105"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-base sm:text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity",
					style: { color: colors.foreground },
					children: blog.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2",
					style: { color: `${colors.foreground}b3` },
					children: blog.excerpt
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3 text-xs mb-3",
					style: { color: `${colors.foreground}99` },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }), publishDate]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
								blog.readingTime,
								" min read"
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5" }),
								blog.viewCount,
								" views"
							]
						})
					]
				}),
				blog.tags && blog.tags.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [blog.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxs("span", {
						className: "text-[10px] sm:text-[11px] px-2 py-1 rounded border",
						style: {
							borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
							backgroundColor: "transparent",
							color: `${colors.foreground}99`
						},
						children: [/* @__PURE__ */ jsx(Tag, { className: "w-3 h-3 inline mr-1" }), tag]
					}, tag)), blog.tags.length > 3 && /* @__PURE__ */ jsxs("span", {
						className: "text-[10px] text-gray-500",
						children: [
							"+",
							blog.tags.length - 3,
							" more"
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { BlogCard as t };
