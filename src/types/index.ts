export type UserRole = "USER" | "ADMIN";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  avatar_url?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
}

export type DocumentStatus =
  | "UPLOADED"
  | "QUEUED"
  | "SENDING_TO_DIFY"
  | "INDEXING"
  | "READY"
  | "FAILED";

export interface KnowledgeDocument {
  id: string;
  title: string;
  author?: string | null;
  publication_year?: number | null;
  category: string;
  description?: string | null;
  original_filename: string;
  storage_path?: string | null;
  dify_document_id?: string | null;
  dify_batch_id?: string | null;
  status: DocumentStatus;
  uploaded_by?: string | null;
  file_size_bytes?: number;
  download_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  dify_conversation_id?: string | null;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

export interface ChatSource {
  title: string;
  author?: string;
  year?: number;
  page?: number | string;
  snippet?: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  dify_message_id?: string | null;
  sources?: ChatSource[];
  created_at: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    role: UserRole;
    full_name: string;
    avatar_url?: string | null;
    phone?: string | null;
  } | null;
  isDemo: boolean;
  isLoading: boolean;
}
