import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import type { KnowledgeDocument } from "@/types";

export class DocumentRepository {
  async getPublishedDocuments(): Promise<KnowledgeDocument[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("status", "READY")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as KnowledgeDocument[];
      }
    } catch {
      // Fallback to mock data in dev
    }

    return MOCK_DOCUMENTS;
  }

  async getAllDocumentsForAdmin(): Promise<KnowledgeDocument[]> {
    try {
      const adminClient = createAdminClient();
      const { data, error } = await adminClient
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as KnowledgeDocument[];
      }
    } catch {
      // Fallback to mock data in dev
    }

    return MOCK_DOCUMENTS;
  }
}

export const documentRepository = new DocumentRepository();
