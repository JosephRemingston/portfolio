import { s as useTheme } from "./supabase-DIJitN88.mjs";
import { a as incrementViewCount, i as getRelatedBlogs, r as getAllTags, s as listPublishedBlogs } from "./blog-api-abcMYIIJ.mjs";
import { t as BlogCard } from "./BlogCard-CL3EuOyU.mjs";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Calendar, Clock, Eye, Loader, Search, Tag } from "lucide-react";
import { motion } from "framer-motion";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-7ka_vB95.js
function BlogSearch({ onSearch, onTagFilter, allTags }) {
	const [query, setQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);
	useEffect(() => {
		const debounce = setTimeout(() => {
			onSearch(query);
		}, 300);
		return () => clearTimeout(debounce);
	}, [query, onSearch]);
	const handleTagToggle = (tag) => {
		const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
		setSelectedTags(newTags);
		onTagFilter(newTags);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4 mb-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [/* @__PURE__ */ jsx(Search, {
				className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
				style: { color: "var(--text-muted)" }
			}), /* @__PURE__ */ jsx("input", {
				type: "text",
				placeholder: "Search blogs...",
				value: query,
				onChange: (e) => setQuery(e.target.value),
				className: "w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-all",
				style: {
					borderColor: "var(--border-color)",
					backgroundColor: "transparent",
					color: "var(--foreground)"
				}
			})]
		}), allTags.length > 0 && /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-medium",
				style: { color: "var(--text-muted)" },
				children: "Filter by tag"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: allTags.map((tag) => /* @__PURE__ */ jsx("button", {
					onClick: () => handleTagToggle(tag),
					className: "px-3 py-1.5 rounded border text-xs transition-colors",
					style: {
						borderColor: selectedTags.includes(tag) ? "var(--primary)" : "var(--border-color)",
						backgroundColor: selectedTags.includes(tag) ? "var(--primary)" : "transparent",
						color: selectedTags.includes(tag) ? "white" : "var(--foreground)"
					},
					children: tag
				}, tag))
			})]
		})]
	});
}
function BlogListing({ onSelectBlog }) {
	const [blogs, setBlog] = useState(null);
	const [allTags, setAllTags] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);
	useEffect(() => {
		loadBlogs();
		loadTags();
	}, [
		page,
		search,
		selectedTags
	]);
	const loadBlogs = async () => {
		try {
			setIsLoading(true);
			setBlog(await listPublishedBlogs(page, 9, search, selectedTags));
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
	const loadTags = async () => {
		try {
			setAllTags(await getAllTags());
		} catch (err) {
			console.error(err);
		}
	};
	const totalPages = blogs ? Math.ceil(blogs.total / blogs.limit) : 0;
	return /* @__PURE__ */ jsxs(motion.section, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "space-y-8",
		children: [/* @__PURE__ */ jsx(BlogSearch, {
			onSearch: (query) => {
				setSearch(query);
				setPage(1);
			},
			onTagFilter: (tags) => {
				setSelectedTags(tags);
				setPage(1);
			},
			allTags
		}), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "flex justify-center py-16",
			children: /* @__PURE__ */ jsx(Loader, {
				className: "w-5 h-5 animate-spin",
				style: { color: "var(--primary)" }
			})
		}) : blogs && blogs.blogs.length > 0 ? /* @__PURE__ */ jsxs("div", {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: blogs.blogs.map((blog, index) => /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: index * .05 },
						children: /* @__PURE__ */ jsx(BlogCard, {
							blog,
							onClick: () => onSelectBlog(blog)
						})
					}, blog.id))
				}),
				totalPages > 1 && /* @__PURE__ */ jsxs("div", {
					className: "flex justify-center items-center gap-2 pt-4",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							className: "px-3 py-2 rounded border text-sm transition-colors disabled:opacity-50",
							style: {
								borderColor: "var(--border-color)",
								color: "var(--foreground)"
							},
							children: "Previous"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-1",
							children: Array.from({ length: totalPages }).map((_, i) => {
								const pageNum = i + 1;
								if (!(pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - page) <= 1)) {
									if (pageNum === 2 && page > 3) return /* @__PURE__ */ jsx("span", { children: "…" }, `dots-${i}`);
									return null;
								}
								return /* @__PURE__ */ jsx("button", {
									onClick: () => setPage(pageNum),
									className: "px-3 py-2 rounded border text-sm transition-colors",
									style: {
										borderColor: page === pageNum ? "var(--primary)" : "var(--border-color)",
										backgroundColor: page === pageNum ? "var(--primary)" : "transparent",
										color: page === pageNum ? "white" : "var(--foreground)"
									},
									children: pageNum
								}, pageNum);
							})
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setPage((p) => p + 1),
							disabled: page >= totalPages,
							className: "px-3 py-2 rounded border text-sm transition-colors disabled:opacity-50",
							style: {
								borderColor: "var(--border-color)",
								color: "var(--foreground)"
							},
							children: "Next"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "text-center text-xs",
					style: { color: "var(--text-muted)" },
					children: [
						"Showing ",
						(page - 1) * blogs.limit + 1,
						" to ",
						Math.min(page * blogs.limit, blogs.total),
						" of ",
						blogs.total,
						" posts"
					]
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "text-center py-16",
			style: { color: "var(--text-muted)" },
			children: /* @__PURE__ */ jsx("p", { children: "No blogs found. Check back soon!" })
		})]
	});
}
function BlogDetail({ blog, onBack, onSelectBlog }) {
	const [relatedBlogs, setRelatedBlogs] = useState([]);
	useEffect(() => {
		incrementViewCount(blog.id);
		loadRelatedBlogs();
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [blog.id]);
	const loadRelatedBlogs = async () => {
		try {
			setRelatedBlogs(await getRelatedBlogs(blog.id, blog.tags, 3));
		} catch (err) {
			console.error(err);
		}
	};
	const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("button", {
				onClick: onBack,
				className: "flex items-center gap-2 px-3 py-2 rounded border transition-colors text-sm",
				style: { borderColor: "var(--border-color)" },
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to blogs"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto space-y-6",
				children: [
					blog.coverImage && /* @__PURE__ */ jsx("img", {
						src: blog.coverImage,
						alt: blog.title,
						className: "w-full h-96 object-cover rounded-lg"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-3xl sm:text-4xl font-bold",
								children: blog.title
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-4 text-sm",
								style: { color: "var(--text-muted)" },
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }), publishDate]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
											blog.readingTime,
											" min read"
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
											blog.viewCount,
											" views"
										]
									})
								]
							}),
							blog.tags && blog.tags.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 pt-2",
								children: blog.tags.map((tag) => /* @__PURE__ */ jsxs("span", {
									className: "text-sm px-3 py-1 rounded border",
									style: {
										borderColor: "var(--border-color)",
										backgroundColor: "transparent",
										color: "var(--foreground)"
									},
									children: [/* @__PURE__ */ jsx(Tag, { className: "w-3 h-3 inline mr-1" }), tag]
								}, tag))
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "prose dark:prose-invert max-w-none text-base leading-relaxed",
						style: { color: "var(--foreground)" },
						dangerouslySetInnerHTML: { __html: blog.content }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "p-4 rounded border",
						style: {
							borderColor: "var(--border-color)",
							backgroundColor: "var(--bg-secondary)"
						},
						children: /* @__PURE__ */ jsx("div", {
							className: "text-sm",
							children: /* @__PURE__ */ jsxs("p", {
								style: { color: "var(--text-muted)" },
								children: ["By ", blog.author]
							})
						})
					})
				]
			}),
			relatedBlogs.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "pt-8 border-t",
				style: { borderColor: "var(--border-color)" },
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-semibold mb-6",
					children: "Related Posts"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: relatedBlogs.map((relatedBlog) => /* @__PURE__ */ jsx(BlogCard, {
						blog: relatedBlog,
						onClick: () => onSelectBlog(relatedBlog)
					}, relatedBlog.id))
				})]
			})
		]
	});
}
function BlogPageComponent() {
	const { colors } = useTheme();
	const [selectedBlog, setSelectedBlog] = useState(null);
	return /* @__PURE__ */ jsxs("div", {
		style: {
			backgroundColor: colors.background,
			minHeight: "100vh"
		},
		children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 pointer-events-none",
			style: {
				backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
				backgroundSize: "24px 24px"
			}
		}), /* @__PURE__ */ jsx(motion.div, {
			className: "relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			children: selectedBlog ? /* @__PURE__ */ jsx(BlogDetail, {
				blog: selectedBlog,
				onBack: () => setSelectedBlog(null),
				onSelectBlog: setSelectedBlog
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold mb-2",
					children: "Blog"
				}), /* @__PURE__ */ jsx("p", {
					style: { color: `${colors.foreground}99` },
					className: "text-sm",
					children: "Thoughts on web development, performance, and best practices"
				})] }), /* @__PURE__ */ jsx("a", {
					href: "/admin/blog",
					className: "px-3 py-2 text-xs rounded border transition-colors hover:opacity-80",
					style: {
						borderColor: "var(--border-color)",
						backgroundColor: "var(--primary)",
						color: "white"
					},
					title: "Blog Admin (Ctrl+Click to open in new tab)",
					children: "Admin"
				})]
			}), /* @__PURE__ */ jsx(BlogListing, { onSelectBlog: setSelectedBlog })] })
		})]
	});
}
//#endregion
export { BlogPageComponent as component };
