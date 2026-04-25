import { supabase } from './supabase';
import type { Blog, CreateBlogInput, BlogListResponse } from '../types/blog';

const TABLE_NAME = 'blogs';

/**
 * Generate URL-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Create a new blog post
 */
export async function createBlog(input: CreateBlogInput, authorId: string) {
  const slug = generateSlug(input.title);
  const readingTime = calculateReadingTime(input.content);
  const now = new Date().toISOString();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(authorId);

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      title: input.title,
      slug,
      content: input.content,
      excerpt: input.excerpt,
      coverImage: input.coverImage || null,
      tags: input.tags || [],
      author: authorId,
      created_by: isUuid ? authorId : null,
      updated_by: isUuid ? authorId : null,
      status: input.status || 'draft',
      metaTitle: input.metaTitle || input.title,
      metaDescription: input.metaDescription || input.excerpt,
      readingTime,
      featured: false,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      publishedAt: input.status === 'published' ? now : null,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create blog: ${error.message}`);
  return data as Blog;
}

/**
 * Update a blog post
 */
export async function updateBlog(id: string, input: Partial<CreateBlogInput>) {
  const readingTime = input.content ? calculateReadingTime(input.content) : undefined;
  const now = new Date().toISOString();

  const updateData: any = {
    ...input,
    updatedAt: now,
    readingTime,
  };

  if (input.title) {
    updateData.slug = generateSlug(input.title);
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update blog: ${error.message}`);
  return data as Blog;
}

/**
 * Publish or unpublish a blog
 */
export async function togglePublishBlog(id: string, publish: boolean) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      status: publish ? 'published' : 'draft',
      publishedAt: publish ? now : null,
      updatedAt: now,
    })
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throw new Error(`Failed to toggle publish status: ${error.message}`);
  if (!data) {
    throw new Error('Failed to toggle publish status: blog not found or insufficient permissions');
  }
  return data as Blog;
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string) {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);

  if (error) throw new Error(`Failed to delete blog: ${error.message}`);
}

/**
 * Get a single blog by ID
 */
export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch blog: ${error.message}`);
  return data as Blog;
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw new Error(`Failed to fetch blog: ${error.message}`);
  return data as Blog;
}

/**
 * Increment view count
 */
export async function incrementViewCount(id: string) {
  const { data: blog, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('viewCount')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ viewCount: (blog.viewCount || 0) + 1 })
    .eq('id', id);

  if (error) throw error;
}

/**
 * List published blogs with pagination, search, and filtering
 */
export async function listPublishedBlogs(
  page = 1,
  limit = 9,
  search = '',
  tags: string[] = []
): Promise<BlogListResponse> {
  let query = supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('publishedAt', { ascending: false });

  // Search
  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
  }

  // Tag filtering - PostgreSQL array contains
  if (tags.length > 0) {
    for (const tag of tags) {
      query = query.contains('tags', [tag]);
    }
  }

  const offset = (page - 1) * limit;
  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(`Failed to list blogs: ${error.message}`);

  return {
    blogs: data as Blog[],
    total: count || 0,
    page,
    limit,
  };
}

/**
 * List all blogs (admin - draft + published)
 */
export async function listAllBlogs(page = 1, limit = 10, search = '') {
  let query = supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact' })
    .order('createdAt', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const offset = (page - 1) * limit;
  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(`Failed to list blogs: ${error.message}`);

  return {
    blogs: data as Blog[],
    total: count || 0,
    page,
    limit,
  };
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit = 3) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('publishedAt', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch featured blogs: ${error.message}`);
  return data as Blog[];
}

/**
 * Get related blogs by tags
 */
export async function getRelatedBlogs(currentBlogId: string, tags: string[], limit = 3) {
  let query = supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'published')
    .neq('id', currentBlogId)
    .order('publishedAt', { ascending: false })
    .limit(limit);

  if (tags.length > 0) {
    for (const tag of tags) {
      query = query.contains('tags', [tag]);
    }
  }

  const { data, error } = await query;

  if (error) throw new Error(`Failed to fetch related blogs: ${error.message}`);
  return data as Blog[];
}

/**
 * Get all unique tags
 */
export async function getAllTags() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('tags')
    .eq('status', 'published');

  if (error) throw new Error(`Failed to fetch tags: ${error.message}`);

  // Flatten and deduplicate tags
  const allTags = new Set<string>();
  data?.forEach((blog: any) => {
    blog.tags?.forEach((tag: string) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}
