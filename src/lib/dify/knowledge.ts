import "server-only";
import { difyClient } from "./client";
import { getServerEnv } from "@/lib/env";
import type { DifyUploadDocumentResponse } from "./types";

export async function uploadKnowledgeDocument(
  file: Blob,
  fileName: string
): Promise<DifyUploadDocumentResponse> {
  const env = getServerEnv();

  if (env.DIFY_MOCK_MODE || !difyClient.isConfigured) {
    // Development stub implementation
    return {
      document: {
        id: `mock-doc-${Date.now()}`,
        position: 1,
        data_source_type: "upload_file",
        name: fileName,
        created_from: "api",
        created_at: Math.floor(Date.now() / 1000),
        tokens: 1250,
        indexing_status: "indexing",
        enabled: true,
        archived: false,
      },
      batch: `batch-${Date.now()}`,
    };
  }

  const formData = new FormData();
  formData.append("file", file, fileName);
  formData.append(
    "data",
    JSON.stringify({
      indexing_technique: "high_quality",
      process_rule: {
        mode: "automatic",
      },
    })
  );

  const response = await difyClient.fetchKnowledge(
    `/datasets/${env.DIFY_DATASET_ID}/document/create-by-file`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Dify Knowledge upload error (${response.status}): ${errorText}`);
  }

  return response.json();
}

export async function deleteKnowledgeDocument(documentId: string): Promise<boolean> {
  const env = getServerEnv();

  if (env.DIFY_MOCK_MODE || !difyClient.isConfigured) {
    return true;
  }

  const response = await difyClient.fetchKnowledge(
    `/datasets/${env.DIFY_DATASET_ID}/documents/${documentId}`,
    {
      method: "DELETE",
    }
  );

  return response.ok;
}

export async function getDocumentStatus(
  batchId: string
): Promise<{ status: string; completed: boolean }> {
  const env = getServerEnv();

  if (env.DIFY_MOCK_MODE || !difyClient.isConfigured) {
    return { status: "completed", completed: true };
  }

  const response = await difyClient.fetchKnowledge(
    `/datasets/${env.DIFY_DATASET_ID}/documents/${batchId}/indexing-status`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch indexing status: ${response.statusText}`);
  }

  const data = await response.json();
  const doc = data?.data?.[0];
  return {
    status: doc?.indexing_status || "unknown",
    completed: doc?.indexing_status === "completed",
  };
}
