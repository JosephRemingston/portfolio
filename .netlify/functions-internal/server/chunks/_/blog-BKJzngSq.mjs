import { o as supabase, s as useTheme } from "./supabase-DIJitN88.mjs";
import { c as togglePublishBlog, l as updateBlog, n as deleteBlog, o as listAllBlogs, t as createBlog } from "./blog-api-abcMYIIJ.mjs";
import { n as useAuth } from "./AuthContext-BZlQtyF-.mjs";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Bold, Code, Copy, Edit2, Eye, EyeOff, Image, Italic, Link, List, ListOrdered, Loader, LogIn, LogOut, Plus, Save, Trash2, Type } from "lucide-react";
import { motion } from "framer-motion";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image$1 from "@tiptap/extension-image";
import Link$1 from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-BKJzngSq.js
function AdminLogin() {
	const { login, isLoading, error } = useAuth();
	const { colors } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!email || !password) {
			setFormError("Please enter both email and password");
			return;
		}
		try {
			await login(email, password);
		} catch (err) {
			setFormError(err.message || "Login failed");
		}
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "flex items-center justify-center min-h-screen p-4",
		style: { backgroundColor: colors.background },
		children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 pointer-events-none",
			style: {
				backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
				backgroundSize: "24px 24px"
			}
		}), /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "w-full max-w-sm p-8 rounded-lg border relative z-10",
			style: {
				borderColor: "var(--border-color)",
				backgroundColor: colors.background
			},
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-2 mb-3",
						children: [/* @__PURE__ */ jsx(LogIn, {
							className: "w-5 h-5",
							style: { color: "var(--primary)" }
						}), /* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold",
							children: "Admin Portal"
						})]
					}), /* @__PURE__ */ jsx("p", {
						style: { color: "var(--text-muted)" },
						className: "text-sm",
						children: "Sign in to manage your blog"
					})]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "email",
							className: "block text-sm font-medium mb-1.5",
							style: { color: "var(--foreground)" },
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							id: "email",
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@example.com",
							disabled: isLoading,
							className: "w-full px-3 py-2 rounded border outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "password",
							className: "block text-sm font-medium mb-1.5",
							style: { color: "var(--foreground)" },
							children: "Password"
						}), /* @__PURE__ */ jsx("input", {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "••••••••",
							disabled: isLoading,
							className: "w-full px-3 py-2 rounded border outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						})] }),
						(formError || error) && /* @__PURE__ */ jsx("div", {
							className: "p-3 rounded border text-sm",
							style: {
								borderColor: "#ef4444",
								backgroundColor: "rgba(239, 68, 68, 0.1)",
								color: "#ef4444"
							},
							children: formError || error
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: isLoading,
							className: "w-full px-4 py-2 rounded border font-medium text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
							style: {
								borderColor: "var(--primary)",
								backgroundColor: "var(--primary)",
								color: "white",
								opacity: isLoading ? .6 : 1
							},
							children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader, { className: "w-4 h-4 animate-spin" }), "Signing in..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LogIn, { className: "w-4 h-4" }), "Sign In"] })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 pt-6 border-t",
					style: { borderColor: "var(--border-color)" },
					children: /* @__PURE__ */ jsx("p", {
						className: "text-xs text-center",
						style: { color: "var(--text-muted)" },
						children: "First time? Create an account in Supabase dashboard"
					})
				})
			]
		})]
	});
}
function AuthLoading() {
	const { colors } = useTheme();
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-screen",
		style: { backgroundColor: colors.background },
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center space-y-4",
			children: [/* @__PURE__ */ jsx(Loader, {
				className: "w-8 h-8 animate-spin mx-auto",
				style: { color: "var(--primary)" }
			}), /* @__PURE__ */ jsx("p", {
				style: { color: "var(--text-muted)" },
				children: "Checking authentication..."
			})]
		})
	});
}
function AdminBlogList({ onEdit }) {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const [total, setTotal] = useState(0);
	const limit = 10;
	const totalPages = Math.ceil(total / limit);
	useEffect(() => {
		loadBlogs();
	}, [page, search]);
	const loadBlogs = async () => {
		try {
			setIsLoading(true);
			const response = await listAllBlogs(page, limit, search);
			setBlogs(response.blogs);
			setTotal(response.total);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleDelete = async (blog) => {
		if (!confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
		try {
			setIsLoading(true);
			await deleteBlog(blog.id);
			loadBlogs();
		} catch (err) {
			setError(err.message);
		}
	};
	const handlePublish = async (blog) => {
		try {
			setIsLoading(true);
			await togglePublishBlog(blog.id, blog.status === "draft");
			loadBlogs();
		} catch (err) {
			setError(err.message);
		}
	};
	const handleCopySlug = (slug) => {
		navigator.clipboard.writeText(slug);
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", {
				type: "text",
				placeholder: "Search blogs by title...",
				value: search,
				onChange: (e) => {
					setSearch(e.target.value);
					setPage(1);
				},
				className: "w-full px-3 py-2 rounded border outline-none transition-colors",
				style: {
					borderColor: "var(--border-color)",
					backgroundColor: "transparent",
					color: "var(--foreground)",
					fontSize: "16px"
				}
			}) }),
			error && /* @__PURE__ */ jsx("div", {
				className: "p-3 rounded border text-sm",
				style: {
					borderColor: "#ef4444",
					backgroundColor: "rgba(239, 68, 68, 0.1)",
					color: "#ef4444"
				},
				children: error
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ jsx(Loader, {
					className: "w-5 h-5 animate-spin",
					style: { color: "var(--primary)" }
				})
			}) : blogs.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "space-y-2 divide-y",
				style: { borderColor: "var(--border-color)" },
				children: blogs.map((blog) => /* @__PURE__ */ jsxs(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					className: "py-4 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-medium text-sm truncate",
								style: { color: "var(--foreground)" },
								children: blog.title
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 mt-1",
								children: [/* @__PURE__ */ jsx("code", {
									className: "text-xs px-2 py-1 rounded",
									style: {
										borderColor: "var(--border-color)",
										backgroundColor: "transparent",
										color: "var(--text-muted)",
										border: "1px solid"
									},
									children: blog.slug
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => handleCopySlug(blog.slug),
									className: "p-1 rounded transition-colors",
									style: { color: "var(--text-muted)" },
									title: "Copy slug",
									children: /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" })
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-3 text-xs",
							style: { color: "var(--text-muted)" },
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "px-2 py-1 rounded border",
									style: {
										borderColor: blog.status === "published" ? "var(--primary)" : "var(--border-color)",
										backgroundColor: blog.status === "published" ? "transparent" : "transparent",
										color: blog.status === "published" ? "var(--primary)" : "var(--text-muted)"
									},
									children: blog.status === "published" ? "Published" : "Draft"
								}),
								/* @__PURE__ */ jsxs("span", { children: [blog.readingTime, " min read"] }),
								/* @__PURE__ */ jsxs("span", { children: [blog.viewCount, " views"] }),
								blog.featured && /* @__PURE__ */ jsx("span", {
									className: "px-2 py-1 rounded border",
									style: {
										borderColor: "#f59e0b",
										color: "#f59e0b"
									},
									children: "⭐ Featured"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 flex-shrink-0",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => handlePublish(blog),
								className: "p-2 rounded border transition-colors",
								style: {
									borderColor: blog.status === "published" ? "var(--primary)" : "var(--border-color)",
									color: blog.status === "published" ? "var(--primary)" : "var(--text-muted)"
								},
								title: blog.status === "published" ? "Unpublish" : "Publish",
								children: blog.status === "published" ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => onEdit(blog),
								className: "p-2 rounded border transition-colors",
								style: {
									borderColor: "var(--border-color)",
									color: "var(--text-muted)"
								},
								title: "Edit",
								children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => handleDelete(blog),
								className: "p-2 rounded border transition-colors",
								style: {
									borderColor: "#ef4444",
									color: "#ef4444"
								},
								title: "Delete",
								children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
							})
						]
					})]
				}, blog.id))
			}) : /* @__PURE__ */ jsx("div", {
				className: "text-center py-8",
				style: { color: "var(--text-muted)" },
				children: /* @__PURE__ */ jsx("p", { children: "No blogs yet. Create your first post!" })
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
			})
		]
	});
}
function TipTapEditor({ value, onChange, placeholder }) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Image$1,
			Link$1.configure({
				openOnClick: false,
				autolink: true
			})
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		}
	});
	if (!editor) return /* @__PURE__ */ jsx("div", { children: "Loading editor..." });
	const toggleBold = () => editor.chain().focus().toggleBold().run();
	const toggleItalic = () => editor.chain().focus().toggleItalic().run();
	const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
	const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
	const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
	const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
	const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
	const addLink = () => {
		const url = prompt("Enter URL:");
		if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};
	const addImage = () => {
		const url = prompt("Enter image URL:");
		if (url) editor.chain().focus().setImage({ src: url }).run();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "border rounded-lg overflow-hidden",
		style: { borderColor: "var(--border-color)" },
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap gap-1 p-2 border-b",
			style: {
				borderColor: "var(--border-color)",
				backgroundColor: "var(--bg-secondary)"
			},
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: toggleHeading2,
					className: "p-2 rounded transition-colors",
					title: "Heading",
					style: {
						backgroundColor: editor.isActive("heading", { level: 2 }) ? "var(--primary)" : "transparent",
						color: editor.isActive("heading", { level: 2 }) ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(Type, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleBold,
					className: "p-2 rounded transition-colors",
					title: "Bold",
					style: {
						backgroundColor: editor.isActive("bold") ? "var(--primary)" : "transparent",
						color: editor.isActive("bold") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleItalic,
					className: "p-2 rounded transition-colors",
					title: "Italic",
					style: {
						backgroundColor: editor.isActive("italic") ? "var(--primary)" : "transparent",
						color: editor.isActive("italic") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(Italic, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleUnderline,
					className: "p-2 rounded transition-colors",
					title: "Underline",
					style: {
						backgroundColor: editor.isActive("underline") ? "var(--primary)" : "transparent",
						color: editor.isActive("underline") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx("u", { children: "U" })
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-px",
					style: { backgroundColor: "var(--border-color)" }
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleBulletList,
					className: "p-2 rounded transition-colors",
					title: "Bullet List",
					style: {
						backgroundColor: editor.isActive("bulletList") ? "var(--primary)" : "transparent",
						color: editor.isActive("bulletList") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleOrderedList,
					className: "p-2 rounded transition-colors",
					title: "Ordered List",
					style: {
						backgroundColor: editor.isActive("orderedList") ? "var(--primary)" : "transparent",
						color: editor.isActive("orderedList") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: toggleCodeBlock,
					className: "p-2 rounded transition-colors",
					title: "Code Block",
					style: {
						backgroundColor: editor.isActive("codeBlock") ? "var(--primary)" : "transparent",
						color: editor.isActive("codeBlock") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-px",
					style: { backgroundColor: "var(--border-color)" }
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: addLink,
					className: "p-2 rounded transition-colors",
					title: "Add Link",
					style: {
						backgroundColor: editor.isActive("link") ? "var(--primary)" : "transparent",
						color: editor.isActive("link") ? "white" : "var(--foreground)"
					},
					children: /* @__PURE__ */ jsx(Link, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: addImage,
					className: "p-2 rounded transition-colors",
					title: "Add Image",
					style: { color: "var(--foreground)" },
					children: /* @__PURE__ */ jsx(Image, { className: "w-4 h-4" })
				})
			]
		}), /* @__PURE__ */ jsx(EditorContent, {
			editor,
			className: "prose prose-sm max-w-none p-4 min-h-96 focus:outline-none",
			style: {
				backgroundColor: "transparent",
				color: "var(--foreground)"
			}
		})]
	});
}
function BlogEditor({ blog, onBack, onSave }) {
	const [title, setTitle] = useState(blog?.title || "");
	const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
	const [content, setContent] = useState(blog?.content || "");
	const [coverImage, setCoverImage] = useState(blog?.coverImage || "");
	const [tags, setTags] = useState(blog?.tags?.join(", ") || "");
	const [status, setStatus] = useState(blog?.status || "draft");
	const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || "");
	const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || "");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const handleSave = async () => {
		if (!title.trim() || !content.trim() || !excerpt.trim()) {
			setError("Title, excerpt, and content are required");
			return;
		}
		try {
			setIsLoading(true);
			setError("");
			setSuccess("");
			const input = {
				title: title.trim(),
				content,
				excerpt: excerpt.trim(),
				coverImage: coverImage.trim() || void 0,
				tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
				status,
				metaTitle: metaTitle.trim() || title.trim(),
				metaDescription: metaDescription.trim() || excerpt.trim()
			};
			if (blog) {
				await updateBlog(blog.id, input);
				setSuccess("Blog updated successfully");
			} else {
				const { data: sessionData } = await supabase.auth.getSession();
				const userId = sessionData?.session?.user?.id;
				if (!userId) await createBlog(input, "demo-user-" + Date.now());
				else await createBlog(input, userId);
				setSuccess("Blog created successfully");
			}
			setTimeout(() => onSave(), 1e3);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handlePublish = async () => {
		if (!blog) return;
		try {
			setIsLoading(true);
			setError("");
			await togglePublishBlog(blog.id, status === "draft");
			setStatus(status === "published" ? "draft" : "published");
			setSuccess(`Blog ${status === "published" ? "unpublished" : "published"}`);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleDelete = async () => {
		if (!blog) return;
		if (!confirm("Delete this blog permanently? This cannot be undone.")) return;
		try {
			setIsLoading(true);
			setError("");
			await deleteBlog(blog.id);
			setSuccess("Blog deleted");
			setTimeout(() => onSave(), 1e3);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "max-w-4xl",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4 mb-8",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("button", {
						onClick: onBack,
						className: "flex items-center gap-2 px-3 py-2 rounded border text-sm transition-colors mb-4",
						style: {
							borderColor: "var(--border-color)",
							color: "var(--foreground)"
						},
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Back"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold",
						children: blog ? "Edit blog" : "New blog post"
					}),
					/* @__PURE__ */ jsx("p", {
						style: { color: "var(--text-muted)" },
						className: "text-sm mt-1",
						children: blog ? "Update and manage your blog post" : "Create a new blog post for your portfolio"
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2 flex-col sm:flex-row",
					children: [
						blog && /* @__PURE__ */ jsx("button", {
							onClick: handlePublish,
							disabled: isLoading,
							className: "px-4 py-2 rounded border text-sm transition-colors flex items-center justify-center gap-2",
							style: {
								borderColor: "var(--border-color)",
								color: "var(--foreground)",
								opacity: isLoading ? .6 : 1
							},
							children: status === "published" ? "Unpublish" : "Publish"
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: handleSave,
							disabled: isLoading,
							className: "px-4 py-2 rounded text-white text-sm transition-opacity flex items-center justify-center gap-2",
							style: {
								backgroundColor: "var(--primary)",
								opacity: isLoading ? .6 : 1
							},
							children: [isLoading ? /* @__PURE__ */ jsx(Loader, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }), isLoading ? "Saving..." : "Save"]
						}),
						blog && /* @__PURE__ */ jsx("button", {
							onClick: handleDelete,
							disabled: isLoading,
							className: "px-4 py-2 rounded border text-sm transition-opacity",
							style: {
								borderColor: "#ef4444",
								color: "#ef4444",
								opacity: isLoading ? .6 : 1
							},
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						})
					]
				})]
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "mb-6 p-4 rounded border text-sm",
				style: {
					borderColor: "#ef4444",
					backgroundColor: "rgba(239, 68, 68, 0.1)",
					color: "#ef4444"
				},
				children: error
			}),
			success && /* @__PURE__ */ jsx("div", {
				className: "mb-6 p-4 rounded border text-sm",
				style: {
					borderColor: "#10b981",
					backgroundColor: "rgba(16, 185, 129, 0.1)",
					color: "#10b981"
				},
				children: success
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium mb-2",
							style: { color: "var(--foreground)" },
							children: ["Title ", /* @__PURE__ */ jsx("span", {
								style: { color: "#ef4444" },
								children: "*"
							})]
						}),
						/* @__PURE__ */ jsx("input", {
							type: "text",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Your blog post title",
							className: "w-full px-3 py-2 rounded border outline-none transition-colors focus:border-opacity-100",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						}),
						/* @__PURE__ */ jsx("p", {
							style: { color: "var(--text-muted)" },
							className: "text-xs mt-1",
							children: "URL slug will be auto-generated from this"
						})
					] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium mb-2",
							style: { color: "var(--foreground)" },
							children: ["Excerpt ", /* @__PURE__ */ jsx("span", {
								style: { color: "#ef4444" },
								children: "*"
							})]
						}),
						/* @__PURE__ */ jsx("textarea", {
							value: excerpt,
							onChange: (e) => setExcerpt(e.target.value),
							placeholder: "Brief summary shown in blog listing",
							rows: 3,
							className: "w-full px-3 py-2 rounded border outline-none resize-none transition-colors",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						}),
						/* @__PURE__ */ jsxs("p", {
							style: { color: "var(--text-muted)" },
							className: "text-xs mt-1",
							children: [excerpt.length, " / 200 characters"]
						})
					] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-medium mb-2",
						style: { color: "var(--foreground)" },
						children: ["Content ", /* @__PURE__ */ jsx("span", {
							style: { color: "#ef4444" },
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("div", {
						style: {
							borderColor: "var(--border-color)",
							border: "1px solid",
							borderRadius: "6px",
							backgroundColor: "transparent"
						},
						children: /* @__PURE__ */ jsx(TipTapEditor, {
							value: content,
							onChange: setContent,
							placeholder: "Write your blog post here..."
						})
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium mb-2",
							style: { color: "var(--foreground)" },
							children: "Cover Image URL"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "url",
							value: coverImage,
							onChange: (e) => setCoverImage(e.target.value),
							placeholder: "https://example.com/image.jpg",
							className: "w-full px-3 py-2 rounded border outline-none transition-colors",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						}),
						coverImage && /* @__PURE__ */ jsx("div", {
							className: "mt-3 rounded border overflow-hidden",
							style: { borderColor: "var(--border-color)" },
							children: /* @__PURE__ */ jsx("img", {
								src: coverImage,
								alt: "Cover preview",
								className: "w-full h-48 object-cover"
							})
						})
					] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium mb-2",
							style: { color: "var(--foreground)" },
							children: "Tags"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "text",
							value: tags,
							onChange: (e) => setTags(e.target.value),
							placeholder: "react, typescript, performance (comma-separated)",
							className: "w-full px-3 py-2 rounded border outline-none transition-colors",
							style: {
								borderColor: "var(--border-color)",
								backgroundColor: "transparent",
								color: "var(--foreground)",
								fontSize: "16px"
							}
						}),
						tags && /* @__PURE__ */ jsx("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: tags.split(",").map((tag) => {
								const trimmed = tag.trim();
								return trimmed ? /* @__PURE__ */ jsx("span", {
									className: "px-2 py-1 rounded text-xs border",
									style: {
										borderColor: "var(--border-color)",
										backgroundColor: "transparent",
										color: "var(--foreground)"
									},
									children: trimmed
								}, trimmed) : null;
							})
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t pt-6",
						style: { borderColor: "var(--border-color)" },
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-medium mb-4",
							style: { color: "var(--foreground)" },
							children: "SEO Settings"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium mb-2",
									style: { color: "var(--foreground)" },
									children: "Meta Title"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: metaTitle,
									onChange: (e) => setMetaTitle(e.target.value),
									placeholder: title || "Blog title",
									maxLength: 60,
									className: "w-full px-3 py-2 rounded border outline-none transition-colors",
									style: {
										borderColor: "var(--border-color)",
										backgroundColor: "transparent",
										color: "var(--foreground)",
										fontSize: "16px"
									}
								}),
								/* @__PURE__ */ jsxs("p", {
									style: { color: "var(--text-muted)" },
									className: "text-xs mt-1",
									children: [metaTitle.length, " / 60 characters"]
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium mb-2",
									style: { color: "var(--foreground)" },
									children: "Meta Description"
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: metaDescription,
									onChange: (e) => setMetaDescription(e.target.value),
									placeholder: excerpt || "Blog excerpt",
									maxLength: 160,
									rows: 2,
									className: "w-full px-3 py-2 rounded border outline-none resize-none transition-colors",
									style: {
										borderColor: "var(--border-color)",
										backgroundColor: "transparent",
										color: "var(--foreground)",
										fontSize: "16px"
									}
								}),
								/* @__PURE__ */ jsxs("p", {
									style: { color: "var(--text-muted)" },
									className: "text-xs mt-1",
									children: [metaDescription.length, " / 160 characters"]
								})
							] })]
						})]
					})
				]
			})
		]
	});
}
function BlogAdminPage() {
	const { isAuthenticated, isLoading, logout } = useAuth();
	const [view, setView] = useState("list");
	const [selectedBlog, setSelectedBlog] = useState(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const handleEdit = (blog) => {
		setSelectedBlog(blog);
		setView("edit");
	};
	const handleNew = () => {
		setSelectedBlog(null);
		setView("new");
	};
	const handleBack = () => {
		setSelectedBlog(null);
		setView("list");
	};
	const handleSave = () => {
		setView("list");
		setSelectedBlog(null);
	};
	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await logout();
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			setIsLoggingOut(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ jsx(AuthLoading, {});
	if (!isAuthenticated) return /* @__PURE__ */ jsx(AdminLogin, {});
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "space-y-6",
		children: [view === "list" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold",
				children: "Blog Management"
			}), /* @__PURE__ */ jsx("p", {
				style: { color: "var(--text-muted)" },
				className: "text-sm mt-1",
				children: "Create, edit, and manage your blog posts"
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsxs("button", {
					onClick: handleNew,
					className: "flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all",
					style: {
						borderColor: "var(--primary)",
						backgroundColor: "var(--primary)",
						color: "white"
					},
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), "New Post"]
				}), /* @__PURE__ */ jsx("button", {
					onClick: handleLogout,
					disabled: isLoggingOut,
					className: "flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all disabled:opacity-50",
					style: {
						borderColor: "var(--border-color)",
						color: "var(--text-muted)"
					},
					title: "Sign out",
					children: isLoggingOut ? /* @__PURE__ */ jsx(Loader, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" })
				})]
			})]
		}), /* @__PURE__ */ jsx(AdminBlogList, { onEdit: handleEdit })] }), (view === "new" || view === "edit") && /* @__PURE__ */ jsx(BlogEditor, {
			blog: selectedBlog || void 0,
			onBack: handleBack,
			onSave: handleSave
		})]
	});
}
function AdminBlogPageComponent() {
	const { colors } = useTheme();
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
		}), /* @__PURE__ */ jsxs(motion.div, {
			className: "relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-8",
				children: /* @__PURE__ */ jsx("a", {
					href: "/blog",
					className: "text-sm",
					style: { color: "var(--primary)" },
					children: "← Back to Blog"
				})
			}), /* @__PURE__ */ jsx(BlogAdminPage, {})]
		})]
	});
}
//#endregion
export { AdminBlogPageComponent as component };
