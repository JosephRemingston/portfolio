import { a as getSectionGradient, i as getGradient, n as ThemeProvider, r as getGlowColor, s as useTheme, t as THEME_PRESETS } from "./supabase-DIJitN88.mjs";
import { a as incrementViewCount, i as getRelatedBlogs, s as listPublishedBlogs } from "./blog-api-abcMYIIJ.mjs";
import { t as BlogCard } from "./BlogCard-CL3EuOyU.mjs";
import { t as data_default } from "./data-C-TOc-tN.mjs";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, BarChart, BookOpen, Bot, Brain, Briefcase, Calendar, Camera, Check, ChevronDown, ChevronUp, Clock, Cloud, Code, Cpu, Crown, Database, Download, ExternalLink, Eye, FileCode, Gamepad2, GitBranch, Globe, GraduationCap, Hammer, HardDrive, Heart, Key, Layers, Layout, Lightbulb, Loader, Loader2, Lock, Mail, MapPin, MessageCircle, MessageSquare, Mic, Moon, Music, Package, Palette, PenTool, PieChart, Rocket, Search, Send, Server, Settings, Shield, Smartphone, Star, Sun, Swords, Tag, Target, Terminal, TrendingUp, Trophy, User, Users, Video, Wifi, Wrench, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-h_pCIfsm.js
var SVGS = {
	github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
	twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
	linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
	email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
	externalLink: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
	code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
	briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
	graduation: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
	star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
	download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
	arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
	chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>`,
	calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
	location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
};
var ANIMATION = {
	fadeIn: {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: .5 }
		}
	},
	stagger: { visible: { transition: { staggerChildren: .1 } } },
	cardStagger: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: .08 }
		}
	},
	cardItem: {
		hidden: {
			opacity: 0,
			x: -20
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 24
			}
		}
	},
	spring: {
		type: "spring",
		stiffness: 400,
		damping: 25
	}
};
function Icon({ name, className = "w-4 h-4" }) {
	const svg = SVGS[name];
	if (!svg) return null;
	return /* @__PURE__ */ jsx("span", {
		className,
		dangerouslySetInnerHTML: { __html: svg }
	});
}
function Hero({ profile, roles, socials }) {
	const { colors, mode, setMode } = useTheme();
	const [roleIndex, setRoleIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setRoleIndex((prev) => (prev + 1) % roles.length);
		}, 2500);
		return () => clearInterval(interval);
	}, [roles.length]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(motion.div, {
		variants: ANIMATION.fadeIn,
		className: "relative mb-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden rounded-2xl h-32 sm:h-40",
			children: [/* @__PURE__ */ jsx("img", {
				src: profile.banner,
				alt: "Banner",
				className: "w-full h-full object-cover",
				loading: "eager",
				decoding: "async"
			}), /* @__PURE__ */ jsx("button", {
				onClick: (e) => setMode(mode === "dark" ? "light" : "dark", e),
				className: "absolute top-3 right-3 p-2 rounded-lg transition-colors backdrop-blur-sm hover:bg-white/30 cursor-pointer",
				style: {
					backgroundColor: "rgba(255,255,255,0.2)",
					color: "#fff"
				},
				children: mode === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "absolute -bottom-12 left-6 sm:left-8 z-20",
			children: /* @__PURE__ */ jsx(motion.div, {
				whileHover: { scale: 1.02 },
				className: "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 shadow-xl",
				style: {
					borderColor: colors.background,
					backgroundColor: colors.background
				},
				children: /* @__PURE__ */ jsx("img", {
					src: profile.avatar,
					alt: profile.name,
					className: "w-full h-full object-cover",
					loading: "eager",
					fetchPriority: "high",
					decoding: "async"
				})
			})
		})]
	}), /* @__PURE__ */ jsxs(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "rounded-2xl border p-6 sm:p-8 mb-6 pt-16 sm:pt-14 backdrop-blur-xl",
		style: {
			backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
			borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
		},
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ jsx("h1", {
							className: "text-xl sm:text-2xl font-semibold",
							style: { color: colors.foreground },
							children: profile.name
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-sm",
							style: { color: `${colors.foreground}80` },
							children: ["@", profile.handle]
						}),
						/* @__PURE__ */ jsxs(motion.a, {
							href: profile.resumeUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							whileHover: { scale: 1.05 },
							whileTap: { scale: .95 },
							className: "ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer",
							style: {
								backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
								color: `${colors.foreground}b3`
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
							},
							children: [/* @__PURE__ */ jsx(Download, { className: "w-3 h-3" }), "Resume"]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "h-5 overflow-hidden",
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ jsx(motion.p, {
							initial: {
								y: 20,
								opacity: 0
							},
							animate: {
								y: 0,
								opacity: 1
							},
							exit: {
								y: -20,
								opacity: 0
							},
							transition: { duration: .3 },
							className: "text-sm",
							style: { color: `${colors.foreground}99` },
							children: roles[roleIndex]
						}, roleIndex)
					})
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm sm:text-base leading-relaxed mb-5 sm:mb-6",
				style: { color: `${colors.foreground}b3` },
				children: profile.bio
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6",
				children: [/* @__PURE__ */ jsxs(motion.a, {
					href: `mailto:${profile.email}`,
					whileHover: { scale: 1.02 },
					whileTap: { scale: .98 },
					style: {
						background: getGradient(colors),
						boxShadow: `0 10px 15px -3px ${colors.primary}40`
					},
					className: "inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer",
					children: [
						/* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" }),
						/* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" }),
						/* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: "Let's talk"
						})
					]
				}), /* @__PURE__ */ jsxs(motion.a, {
					href: `mailto:${profile.email}`,
					whileHover: { scale: 1.02 },
					whileTap: { scale: .98 },
					className: "inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all duration-300 cursor-pointer",
					style: {
						borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
						color: colors.foreground
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
						e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.backgroundColor = "transparent";
						e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
					},
					children: [/* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }), "Drop a mail"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
				className: "text-xs sm:text-sm mb-2 sm:mb-3",
				style: { color: `${colors.foreground}99` },
				children: ["Find me on the ", /* @__PURE__ */ jsx("span", {
					style: { color: colors.foreground },
					className: "font-medium",
					children: "internet"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-1.5 sm:gap-2",
				children: socials.map((social) => /* @__PURE__ */ jsxs(motion.a, {
					href: social.url,
					target: "_blank",
					rel: "noopener noreferrer",
					whileHover: {
						scale: 1.05,
						y: -2
					},
					whileTap: { scale: .95 },
					className: "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer",
					style: {
						backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
						color: `${colors.foreground}b3`
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
						e.currentTarget.style.color = colors.foreground;
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
						e.currentTarget.style.color = `${colors.foreground}b3`;
					},
					children: [/* @__PURE__ */ jsx(Icon, {
						name: social.icon,
						className: "w-3.5 h-3.5 sm:w-4 sm:h-4"
					}), social.name]
				}, social.name))
			})] })
		]
	})] });
}
var INITIAL_SHOW_COUNT$1 = 4;
function Experience({ experiences }) {
	const { colors, mode } = useTheme();
	const [expandedExp, setExpandedExp] = useState(null);
	const [showAll, setShowAll] = useState(false);
	const displayedExperiences = showAll ? experiences : experiences.slice(0, INITIAL_SHOW_COUNT$1);
	const hasMore = experiences.length > INITIAL_SHOW_COUNT$1;
	return /* @__PURE__ */ jsxs(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border",
		style: {
			background: getSectionGradient(colors, mode),
			borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
		},
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none",
			style: { background: getGlowColor(colors, mode) }
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-6 sm:h-8 w-1 rounded-full",
						style: { background: `linear-gradient(to bottom, ${colors.accent}, ${colors.secondary})` }
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-base sm:text-lg font-semibold",
						style: { color: colors.foreground },
						children: "Where I've worked"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: displayedExperiences.map((exp, index) => /* @__PURE__ */ jsxs(motion.div, {
						className: "rounded-xl border overflow-hidden transition-all backdrop-blur-md",
						style: {
							backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
							borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.borderColor = `${colors.primary}50`;
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
						},
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setExpandedExp(expandedExp === index ? null : index),
							className: "w-full p-3 sm:p-4 text-left transition-colors cursor-pointer",
							style: { backgroundColor: "transparent" },
							onMouseEnter: (e) => {
								e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.backgroundColor = "transparent";
							},
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 flex-wrap mb-1 sm:mb-0",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-medium text-sm sm:text-base",
													style: { color: colors.foreground },
													children: exp.company
												}), /* @__PURE__ */ jsx("span", {
													className: "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full",
													style: { backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" },
													children: exp.type
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm",
												style: { color: `${colors.foreground}b3` },
												children: exp.role
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 text-xs sm:hidden",
												style: { color: `${colors.foreground}99` },
												children: [
													/* @__PURE__ */ jsx("span", { children: exp.period }),
													/* @__PURE__ */ jsx("span", { children: "•" }),
													/* @__PURE__ */ jsx("span", { children: exp.location })
												]
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "hidden sm:flex items-start gap-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm",
												style: { color: `${colors.foreground}cc` },
												children: exp.period
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs",
												style: { color: `${colors.foreground}80` },
												children: exp.location
											})]
										})
									}),
									/* @__PURE__ */ jsx(ChevronDown, {
										className: `w-4 h-4 transition-transform duration-200 flex-shrink-0 ${expandedExp === index ? "rotate-180" : ""}`,
										style: { color: `${colors.foreground}66` }
									})
								]
							})
						}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedExp === index && /* @__PURE__ */ jsx(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: { duration: .2 },
							className: "overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t",
								style: { borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
								children: /* @__PURE__ */ jsx("ul", {
									className: "space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3",
									children: exp.details.map((detail, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm",
										style: { color: `${colors.foreground}b3` },
										children: [/* @__PURE__ */ jsx("span", {
											style: { color: colors.accent },
											className: "mt-1 sm:mt-1.5",
											children: "•"
										}), detail]
									}, i))
								})
							})
						}) })]
					}, index))
				}),
				hasMore && /* @__PURE__ */ jsx("div", {
					className: "flex justify-center mt-4",
					children: /* @__PURE__ */ jsx(motion.button, {
						whileHover: { scale: 1.02 },
						whileTap: { scale: .98 },
						onClick: () => setShowAll(!showAll),
						className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer",
						style: {
							background: mode === "dark" ? `${colors.accent}15` : `${colors.accent}10`,
							borderColor: mode === "dark" ? `${colors.accent}30` : `${colors.accent}20`,
							color: mode === "dark" ? colors.highlight : colors.primary
						},
						children: showAll ? /* @__PURE__ */ jsxs(Fragment, { children: ["Show less", /* @__PURE__ */ jsx(ChevronUp, { className: "w-3.5 h-3.5" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
							"Show ",
							experiences.length - INITIAL_SHOW_COUNT$1,
							" more",
							/* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" })
						] })
					})
				})
			]
		})]
	});
}
var INITIAL_SHOW_COUNT = 4;
function Education({ education }) {
	const { colors, mode } = useTheme();
	const [expandedEdu, setExpandedEdu] = useState(null);
	const [showAll, setShowAll] = useState(false);
	const displayedEducation = showAll ? education : education.slice(0, INITIAL_SHOW_COUNT);
	const hasMore = education.length > INITIAL_SHOW_COUNT;
	return /* @__PURE__ */ jsxs(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border",
		style: {
			background: getSectionGradient(colors, mode),
			borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
		},
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none",
			style: { background: getGlowColor(colors, mode) }
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-6 sm:h-8 w-1 rounded-full",
						style: { background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.accent})` }
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-base sm:text-lg font-semibold",
						style: { color: colors.foreground },
						children: "Education"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: displayedEducation.map((edu, index) => /* @__PURE__ */ jsxs(motion.div, {
						className: "rounded-xl border overflow-hidden transition-all backdrop-blur-md",
						style: {
							backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
							borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.borderColor = `${colors.highlight}50`;
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
						},
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setExpandedEdu(expandedEdu === index ? null : index),
							className: "w-full p-3 sm:p-4 text-left transition-colors cursor-pointer",
							style: { backgroundColor: "transparent" },
							onMouseEnter: (e) => {
								e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.backgroundColor = "transparent";
							},
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 flex-wrap mb-1 sm:mb-0",
												children: [/* @__PURE__ */ jsx(GraduationCap, {
													className: "w-4 h-4",
													style: { color: colors.highlight }
												}), /* @__PURE__ */ jsx("span", {
													className: "font-medium text-sm sm:text-base",
													style: { color: colors.foreground },
													children: edu.institution
												})]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-sm",
												style: { color: `${colors.foreground}b3` },
												children: [
													edu.degree,
													" in ",
													edu.field
												]
											}),
											edu.grade && /* @__PURE__ */ jsxs("p", {
												className: "text-xs mt-1",
												style: { color: `${colors.foreground}80` },
												children: ["Grade: ", edu.grade]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 text-xs sm:hidden mt-1",
												style: { color: `${colors.foreground}99` },
												children: [
													/* @__PURE__ */ jsx("span", { children: edu.period }),
													/* @__PURE__ */ jsx("span", { children: "•" }),
													/* @__PURE__ */ jsx("span", { children: edu.location })
												]
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "hidden sm:flex items-start gap-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm",
												style: { color: `${colors.foreground}cc` },
												children: edu.period
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs",
												style: { color: `${colors.foreground}80` },
												children: edu.location
											})]
										})
									}),
									edu.details && edu.details.length > 0 && /* @__PURE__ */ jsx(ChevronDown, {
										className: `w-4 h-4 transition-transform duration-200 flex-shrink-0 ${expandedEdu === index ? "rotate-180" : ""}`,
										style: { color: `${colors.foreground}66` }
									})
								]
							})
						}), edu.details && edu.details.length > 0 && /* @__PURE__ */ jsx(AnimatePresence, { children: expandedEdu === index && /* @__PURE__ */ jsx(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: { duration: .2 },
							className: "overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t",
								style: { borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
								children: /* @__PURE__ */ jsx("ul", {
									className: "space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3",
									children: edu.details.map((detail, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm",
										style: { color: `${colors.foreground}b3` },
										children: [/* @__PURE__ */ jsx("span", {
											style: { color: colors.highlight },
											className: "mt-1 sm:mt-1.5",
											children: "•"
										}), detail]
									}, i))
								})
							})
						}) })]
					}, index))
				}),
				hasMore && /* @__PURE__ */ jsx("div", {
					className: "flex justify-center mt-4",
					children: /* @__PURE__ */ jsx(motion.button, {
						whileHover: { scale: 1.02 },
						whileTap: { scale: .98 },
						onClick: () => setShowAll(!showAll),
						className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer",
						style: {
							background: mode === "dark" ? `${colors.highlight}15` : `${colors.highlight}10`,
							borderColor: mode === "dark" ? `${colors.highlight}30` : `${colors.highlight}20`,
							color: mode === "dark" ? colors.highlight : colors.primary
						},
						children: showAll ? /* @__PURE__ */ jsxs(Fragment, { children: ["Show less", /* @__PURE__ */ jsx(ChevronUp, { className: "w-3.5 h-3.5" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
							"Show ",
							education.length - INITIAL_SHOW_COUNT,
							" more",
							/* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" })
						] })
					})
				})
			]
		})]
	});
}
function GitHubIcon(props) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		...props,
		children: /* @__PURE__ */ jsx("path", { d: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.11V22" })
	});
}
function XIcon(props) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		...props,
		children: [
			/* @__PURE__ */ jsx("path", { d: "M4 4l16 16" }),
			/* @__PURE__ */ jsx("path", { d: "M20 4 9.5 14.5" }),
			/* @__PURE__ */ jsx("path", { d: "M14.5 9.5 20 20" }),
			/* @__PURE__ */ jsx("path", { d: "M4 20l6.5-10.5" })
		]
	});
}
function FigmaIcon(props) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		...props,
		children: [
			/* @__PURE__ */ jsx("path", { d: "M12 12a4 4 0 1 0 0-8H8a4 4 0 0 0 0 8h4Z" }),
			/* @__PURE__ */ jsx("path", { d: "M8 12a4 4 0 0 0 0 8 4 4 0 0 0 4-4v-4H8Z" }),
			/* @__PURE__ */ jsx("path", { d: "M12 12a4 4 0 1 0 0 8 4 4 0 0 0 4-4 4 4 0 0 0-4-4Z" }),
			/* @__PURE__ */ jsx("path", { d: "M12 4h4a4 4 0 0 1 0 8h-4V4Z" })
		]
	});
}
function Projects({ projects }) {
	const { colors, mode } = useTheme();
	return /* @__PURE__ */ jsxs(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border",
		style: {
			background: getSectionGradient(colors, mode),
			borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
		},
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none",
			style: { background: getGlowColor(colors, mode) }
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "h-6 sm:h-8 w-1 rounded-full",
					style: { background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.primary})` }
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-base sm:text-lg font-semibold",
					style: { color: colors.foreground },
					children: "Things I've built"
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
				variants: ANIMATION.cardStagger,
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-50px"
				},
				children: projects.filter((p) => p.featured).map((project) => /* @__PURE__ */ jsxs(motion.a, {
					href: project.github || "#",
					target: project.github ? "_blank" : "_self",
					rel: project.github ? "noopener noreferrer" : "",
					variants: ANIMATION.cardItem,
					whileHover: { borderColor: colors.primary },
					whileTap: { scale: .98 },
					transition: ANIMATION.spring,
					className: "group flex flex-col p-4 sm:p-5 rounded-lg border cursor-pointer transition-colors",
					style: {
						backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)",
						borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-sm sm:text-base mb-2",
							style: { color: colors.foreground },
							children: project.title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs sm:text-sm leading-relaxed mb-3",
							style: { color: `${colors.foreground}99` },
							children: project.description
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-2 pt-3 border-t",
						style: { borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex gap-1.5",
							children: project.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx("span", {
								className: "text-[9px] sm:text-[10px] px-2 py-1 rounded transition-colors",
								style: {
									backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
									color: `${colors.foreground}b3`
								},
								children: tag
							}, tag))
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1.5",
							children: [project.github && /* @__PURE__ */ jsx("a", {
								href: project.github,
								target: "_blank",
								rel: "noopener noreferrer",
								onClick: (e) => e.stopPropagation(),
								className: "p-1 rounded transition-colors",
								style: { color: `${colors.primary}80` },
								onMouseEnter: (e) => e.currentTarget.style.color = colors.primary,
								onMouseLeave: (e) => e.currentTarget.style.color = `${colors.primary}80`,
								children: /* @__PURE__ */ jsx(GitHubIcon, { className: "w-4 h-4" })
							}), project.demo && /* @__PURE__ */ jsx("a", {
								href: project.demo,
								target: "_blank",
								rel: "noopener noreferrer",
								onClick: (e) => e.stopPropagation(),
								className: "p-1 rounded transition-colors",
								style: { color: `${colors.primary}80` },
								onMouseEnter: (e) => e.currentTarget.style.color = colors.primary,
								onMouseLeave: (e) => e.currentTarget.style.color = `${colors.primary}80`,
								children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
							})]
						})]
					})]
				}, project.id))
			})]
		})]
	});
}
var iconMap = {
	brain: Brain,
	target: Target,
	users: Users,
	trophy: Trophy,
	gamepad: Gamepad2,
	message: MessageSquare,
	mic: Mic,
	eye: Eye,
	code: Code,
	database: Database,
	server: Server,
	globe: Globe,
	smartphone: Smartphone,
	shield: Shield,
	zap: Zap,
	palette: Palette,
	pen: PenTool,
	camera: Camera,
	video: Video,
	music: Music,
	book: BookOpen,
	graduation: GraduationCap,
	briefcase: Briefcase,
	trending: TrendingUp,
	"bar-chart": BarChart,
	"pie-chart": PieChart,
	settings: Settings,
	wrench: Wrench,
	hammer: Hammer,
	cpu: Cpu,
	"hard-drive": HardDrive,
	wifi: Wifi,
	cloud: Cloud,
	lock: Lock,
	key: Key,
	search: Search,
	"file-code": FileCode,
	terminal: Terminal,
	git: GitBranch,
	package: Package,
	layers: Layers,
	layout: Layout,
	figma: FigmaIcon,
	lightbulb: Lightbulb,
	rocket: Rocket,
	star: Star,
	heart: Heart,
	swords: Swords,
	crown: Crown
};
function getSkillIcon(name) {
	return iconMap[name.toLowerCase()] || null;
}
function SkillSlider({ skills }) {
	const { colors, mode } = useTheme();
	const scrollContainerRef = useRef(null);
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;
		let animationFrameId;
		const scrollSpeed = .5;
		const animate = () => {
			if (container) {
				container.scrollLeft += scrollSpeed;
				const maxScroll = container.scrollWidth / 2;
				if (container.scrollLeft >= maxScroll) container.scrollLeft = 0;
			}
			animationFrameId = requestAnimationFrame(animate);
		};
		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, []);
	const duplicatedSkills = [
		...skills,
		...skills,
		...skills,
		...skills
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative overflow-hidden w-full max-w-full",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none",
				style: { background: `linear-gradient(to right, ${colors.background}, transparent)` }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none",
				style: { background: `linear-gradient(to left, ${colors.background}, transparent)` }
			}),
			/* @__PURE__ */ jsx("div", {
				ref: scrollContainerRef,
				className: "flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden",
				style: {
					scrollbarWidth: "none",
					msOverflowStyle: "none"
				},
				children: duplicatedSkills.map((skill, index) => {
					const IconComponent = getSkillIcon(skill.icon);
					return /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							scale: .8
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .3,
							delay: index % skills.length * .1
						},
						className: "flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full min-w-[110px] sm:min-w-[130px] md:min-w-[140px] border transition-all duration-300 backdrop-blur-sm",
						style: {
							backgroundColor: mode === "dark" ? "rgba(24, 24, 27, 0.5)" : "rgba(255, 255, 255, 0.8)",
							borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
							boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.05)" : "none"
						},
						children: [IconComponent && /* @__PURE__ */ jsx(IconComponent, {
							className: "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
							style: { color: skill.color }
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs sm:text-sm font-medium whitespace-nowrap leading-none",
							style: { color: colors.foreground },
							children: skill.name
						})]
					}, `${skill.name}-${index}`);
				})
			}),
			/* @__PURE__ */ jsx("style", { children: `
        div::-webkit-scrollbar { display: none; }
      ` })
		]
	});
}
function BlogSection({ onSelectBlog }) {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { colors } = useTheme();
	useEffect(() => {
		const loadBlogs = async () => {
			try {
				setIsLoading(true);
				setBlogs((await listPublishedBlogs(1, 6)).blogs);
			} catch (err) {
				console.error("Failed to load blogs:", err);
				setBlogs([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadBlogs();
	}, []);
	if (isLoading) return /* @__PURE__ */ jsx("section", {
		className: "py-12 sm:py-16 flex justify-center",
		children: /* @__PURE__ */ jsx(Loader, {
			className: "w-5 h-5 animate-spin",
			style: { color: "var(--primary)" }
		})
	});
	if (!blogs || blogs.length === 0) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "mb-6",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "text-xs sm:text-sm mb-4 sm:mb-6",
			style: { color: `${colors.foreground}99` },
			children: ["Latest ", /* @__PURE__ */ jsx("span", {
				style: { color: colors.foreground },
				className: "font-medium",
				children: "posts"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
			children: blogs.map((blog, index) => /* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .35,
					ease: "easeOut",
					delay: index * .06
				},
				children: /* @__PURE__ */ jsx(BlogCard, {
					blog,
					onClick: () => onSelectBlog(blog)
				})
			}, blog.id))
		})]
	});
}
function Footer({ quotes, handle }) {
	const { colors } = useTheme();
	const [quote, setQuote] = useState(quotes[0]);
	useEffect(() => {
		setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, [quotes]);
	return /* @__PURE__ */ jsxs(motion.section, {
		initial: { opacity: 0 },
		whileInView: { opacity: 1 },
		transition: { duration: .6 },
		viewport: { once: true },
		className: "text-center py-6 sm:py-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-px w-12 sm:w-16 rounded-full",
						style: { background: `linear-gradient(to right, transparent, ${colors.accent}50)` }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
						style: { background: colors.accent }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "h-px w-12 sm:w-16 rounded-full",
						style: { background: `linear-gradient(to left, transparent, ${colors.accent}50)` }
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.blockquote, {
				initial: {
					opacity: 0,
					y: 10
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					delay: .2
				},
				viewport: { once: true },
				className: "mb-6 sm:mb-8",
				children: /* @__PURE__ */ jsxs("p", {
					className: "text-base sm:text-lg md:text-xl font-serif italic max-w-md mx-auto leading-relaxed px-4",
					style: {
						color: `${colors.foreground}b3`,
						textShadow: `0 0 40px ${colors.highlight}20`
					},
					children: [
						"\"",
						quote,
						"\""
					]
				})
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-[10px] sm:text-xs",
				style: { color: `${colors.foreground}4d` },
				children: ["crafted with purpose — ", /* @__PURE__ */ jsxs("span", {
					style: { color: colors.accent },
					children: ["@", handle]
				})]
			})
		]
	});
}
function GitHubChart({ username }) {
	const { colors, mode } = useTheme();
	const chartColor = colors.primary.replace("#", "");
	return /* @__PURE__ */ jsxs(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "mb-5 sm:mb-6",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "text-xs sm:text-sm mb-2 sm:mb-3",
			style: { color: `${colors.foreground}99` },
			children: [
				/* @__PURE__ */ jsx("span", {
					style: { color: colors.foreground },
					className: "font-medium",
					children: "Contributions"
				}),
				" @",
				username
			]
		}), /* @__PURE__ */ jsx("img", {
			src: `https://ghchart.rshah.org/${chartColor}/${username}`,
			alt: "GitHub Contributions",
			className: "w-full rounded-lg",
			style: { filter: mode === "dark" ? "invert(1) hue-rotate(180deg)" : "none" }
		})]
	});
}
var FEATURES = [
	"6 built-in theme presets with light/dark modes",
	"Custom theme support via Coolors.co URLs",
	"Animated view transitions for theme switching",
	"GitHub contribution chart integration",
	"Spotify now playing widget",
	"Responsive skill slider with auto-scroll",
	"Expandable experience and education sections",
	"Project cards with gradient hover effects",
	"Blog section with reading time estimates",
	"Framer Motion animations throughout",
	"SEO-optimized with OG meta tags",
	"Fully customizable via data.json"
];
function IllustrationOverlay() {
	const { colors, themeName, mode, setTheme, setMode } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const themeKeys = Object.keys(THEME_PRESETS);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.button, {
		initial: {
			scale: 0,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1
		},
		transition: {
			delay: 1,
			type: "spring",
			stiffness: 200
		},
		onClick: () => setIsOpen(true),
		className: "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl backdrop-blur-md border transition-transform hover:scale-110 cursor-pointer",
		style: {
			background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
			borderColor: `${colors.highlight}40`
		},
		children: /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6 text-white" })
	}), /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setIsOpen(false),
		className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
	}), /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			x: 400
		},
		animate: {
			opacity: 1,
			x: 0
		},
		exit: {
			opacity: 0,
			x: 400
		},
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto border-l shadow-2xl",
		style: {
			backgroundColor: colors.background,
			borderColor: colors.border
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-semibold",
						style: { color: colors.foreground },
						children: "Porthat Demo Mode"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						className: "p-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer",
						style: { color: colors.foreground },
						children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "p-4 rounded-xl mb-6 border",
					style: {
						backgroundColor: `${colors.highlight}15`,
						borderColor: `${colors.highlight}30`
					},
					children: /* @__PURE__ */ jsxs("p", {
						className: "text-sm",
						style: { color: colors.foreground },
						children: [
							"This panel is visible because ",
							/* @__PURE__ */ jsx("code", {
								className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
								children: "illustration: true"
							}),
							" is set in your ",
							/* @__PURE__ */ jsx("code", {
								className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
								children: "data.json"
							}),
							". Set it to ",
							/* @__PURE__ */ jsx("code", {
								className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
								children: "false"
							}),
							" for production."
						]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ jsx(Palette, {
							className: "w-4 h-4",
							style: { color: colors.highlight }
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-medium",
							style: { color: colors.foreground },
							children: "Theme Presets"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-2",
						children: themeKeys.map((key) => {
							const preset = THEME_PRESETS[key];
							const isActive = themeName === key;
							return /* @__PURE__ */ jsxs("button", {
								onClick: () => setTheme(key),
								className: "flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer",
								style: {
									backgroundColor: isActive ? `${colors.highlight}20` : "transparent",
									borderColor: isActive ? colors.highlight : colors.border
								},
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-0.5",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-3 h-3 rounded-full",
											style: { backgroundColor: preset.dark.primary }
										}), /* @__PURE__ */ jsx("div", {
											className: "w-3 h-3 rounded-full",
											style: { backgroundColor: preset.dark.highlight }
										})]
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm flex-1 text-left",
										style: { color: colors.foreground },
										children: preset.name
									}),
									isActive && /* @__PURE__ */ jsx(Check, {
										className: "w-4 h-4",
										style: { color: colors.highlight }
									})
								]
							}, key);
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-3",
						children: [mode === "dark" ? /* @__PURE__ */ jsx(Moon, {
							className: "w-4 h-4",
							style: { color: colors.highlight }
						}) : /* @__PURE__ */ jsx(Sun, {
							className: "w-4 h-4",
							style: { color: colors.highlight }
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-medium",
							style: { color: colors.foreground },
							children: "Mode"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: (e) => setMode("light", e),
							className: "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer",
							style: {
								backgroundColor: mode === "light" ? `${colors.highlight}20` : "transparent",
								borderColor: mode === "light" ? colors.highlight : colors.border
							},
							children: [/* @__PURE__ */ jsx(Sun, {
								className: "w-4 h-4",
								style: { color: colors.foreground }
							}), /* @__PURE__ */ jsx("span", {
								className: "text-sm",
								style: { color: colors.foreground },
								children: "Light"
							})]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: (e) => setMode("dark", e),
							className: "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer",
							style: {
								backgroundColor: mode === "dark" ? `${colors.highlight}20` : "transparent",
								borderColor: mode === "dark" ? colors.highlight : colors.border
							},
							children: [/* @__PURE__ */ jsx(Moon, {
								className: "w-4 h-4",
								style: { color: colors.foreground }
							}), /* @__PURE__ */ jsx("span", {
								className: "text-sm",
								style: { color: colors.foreground },
								children: "Dark"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ jsx(BookOpen, {
							className: "w-4 h-4",
							style: { color: colors.highlight }
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-medium",
							style: { color: colors.foreground },
							children: "Features"
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: FEATURES.map((feature, index) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-2 text-sm",
							style: { color: `${colors.foreground}b3` },
							children: [/* @__PURE__ */ jsx(Check, {
								className: "w-4 h-4 mt-0.5 flex-shrink-0",
								style: { color: colors.highlight }
							}), feature]
						}, index))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-medium",
						style: { color: colors.foreground },
						children: "How to Use"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2 text-sm",
						style: { color: `${colors.foreground}b3` },
						children: [
							/* @__PURE__ */ jsxs("p", { children: [
								"1. Edit ",
								/* @__PURE__ */ jsx("code", {
									className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
									children: "src/data/data.json"
								}),
								" with your info"
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								"2. Set theme preset in ",
								/* @__PURE__ */ jsx("code", {
									className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
									children: "\"theme\""
								}),
								" field"
							] }),
							/* @__PURE__ */ jsxs("p", { children: ["3. Available themes: ", /* @__PURE__ */ jsx("code", {
								className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
								children: themeKeys.join(", ")
							})] }),
							/* @__PURE__ */ jsx("p", { children: "4. Or use custom Coolors URL for custom themes" }),
							/* @__PURE__ */ jsxs("p", { children: [
								"5. Set ",
								/* @__PURE__ */ jsx("code", {
									className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
									children: "\"illustration\": false"
								}),
								" for production"
							] })
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-3 mt-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Music, {
							className: "w-4 h-4",
							style: { color: colors.highlight }
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-medium",
							style: { color: colors.foreground },
							children: "Spotify Setup"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2 text-sm",
						style: { color: `${colors.foreground}b3` },
						children: [
							/* @__PURE__ */ jsxs("p", { children: ["1. Create app at ", /* @__PURE__ */ jsx("code", {
								className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
								children: "developer.spotify.com/dashboard"
							})] }),
							/* @__PURE__ */ jsxs("p", { children: [
								"2. Add ",
								/* @__PURE__ */ jsx("code", {
									className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
									children: "http://localhost:3000/callback"
								}),
								" to Redirect URIs"
							] }),
							/* @__PURE__ */ jsx("p", { children: "3. Get refresh token via OAuth authorization flow" }),
							/* @__PURE__ */ jsxs("p", { children: [
								"4. Create ",
								/* @__PURE__ */ jsx("code", {
									className: "px-1.5 py-0.5 rounded bg-black/20 text-xs",
									children: ".env"
								}),
								" with:"
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-2 p-2 rounded-lg bg-black/20 font-mono text-xs space-y-1",
								children: [
									/* @__PURE__ */ jsx("p", { children: "VITE_SPOTIFY_CLIENT_ID=..." }),
									/* @__PURE__ */ jsx("p", { children: "VITE_SPOTIFY_CLIENT_SECRET=..." }),
									/* @__PURE__ */ jsx("p", { children: "VITE_SPOTIFY_REFRESH_TOKEN=..." })
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2",
								children: "See README for detailed OAuth token guide."
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 pt-6 border-t space-y-3",
					style: { borderColor: colors.border },
					children: [/* @__PURE__ */ jsxs("a", {
						href: "https://github.com/pixperk/porthat",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex items-center justify-center gap-2 w-full p-3 rounded-xl font-medium transition-all cursor-pointer",
						style: {
							background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
							color: "white"
						},
						children: [/* @__PURE__ */ jsx(GitHubIcon, { className: "w-4 h-4" }), "View on GitHub"]
					}), /* @__PURE__ */ jsxs("a", {
						href: "https://twitter.com/pixperk",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex items-center justify-center gap-2 w-full p-3 rounded-xl font-medium transition-all border cursor-pointer",
						style: {
							borderColor: colors.border,
							color: colors.foreground
						},
						children: [/* @__PURE__ */ jsx(XIcon, { className: "w-4 h-4" }), "Follow @pixperk"]
					})]
				})
			]
		})
	})] }) })] });
}
function Contact({ profile, socials }) {
	const { colors, mode } = useTheme();
	return /* @__PURE__ */ jsx(motion.section, {
		variants: ANIMATION.fadeIn,
		className: "mb-5 sm:mb-6 relative p-4 sm:p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-sm mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-6 sm:mb-8",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg sm:text-xl font-semibold mb-2",
					style: { color: colors.foreground },
					children: "Contact"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs sm:text-sm",
					style: { color: `${colors.foreground}99` },
					children: "Reach out directly"
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("a", {
						href: `mailto:${profile.email}`,
						className: "flex items-center gap-4 p-3 sm:p-4 rounded-lg border transition-colors hover:border-opacity-60",
						style: {
							borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
							backgroundColor: mode === "dark" ? "transparent" : "transparent"
						},
						children: [/* @__PURE__ */ jsx(Mail, {
							className: "w-5 h-5 flex-shrink-0",
							style: { color: colors.primary }
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs",
								style: { color: `${colors.foreground}99` },
								children: "Email"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm truncate",
								style: { color: colors.foreground },
								children: profile.email
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 p-3 sm:p-4 rounded-lg border",
						style: { borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)" },
						children: [/* @__PURE__ */ jsx(MapPin, {
							className: "w-5 h-5 flex-shrink-0",
							style: { color: colors.accent }
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs",
							style: { color: `${colors.foreground}99` },
							children: "Location"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm",
							style: { color: colors.foreground },
							children: profile.location
						})] })]
					}),
					socials.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "pt-2",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap justify-center gap-2",
							children: socials.map((social) => /* @__PURE__ */ jsxs("a", {
								href: social.url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm border transition-colors",
								style: {
									color: colors.foreground,
									borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
									backgroundColor: mode === "dark" ? "transparent" : "transparent"
								},
								children: [/* @__PURE__ */ jsx(Icon, {
									name: social.icon,
									className: "w-3.5 h-3.5"
								}), social.name]
							}, social.name))
						})
					})
				]
			})]
		})
	});
}
var ResumeRAGClient = class {
	supabaseUrl;
	supabaseKey;
	constructor(supabaseUrl, supabaseKey) {
		this.supabaseUrl = supabaseUrl;
		this.supabaseKey = supabaseKey;
	}
	async query(query, options = {}) {
		try {
			const response = await fetch(`${this.supabaseUrl}/functions/v1/resume-rag`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.supabaseKey}`
				},
				body: JSON.stringify({
					query,
					chatHistory: options.chatHistory
				})
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			return await response.json();
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error"
			};
		}
	}
};
var ragClient = new ResumeRAGClient("https://kodnlecgztfqhkflwcfx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZG5sZWNnenRmcWhrZmx3Y2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODc1NjcsImV4cCI6MjA4ODU2MzU2N30.FXldEV_Ta8Zgm2XZelz0sxwVlhSLr8_zuZSQeX9se9w");
function ResumeChat() {
	const { colors } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([{
		role: "assistant",
		content: "Hey! Ask me anything about my resume — skills, experience, projects, or education."
	}]);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	useEffect(() => {
		if (isOpen) inputRef.current?.focus();
	}, [isOpen]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const trimmed = query.trim();
		if (!trimmed || loading) return;
		setMessages((prev) => [...prev, {
			role: "user",
			content: trimmed
		}]);
		setQuery("");
		setLoading(true);
		try {
			const recentHistory = messages.slice(-6);
			const result = await ragClient.query(trimmed, { chatHistory: recentHistory });
			const reply = result.success ? result.answer || "I couldn't find a specific answer for that." : result.error || "Something went wrong. Please try again.";
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: reply
			}]);
		} catch {
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: "Sorry, I'm having trouble connecting right now."
			}]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.button, {
		onClick: () => setIsOpen((o) => !o),
		className: "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer",
		style: {
			background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
			color: "#fff"
		},
		initial: {
			scale: 0,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1,
			boxShadow: isOpen ? "0 10px 40px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.15)"
		},
		whileHover: {
			scale: 1.1,
			boxShadow: "0 12px 50px rgba(0,0,0,0.3)",
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 10
			}
		},
		whileTap: { scale: .9 },
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20
		},
		"aria-label": isOpen ? "Close chat" : "Open chat",
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: isOpen ? /* @__PURE__ */ jsx(motion.span, {
				initial: {
					rotate: -180,
					opacity: 0,
					scale: .5
				},
				animate: {
					rotate: 0,
					opacity: 1,
					scale: 1
				},
				exit: {
					rotate: 180,
					opacity: 0,
					scale: .5
				},
				transition: {
					duration: .3,
					type: "spring",
					stiffness: 200,
					damping: 15
				},
				children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
			}, "close") : /* @__PURE__ */ jsx(motion.span, {
				initial: {
					scale: 0,
					opacity: 0,
					rotate: -180
				},
				animate: {
					scale: 1,
					opacity: 1,
					rotate: 0
				},
				exit: {
					scale: 0,
					opacity: 0,
					rotate: 180
				},
				transition: {
					duration: .3,
					type: "spring",
					stiffness: 200,
					damping: 15
				},
				children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" })
			}, "open")
		})
	}), /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 30,
			scale: .9,
			rotateX: -15
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			rotateX: 0
		},
		exit: {
			opacity: 0,
			y: 30,
			scale: .95,
			rotateX: 10
		},
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			mass: .8
		},
		className: "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col",
		style: {
			height: "min(500px, calc(100vh - 10rem))",
			backgroundColor: colors.background,
			border: `1px solid ${colors.border}`,
			transformPerspective: "1000px"
		},
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				className: "flex items-center gap-3 px-5 py-4 shrink-0",
				style: { background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` },
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					type: "spring",
					stiffness: 300,
					damping: 25
				},
				children: [
					/* @__PURE__ */ jsx(motion.div, {
						className: "w-9 h-9 rounded-full flex items-center justify-center",
						style: { backgroundColor: "rgba(255,255,255,0.2)" },
						animate: { boxShadow: [
							"0 0 0 0 rgba(255,255,255,0.4)",
							"0 0 0 8px rgba(255,255,255,0)",
							"0 0 0 0 rgba(255,255,255,0)"
						] },
						transition: {
							duration: 2,
							repeat: Infinity,
							ease: "easeOut"
						},
						children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-white" })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ jsx(motion.p, {
							className: "text-sm font-semibold text-white leading-tight",
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .1 },
							children: "Resume Chat"
						}), /* @__PURE__ */ jsx(motion.p, {
							className: "text-xs text-white/70",
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .15 },
							children: "Ask me anything"
						})]
					}),
					/* @__PURE__ */ jsx(motion.button, {
						onClick: () => setIsOpen(false),
						className: "p-1.5 rounded-lg transition-colors cursor-pointer",
						whileHover: {
							backgroundColor: "rgba(255,255,255,0.3)",
							scale: 1.1,
							rotate: 90
						},
						whileTap: {
							scale: .9,
							rotate: 0
						},
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 17
						},
						children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scrollbar",
				children: [
					messages.map((msg, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 15,
							scale: .95,
							x: msg.role === "user" ? 20 : -20
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1,
							x: 0
						},
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 25,
							delay: i === messages.length - 1 ? 0 : 0
						},
						className: `flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`,
						children: [/* @__PURE__ */ jsx(motion.div, {
							className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
							style: { backgroundColor: msg.role === "assistant" ? `${colors.accent}20` : `${colors.primary}20` },
							initial: {
								scale: 0,
								rotate: -180
							},
							animate: {
								scale: 1,
								rotate: 0
							},
							transition: {
								type: "spring",
								stiffness: 500,
								damping: 20,
								delay: .1
							},
							whileHover: {
								scale: 1.1,
								rotate: [
									0,
									-10,
									10,
									-10,
									0
								],
								transition: { duration: .5 }
							},
							children: msg.role === "assistant" ? /* @__PURE__ */ jsx(Bot, {
								className: "w-3.5 h-3.5",
								style: { color: colors.accent }
							}) : /* @__PURE__ */ jsx(User, {
								className: "w-3.5 h-3.5",
								style: { color: colors.primary }
							})
						}), /* @__PURE__ */ jsx(motion.div, {
							className: "max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
							style: msg.role === "user" ? {
								background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
								color: "#fff"
							} : {
								backgroundColor: colors.card,
								color: colors.foreground,
								border: `1px solid ${colors.border}`
							},
							initial: {
								scale: .8,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 25,
								delay: .05
							},
							whileHover: {
								scale: 1.02,
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 10
								}
							},
							children: msg.role === "assistant" ? /* @__PURE__ */ jsx(Markdown, {
								components: {
									p: ({ children }) => /* @__PURE__ */ jsx("p", {
										className: "my-1 first:mt-0 last:mb-0",
										children
									}),
									ul: ({ children }) => /* @__PURE__ */ jsx("ul", {
										className: "my-1.5 ml-4 list-disc space-y-1 first:mt-0 last:mb-0",
										children
									}),
									ol: ({ children }) => /* @__PURE__ */ jsx("ol", {
										className: "my-1.5 ml-4 list-decimal space-y-1 first:mt-0 last:mb-0",
										children
									}),
									li: ({ children }) => /* @__PURE__ */ jsx("li", {
										className: "leading-relaxed",
										children
									}),
									strong: ({ children }) => /* @__PURE__ */ jsx("strong", {
										className: "font-semibold",
										style: { color: colors.accent },
										children
									}),
									a: ({ href, children }) => /* @__PURE__ */ jsx("a", {
										href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "underline underline-offset-2",
										style: { color: colors.primary },
										children
									}),
									code: ({ children }) => /* @__PURE__ */ jsx("code", {
										className: "rounded px-1 py-0.5 text-xs",
										style: { backgroundColor: `${colors.foreground}10` },
										children
									})
								},
								children: msg.content
							}) : msg.content
						})]
					}, i)),
					loading && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 10,
							scale: .8
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .8
						},
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 20
						},
						className: "flex gap-2.5",
						children: [/* @__PURE__ */ jsx(motion.div, {
							className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
							style: { backgroundColor: `${colors.accent}20` },
							animate: { scale: [
								1,
								1.1,
								1
							] },
							transition: {
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: /* @__PURE__ */ jsx(Bot, {
								className: "w-3.5 h-3.5",
								style: { color: colors.accent }
							})
						}), /* @__PURE__ */ jsxs(motion.div, {
							className: "rounded-xl px-4 py-3 flex items-center gap-2",
							style: {
								backgroundColor: colors.card,
								border: `1px solid ${colors.border}`
							},
							animate: { boxShadow: [
								"0 0 0 rgba(0,0,0,0)",
								"0 2px 8px rgba(0,0,0,0.05)",
								"0 0 0 rgba(0,0,0,0)"
							] },
							transition: {
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: [/* @__PURE__ */ jsx(motion.div, {
								animate: { rotate: 360 },
								transition: {
									duration: 1,
									repeat: Infinity,
									ease: "linear"
								},
								children: /* @__PURE__ */ jsx(Loader2, {
									className: "w-4 h-4",
									style: { color: colors.accent }
								})
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs flex items-center gap-1",
								style: { color: `${colors.foreground}80` },
								children: [
									"Thinking",
									/* @__PURE__ */ jsx(motion.span, {
										animate: { opacity: [
											0,
											1,
											0
										] },
										transition: {
											duration: 1.5,
											repeat: Infinity,
											times: [
												0,
												.5,
												1
											]
										},
										children: "."
									}),
									/* @__PURE__ */ jsx(motion.span, {
										animate: { opacity: [
											0,
											1,
											0
										] },
										transition: {
											duration: 1.5,
											repeat: Infinity,
											times: [
												0,
												.5,
												1
											],
											delay: .2
										},
										children: "."
									}),
									/* @__PURE__ */ jsx(motion.span, {
										animate: { opacity: [
											0,
											1,
											0
										] },
										transition: {
											duration: 1.5,
											repeat: Infinity,
											times: [
												0,
												.5,
												1
											],
											delay: .4
										},
										children: "."
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", { ref: messagesEndRef })
				]
			}),
			/* @__PURE__ */ jsxs(motion.form, {
				onSubmit: handleSubmit,
				className: "shrink-0 px-4 py-3 flex items-center gap-2",
				style: { borderTop: `1px solid ${colors.border}` },
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .1,
					type: "spring",
					stiffness: 300,
					damping: 25
				},
				children: [/* @__PURE__ */ jsx(motion.input, {
					ref: inputRef,
					type: "text",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Type a question…",
					disabled: loading,
					className: "flex-1 text-sm rounded-xl px-4 py-2.5 outline-none placeholder:opacity-50 transition-all",
					style: {
						backgroundColor: `${colors.foreground}08`,
						color: colors.foreground,
						border: `1px solid ${colors.border}`
					},
					whileFocus: {
						scale: 1.01,
						borderColor: colors.primary,
						boxShadow: `0 0 0 2px ${colors.primary}20`
					}
				}), /* @__PURE__ */ jsx(motion.button, {
					type: "submit",
					disabled: loading || !query.trim(),
					className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed",
					style: {
						background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
						color: "#fff"
					},
					whileHover: {
						scale: 1.1,
						rotate: -15,
						boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
					},
					whileTap: {
						scale: .9,
						rotate: 0
					},
					animate: { opacity: loading || !query.trim() ? .3 : 1 },
					transition: {
						type: "spring",
						stiffness: 400,
						damping: 17
					},
					children: /* @__PURE__ */ jsx(motion.div, {
						animate: loading ? { x: [
							0,
							3,
							0
						] } : {},
						transition: {
							duration: .6,
							repeat: Infinity
						},
						children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
					})
				})]
			})
		]
	}) })] });
}
function BlogDetailModal({ blog, onClose }) {
	const { colors } = useTheme();
	const [relatedBlogs, setRelatedBlogs] = useState([]);
	const [isOpen, setIsOpen] = useState(true);
	useEffect(() => {
		incrementViewCount(blog.id);
		loadRelatedBlogs();
	}, [blog.id]);
	const loadRelatedBlogs = async () => {
		try {
			setRelatedBlogs(await getRelatedBlogs(blog.id, blog.tags, 3));
		} catch (err) {
			console.error(err);
		}
	};
	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => onClose(), 300);
	};
	const publishDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .3 },
		className: "fixed inset-0 z-50 overflow-y-auto",
		style: { backgroundColor: `${colors.background}dd` },
		children: /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: 20
			},
			transition: { duration: .3 },
			className: "min-h-screen py-8 px-4 flex items-center justify-center",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border p-8 relative",
				style: {
					backgroundColor: colors.background,
					borderColor: "var(--border-color)"
				},
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: handleClose,
						className: "absolute top-4 right-4 p-2 rounded-lg border transition-colors",
						style: {
							borderColor: "var(--border-color)",
							color: "var(--text-muted)"
						},
						title: "Close",
						children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: handleClose,
						className: "flex items-center gap-2 px-3 py-2 rounded border transition-colors mb-6 text-sm",
						style: { borderColor: "var(--border-color)" },
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Back"]
					}),
					blog.coverImage && /* @__PURE__ */ jsx("img", {
						src: blog.coverImage,
						alt: blog.title,
						className: "w-full h-64 object-cover rounded-lg mb-6"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-4xl font-bold mb-4",
								children: blog.title
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-4 text-sm mb-4",
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
								className: "flex flex-wrap gap-2",
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
						className: "h-px mb-6",
						style: { backgroundColor: "var(--border-color)" }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "prose dark:prose-invert max-w-none text-base leading-relaxed mb-6",
						style: { color: "var(--foreground)" },
						dangerouslySetInnerHTML: { __html: blog.content }
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-4 rounded border mb-6",
						style: {
							borderColor: "var(--border-color)",
							backgroundColor: "var(--bg-secondary)"
						},
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium mb-1",
							children: "Written by"
						}), /* @__PURE__ */ jsx("p", {
							style: { color: "var(--text-muted)" },
							className: "text-sm",
							children: blog.author
						})]
					}),
					relatedBlogs.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "h-px mb-6",
						style: { backgroundColor: "var(--border-color)" }
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold mb-4",
						children: "Related posts"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: relatedBlogs.map((relatedBlog) => /* @__PURE__ */ jsx(BlogCard, {
							blog: relatedBlog,
							onClick: () => {
								handleClose();
							}
						}, relatedBlog.id))
					})] })] })
				]
			})
		})
	}) });
}
function PortfolioContent({ data }) {
	const { colors } = useTheme();
	const [selectedBlog, setSelectedBlog] = useState(null);
	return /* @__PURE__ */ jsxs("div", {
		style: {
			backgroundColor: colors.background,
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 pointer-events-none",
				style: {
					backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
					backgroundSize: "24px 24px"
				}
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24",
				initial: "hidden",
				animate: "visible",
				variants: ANIMATION.stagger,
				children: [
					/* @__PURE__ */ jsx(Hero, {
						profile: data.profile,
						roles: data.roles,
						socials: data.socials
					}),
					/* @__PURE__ */ jsxs(motion.section, {
						variants: ANIMATION.fadeIn,
						className: "mb-6",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "text-xs sm:text-sm mb-2 sm:mb-3",
							style: { color: `${colors.foreground}99` },
							children: ["My ", /* @__PURE__ */ jsx("span", {
								style: { color: colors.foreground },
								className: "font-medium",
								children: "skills"
							})]
						}), /* @__PURE__ */ jsx(SkillSlider, { skills: data.skills })]
					}),
					/* @__PURE__ */ jsx(GitHubChart, { username: data.github }),
					/* @__PURE__ */ jsx(Experience, { experiences: data.experience }),
					/* @__PURE__ */ jsx(Education, { education: data.education }),
					/* @__PURE__ */ jsx(Projects, { projects: data.projects }),
					/* @__PURE__ */ jsx(BlogSection, { onSelectBlog: setSelectedBlog }),
					/* @__PURE__ */ jsx(Contact, {
						profile: data.profile,
						socials: data.socials
					}),
					/* @__PURE__ */ jsx(Footer, {
						quotes: data.quotes,
						handle: data.profile.handle
					})
				]
			}),
			data.illustration && /* @__PURE__ */ jsx(IllustrationOverlay, {}),
			/* @__PURE__ */ jsx(ResumeChat, {}),
			selectedBlog && /* @__PURE__ */ jsx(BlogDetailModal, {
				blog: selectedBlog,
				onClose: () => setSelectedBlog(null)
			})
		]
	});
}
function Portfolio({ data }) {
	return /* @__PURE__ */ jsx(ThemeProvider, {
		initialTheme: data.theme,
		children: /* @__PURE__ */ jsx(PortfolioContent, { data })
	});
}
function App() {
	return /* @__PURE__ */ jsx(Portfolio, { data: data_default });
}
//#endregion
export { App as component };
