"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileCheck, AlertCircle, Loader2 } from "lucide-react";
import { DocumentRequirement } from "@/lib/types/document";

interface DocumentUploadProps {
  requirement: DocumentRequirement | null;
  onClose: () => void;
  onUploadSuccess: (docId: string) => void;
}

export function DocumentUpload({
  requirement,
  onClose,
  onUploadSuccess,
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!requirement) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return "File size exceeds 10MB limit";
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const validExts = requirement.acceptedFormats.map((f) => f.toLowerCase());
    if (!validExts.includes(fileExt || "")) {
      return `File type not accepted. Allowed: ${requirement.acceptedFormats.join(", ")}`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    setError("");
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("requirementId", requirement.id);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onUploadSuccess(data.documentId);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-stone-950 border border-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Upload {requirement.name}
              </h2>
              <p className="mt-1 text-sm text-white/40">
                {requirement.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5 text-white/50" />
            </button>
          </div>

          {!selectedFile ? (
            <div className="space-y-4 mb-6">
              {/* Drop Zone */}
              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                  borderColor: isDragging
                    ? "rgb(16 185 129 / 0.5)"
                    : "rgb(255 255 255 / 0.1)",
                  backgroundColor: isDragging
                    ? "rgb(16 185 129 / 0.05)"
                    : "rgb(255 255 255 / 0.02)",
                }}
                className="rounded-xl border-2 border-dashed border-white/10 p-8 text-center cursor-pointer transition-colors"
              >
                <Upload className="mx-auto h-10 w-10 text-emerald-500/50 mb-3" />
                <p className="text-sm font-semibold text-white/80">
                  Drag and drop your file
                </p>
                <p className="mt-1 text-xs text-white/40">
                  or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={requirement.acceptedFormats
                    .map((f) => `.${f.toLowerCase()}`)
                    .join(",")}
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 inline-block rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  Choose File
                </button>
              </motion.div>

              {/* File Info */}
              <div className="rounded-lg bg-white/3 border border-white/8 px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    Max size: 10MB | Formats:{" "}
                    {requirement.acceptedFormats.join(", ")}
                  </span>
                </div>
                {requirement.notes && (
                  <p className="text-xs text-white/40">{requirement.notes}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {/* Selected File Preview */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-center gap-3"
              >
                <FileCheck className="h-8 w-8 text-emerald-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-emerald-300 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-emerald-300/60">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1.5 hover:bg-emerald-500/20 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-emerald-400" />
                </button>
              </motion.div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 px-4 py-3 text-xs text-rose-300/80"
            >
              {error}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex-1 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
