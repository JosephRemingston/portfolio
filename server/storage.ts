import { type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private currentMessageId: number;

  constructor() {
    this.messages = new Map();
    this.currentMessageId = 1;
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
}

export const storage = new MemStorage();