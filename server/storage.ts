import { type Message, type InsertMessage, type BlogPost, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | null>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private blogPosts: Map<number, BlogPost>;
  private currentMessageId: number;
  private currentBlogPostId: number;

  constructor() {
    this.messages = new Map();
    this.blogPosts = new Map();
    this.currentMessageId = 1;
    this.currentBlogPostId = 1;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const post: BlogPost = {
      ...insertPost,
      id,
      slug: this.generateSlug(insertPost.title),
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    return this.blogPosts.get(id) || null;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}

export const storage = new MemStorage();