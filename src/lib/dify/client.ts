import "server-only";
import { getServerEnv } from "@/lib/env";

export class DifyClient {
  private baseUrl: string;
  private chatApiKey: string;
  private knowledgeApiKey: string;

  constructor() {
    const env = getServerEnv();
    this.baseUrl = env.DIFY_BASE_URL.replace(/\/+$/, "");
    this.chatApiKey = env.DIFY_CHAT_API_KEY || "";
    this.knowledgeApiKey = env.DIFY_KNOWLEDGE_API_KEY || "";
  }

  get isConfigured(): boolean {
    return Boolean(
      this.chatApiKey &&
      this.chatApiKey !== "dummy-dify-chat-key" &&
      !this.chatApiKey.startsWith("app-placeholder")
    );
  }

  async fetchChat(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.chatApiKey}`,
        ...options.headers,
      },
    });
  }

  async fetchKnowledge(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.knowledgeApiKey}`,
        ...options.headers,
      },
    });
  }
}

export const difyClient = new DifyClient();
