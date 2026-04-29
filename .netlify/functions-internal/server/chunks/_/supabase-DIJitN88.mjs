import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { createClient } from "@supabase/supabase-js";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-DIJitN88.js
var THEME_PRESETS = {
	ocean: {
		name: "Ocean",
		dark: {
			primary: "#0077b6",
			secondary: "#023e8a",
			accent: "#00b4d8",
			highlight: "#48cae4",
			muted: "#90e0ef",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#0077b6",
			secondary: "#023e8a",
			accent: "#00b4d8",
			highlight: "#48cae4",
			muted: "#90e0ef",
			background: "#fafafa",
			foreground: "#0a0a0a",
			card: "rgba(255,255,255,0.6)",
			border: "rgba(0,0,0,0.08)"
		}
	},
	midnight: {
		name: "Midnight",
		dark: {
			primary: "#7c3aed",
			secondary: "#4c1d95",
			accent: "#a78bfa",
			highlight: "#c4b5fd",
			muted: "#ddd6fe",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#7c3aed",
			secondary: "#4c1d95",
			accent: "#a78bfa",
			highlight: "#c4b5fd",
			muted: "#ddd6fe",
			background: "#fafafa",
			foreground: "#0a0a0a",
			card: "rgba(255,255,255,0.6)",
			border: "rgba(0,0,0,0.08)"
		}
	},
	sunset: {
		name: "Sunset",
		dark: {
			primary: "#f97316",
			secondary: "#c2410c",
			accent: "#fb923c",
			highlight: "#fdba74",
			muted: "#fed7aa",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#ea580c",
			secondary: "#c2410c",
			accent: "#f97316",
			highlight: "#fdba74",
			muted: "#fed7aa",
			background: "#fffbf5",
			foreground: "#1a1a1a",
			card: "rgba(255,255,255,0.7)",
			border: "rgba(0,0,0,0.08)"
		}
	},
	forest: {
		name: "Forest",
		dark: {
			primary: "#059669",
			secondary: "#065f46",
			accent: "#10b981",
			highlight: "#34d399",
			muted: "#6ee7b7",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#059669",
			secondary: "#065f46",
			accent: "#10b981",
			highlight: "#34d399",
			muted: "#6ee7b7",
			background: "#f5fdf8",
			foreground: "#1a1a1a",
			card: "rgba(255,255,255,0.7)",
			border: "rgba(0,0,0,0.08)"
		}
	},
	rose: {
		name: "Rose",
		dark: {
			primary: "#e11d48",
			secondary: "#9f1239",
			accent: "#f43f5e",
			highlight: "#fb7185",
			muted: "#fda4af",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#e11d48",
			secondary: "#9f1239",
			accent: "#f43f5e",
			highlight: "#fb7185",
			muted: "#fda4af",
			background: "#fffbfc",
			foreground: "#1a1a1a",
			card: "rgba(255,255,255,0.7)",
			border: "rgba(0,0,0,0.08)"
		}
	},
	monochrome: {
		name: "Monochrome",
		dark: {
			primary: "#737373",
			secondary: "#525252",
			accent: "#a3a3a3",
			highlight: "#d4d4d4",
			muted: "#e5e5e5",
			background: "#0a0a0a",
			foreground: "#fafafa",
			card: "rgba(255,255,255,0.02)",
			border: "rgba(255,255,255,0.08)"
		},
		light: {
			primary: "#525252",
			secondary: "#404040",
			accent: "#737373",
			highlight: "#a3a3a3",
			muted: "#d4d4d4",
			background: "#fafafa",
			foreground: "#0a0a0a",
			card: "rgba(255,255,255,0.8)",
			border: "rgba(0,0,0,0.1)"
		}
	}
};
function createThemeFromCoolors(hexCodes, isDark) {
	const [primary, secondary, accent, highlight, muted] = hexCodes;
	return {
		primary: primary || "#0077b6",
		secondary: secondary || "#023e8a",
		accent: accent || "#00b4d8",
		highlight: highlight || "#48cae4",
		muted: muted || "#90e0ef",
		background: isDark ? "#0a0a0a" : "#fafafa",
		foreground: isDark ? "#fafafa" : "#0a0a0a",
		card: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
		border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
	};
}
function parseCoolorsUrl(url) {
	const match = url.match(/coolors\.co\/([a-f0-9-]+)/i);
	if (!match) return [];
	return match[1].split("-").map((hex) => `#${hex}`);
}
function getGradient(colors) {
	return `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`;
}
function getSectionGradient(colors, mode) {
	if (mode === "dark") return `linear-gradient(to bottom right, ${colors.secondary}15, transparent, ${colors.primary}10)`;
	return `linear-gradient(to bottom right, ${colors.muted}80, white, ${colors.highlight}50)`;
}
function getGlowColor(colors, mode) {
	return mode === "dark" ? `${colors.primary}30` : `${colors.highlight}40`;
}
var ThemeContext = createContext(null);
function ThemeProvider({ children, initialTheme = "ocean", storageKey = "portfolio-mode" }) {
	const [themeName, setThemeName] = useState(initialTheme);
	const [customColors, setCustomColors] = useState(null);
	const [mode, setModeState] = useState(() => {
		if (typeof window === "undefined") return "dark";
		return localStorage.getItem(storageKey) || "dark";
	});
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(mode);
	}, [mode]);
	const setTheme = (name) => {
		if (THEME_PRESETS[name]) {
			setThemeName(name);
			setCustomColors(null);
		}
	};
	const setMode = async (newMode, event) => {
		const root = window.document.documentElement;
		if (!(typeof document !== "undefined" && "startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) || !event) {
			localStorage.setItem(storageKey, newMode);
			setModeState(newMode);
			return;
		}
		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		await document.startViewTransition(async () => {
			localStorage.setItem(storageKey, newMode);
			setModeState(newMode);
		}).ready;
		root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] }, {
			duration: 500,
			easing: "ease-in-out",
			pseudoElement: "::view-transition-new(root)"
		});
	};
	const setCustomTheme = (coolorsUrl) => {
		const hexCodes = parseCoolorsUrl(coolorsUrl);
		if (hexCodes.length >= 5) {
			setThemeName("custom");
			setCustomColors({
				dark: createThemeFromCoolors(hexCodes, true),
				light: createThemeFromCoolors(hexCodes, false)
			});
		}
	};
	const getColors = () => {
		if (customColors) return customColors[mode];
		return (THEME_PRESETS[themeName] || THEME_PRESETS.ocean)[mode];
	};
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value: {
			colors: getColors(),
			themeName,
			mode,
			setTheme,
			setMode,
			setCustomTheme
		},
		children
	});
}
function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
var supabase = createClient("https://kodnlecgztfqhkflwcfx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZG5sZWNnenRmcWhrZmx3Y2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODc1NjcsImV4cCI6MjA4ODU2MzU2N30.FXldEV_Ta8Zgm2XZelz0sxwVlhSLr8_zuZSQeX9se9w");
//#endregion
export { getSectionGradient as a, getGradient as i, ThemeProvider as n, supabase as o, getGlowColor as r, useTheme as s, THEME_PRESETS as t };
