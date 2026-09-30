import "server-only";
import { documentRepository } from "../repositories/documentRepository";
import type { KnowledgeDocument } from "@/types";

export class DocumentService {
  async getPublicKnowledge(): Promise<KnowledgeDocument[]> {
    return documentRepository.getPublishedDocuments();
  }

  async getAdminKnowledge(): Promise<KnowledgeDocument[]> {
    return documentRepository.getAllDocumentsForAdmin();
  }
}

export const documentService = new DocumentService();
