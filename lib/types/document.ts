/**
 * Document Management Types
 * Defines structure for visa document tracking and validation
 */

export type DocumentCategory = 
  | "passport"
  | "financial"
  | "accommodation"
  | "travel"
  | "employment"
  | "insurance"
  | "personal";

export interface DocumentRequirement {
  id: string;
  category: DocumentCategory;
  name: string;
  description: string;
  required: boolean;
  examples: string[];
  acceptedFormats: string[];
  notes?: string;
}

export interface UploadedDocument {
  id: string;
  requirementId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: Date;
  status: "pending" | "approved" | "needs_revision";
  feedback?: string;
}

export interface DocumentChecklistItem {
  requirement: DocumentRequirement;
  uploaded?: UploadedDocument;
  isComplete: boolean;
}

export interface DocumentProgress {
  visaType: string;
  fromCountry: string;
  toCountry: string;
  categories: {
    [key in DocumentCategory]: {
      total: number;
      completed: number;
      percentage: number;
    };
  };
  overallProgress: number;
  lastUpdated: Date;
}

export interface DocumentUploadResponse {
  success: boolean;
  documentId?: string;
  error?: string;
  message: string;
}
