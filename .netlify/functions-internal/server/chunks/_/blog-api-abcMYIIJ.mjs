import { o as supabase } from "./supabase-DIJitN88.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-api-abcMYIIJ.js
var TABLE_NAME = "blogs";
/**
* Generate URL-friendly slug from title
*/
function generateSlug(title) {
	return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
/**
* Calculate reading time in minutes
*/
function calculateReadingTime(content) {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}
/**
* Create a new blog post
*/
async function createBlog(input, authorId) {
	const slug = generateSlug(input.title);
	const readingTime = calculateReadingTime(input.content);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(authorId);
	const { data, error } = await supabase.from(TABLE_NAME).insert({
		title: input.title,
		slug,
		content: input.content,
		excerpt: input.excerpt,
		coverImage: input.coverImage || null,
		tags: input.tags || [],
		author: authorId,
		created_by: isUuid ? authorId : null,
		updated_by: isUuid ? authorId : null,
		status: input.status || "draft",
		metaTitle: input.metaTitle || input.title,
		metaDescription: input.metaDescription || input.excerpt,
		readingTime,
		featured: false,
		viewCount: 0,
		createdAt: now,
		updatedAt: now,
		publishedAt: input.status === "published" ? now : null
	}).select().single();
	if (error) throw new Error(`Failed to create blog: ${error.message}`);
	return data;
}
/**
* Update a blog post
*/
async function updateBlog(id, input) {
	const readingTime = input.content ? calculateReadingTime(input.content) : void 0;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const updateData = {
		...input,
		updatedAt: now,
		readingTime
	};
	if (input.title) updateData.slug = generateSlug(input.title);
	const { data, error } = await supabase.from(TABLE_NAME).update(updateData).eq("id", id).select().single();
	if (error) throw new Error(`Failed to update blog: ${error.message}`);
	return data;
}
/**
* Publish or unpublish a blog
*/
async function togglePublishBlog(id, publish) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data, error } = await supabase.from(TABLE_NAME).update({
		status: publish ? "published" : "draft",
		publishedAt: publish ? now : null,
		updatedAt: now
	}).eq("id", id).select("*").maybeSingle();
	if (error) throw new Error(`Failed to toggle publish status: ${error.message}`);
	if (!data) throw new Error("Failed to toggle publish status: blog not found or insufficient permissions");
	return data;
}
/**
* Delete a blog post
*/
async function deleteBlog(id) {
	const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
	if (error) throw new Error(`Failed to delete blog: ${error.message}`);
}
/**
* Increment view count
*/
async function incrementViewCount(id) {
	const { data: blog, error: fetchError } = await supabase.from(TABLE_NAME).select("viewCount").eq("id", id).single();
	if (fetchError) throw fetchError;
	const { error } = await supabase.from(TABLE_NAME).update({ viewCount: (blog.viewCount || 0) + 1 }).eq("id", id);
	if (error) throw error;
}
/**
* List published blogs with pagination, search, and filtering
*/
async function listPublishedBlogs(page = 1, limit = 9, search = "", tags = []) {
	let query = supabase.from(TABLE_NAME).select("*", { count: "exact" }).eq("status", "published").order("publishedAt", { ascending: false });
	if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
	if (tags.length > 0) for (const tag of tags) query = query.contains("tags", [tag]);
	const offset = (page - 1) * limit;
	const { data, count, error } = await query.range(offset, offset + limit - 1);
	if (error) throw new Error(`Failed to list blogs: ${error.message}`);
	return {
		blogs: data,
		total: count || 0,
		page,
		limit
	};
}
/**
* List all blogs (admin - draft + published)
*/
async function listAllBlogs(page = 1, limit = 10, search = "") {
	let query = supabase.from(TABLE_NAME).select("*", { count: "exact" }).order("createdAt", { ascending: false });
	if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
	const offset = (page - 1) * limit;
	const { data, count, error } = await query.range(offset, offset + limit - 1);
	if (error) throw new Error(`Failed to list blogs: ${error.message}`);
	return {
		blogs: data,
		total: count || 0,
		page,
		limit
	};
}
/**
* Get related blogs by tags
*/
async function getRelatedBlogs(currentBlogId, tags, limit = 3) {
	let query = supabase.from(TABLE_NAME).select("*").eq("status", "published").neq("id", currentBlogId).order("publishedAt", { ascending: false }).limit(limit);
	if (tags.length > 0) for (const tag of tags) query = query.contains("tags", [tag]);
	const { data, error } = await query;
	if (error) throw new Error(`Failed to fetch related blogs: ${error.message}`);
	return data;
}
/**
* Get all unique tags
*/
async function getAllTags() {
	const { data, error } = await supabase.from(TABLE_NAME).select("tags").eq("status", "published");
	if (error) throw new Error(`Failed to fetch tags: ${error.message}`);
	const allTags = /* @__PURE__ */ new Set();
	data?.forEach((blog) => {
		blog.tags?.forEach((tag) => allTags.add(tag));
	});
	return Array.from(allTags).sort();
}
//#endregion
export { incrementViewCount as a, togglePublishBlog as c, getRelatedBlogs as i, updateBlog as l, deleteBlog as n, listAllBlogs as o, getAllTags as r, listPublishedBlogs as s, createBlog as t };
