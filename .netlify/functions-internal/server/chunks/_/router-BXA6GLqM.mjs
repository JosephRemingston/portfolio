import { n as ThemeProvider } from "./supabase-DIJitN88.mjs";
import { t as AuthProvider } from "./AuthContext-BZlQtyF-.mjs";
import { t as data_default } from "./data-C-TOc-tN.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { HeadContent, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BXA6GLqM.js
var styles_default = "/assets/styles-Cj_Qxzo6.css";
var { profile, roles } = data_default;
var siteTitle = `${profile.name} | Portfolio`;
var siteDescription = profile.bio;
var siteUrl = "http://localhost:3000";
var ogImage = `${siteUrl}/assets/ogimg.png`;
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: siteTitle },
			{
				name: "description",
				content: siteDescription
			},
			{
				name: "author",
				content: profile.name
			},
			{
				name: "keywords",
				content: roles.join(", ")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: siteUrl
			},
			{
				property: "og:title",
				content: siteTitle
			},
			{
				property: "og:description",
				content: siteDescription
			},
			{
				property: "og:image",
				content: ogImage
			},
			{
				property: "og:site_name",
				content: profile.name
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:url",
				content: siteUrl
			},
			{
				name: "twitter:title",
				content: siteTitle
			},
			{
				name: "twitter:description",
				content: siteDescription
			},
			{
				name: "twitter:image",
				content: ogImage
			},
			{
				name: "theme-color",
				content: "#0a0a0a"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.ico"
			}
		]
	}),
	shellComponent: RootDocument,
	component: RootComponent
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
var $$splitComponentImporter$2 = () => import("./routes-h_pCIfsm.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./blog-7ka_vB95.mjs");
var Route$1 = createFileRoute("/blog/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./blog-BKJzngSq.mjs");
var Route = createFileRoute("/admin/blog/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	BlogIndexRoute: Route$1.update({
		id: "/blog/",
		path: "/blog/",
		getParentRoute: () => Route$3
	}),
	AdminBlogIndexRoute: Route.update({
		id: "/admin/blog/",
		path: "/admin/blog/",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: {},
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
