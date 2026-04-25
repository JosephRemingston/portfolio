export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  featured: boolean;
  viewCount: number;
  metaTitle: string;
  metaDescription: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogListResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
}
