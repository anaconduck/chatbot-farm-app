export interface DifyChatMessagePayload {
  query: string;
  conversation_id?: string;
  user: string;
  inputs?: Record<string, unknown>;
  response_mode?: "blocking" | "streaming";
}

export interface DifySourceDocument {
  title: string;
  dataset_id: string;
  dataset_name: string;
  document_id: string;
  document_name: string;
  segment_id: string;
  score: number;
  content: string;
}

export interface DifyChatResponse {
  event: string;
  task_id: string;
  id: string;
  message_id: string;
  conversation_id: string;
  mode: string;
  answer: string;
  created_at: number;
  metadata?: {
    retriever_resources?: DifySourceDocument[];
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

export interface DifyUploadDocumentResponse {
  document: {
    id: string;
    position: number;
    data_source_type: string;
    name: string;
    created_from: string;
    created_at: number;
    tokens: number;
    indexing_status: "waiting" | "parsing" | "cleaning" | "indexing" | "completed" | "error";
    error?: string | null;
    enabled: boolean;
    disabled_at?: number | null;
    archived: boolean;
  };
  batch: string;
}
