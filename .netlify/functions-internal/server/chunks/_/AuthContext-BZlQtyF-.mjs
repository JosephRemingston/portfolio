import { o as supabase } from "./supabase-DIJitN88.mjs";
import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-BZlQtyF-.js
var AuthContext = createContext(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await supabase.auth.getSession();
				setUser(data.session?.user ?? null);
			} catch (err) {
				console.error("Auth check failed:", err);
			} finally {
				setIsLoading(false);
			}
		};
		checkAuth();
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);
		});
		return () => {
			subscription?.unsubscribe();
		};
	}, []);
	const login = async (email, password) => {
		try {
			setError(null);
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (signInError) throw signInError;
		} catch (err) {
			setError(err.message || "Failed to login");
			throw err;
		}
	};
	const logout = async () => {
		try {
			setError(null);
			const { error: signOutError } = await supabase.auth.signOut();
			if (signOutError) throw signOutError;
			setUser(null);
		} catch (err) {
			setError(err.message || "Failed to logout");
			throw err;
		}
	};
	const signUp = async (email, password) => {
		try {
			setError(null);
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password
			});
			if (signUpError) throw signUpError;
		} catch (err) {
			setError(err.message || "Failed to sign up");
			throw err;
		}
	};
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			user,
			isLoading,
			isAuthenticated: !!user,
			error,
			login,
			logout,
			signUp
		},
		children
	});
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
//#endregion
export { useAuth as n, AuthProvider as t };
