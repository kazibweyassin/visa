"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, ChevronDown } from "lucide-react";
import {
  DocumentRequirement,
  DocumentChecklistItem,
  DocumentCategory,
} from "@/lib/types/document";
import { categoryLabels } from "@/lib/document-requirements";

interface DocumentChecklistProps {
  requirements: DocumentRequirement[];
  uploadedDocs: Map<string, any>;
  onSelectDocument: (requirement: DocumentRequirement) => void;
}

export function DocumentChecklist({
  requirements,
  uploadedDocs,
  onSelectDocument,
}: DocumentChecklistProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Set<DocumentCategory>
  >(new Set(["passport", "financial"]));

  // Group requirements by category
  const groupedByCategory = requirements.reduce(
    (acc, req) => {
      if (!acc[req.category]) acc[req.category] = [];
      acc[req.category].push(req);
      return acc;
    },
    {} as Record<DocumentCategory, DocumentRequirement[]>
  );

  // Calculate progress
  const totalRequired = requirements.filter((r) => r.required).length;
  const completed = requirements.filter(
    (r) => r.required && uploadedDocs.has(r.id)
  ).length;
  const progressPercent = Math.round((completed / totalRequired) * 100);

  const toggleCategory = (category: DocumentCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/90">
            Document Progress
          </h3>
          <span className="text-xs font-bold text-emerald-400">
            {completed}/{totalRequired}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
          />
        </div>
        <p className="text-xs text-white/40">{progressPercent}% complete</p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-3">
        {Object.entries(groupedByCategory).map(([category, docs], idx) => {
          const cat = category as DocumentCategory;
          const isExpanded = expandedCategories.has(cat);
          const categoryCompleted = docs.filter(
            (d) => !d.required || uploadedDocs.has(d.id)
          ).length;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-4 py-3 transition-colors hover:bg-white/8"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white/80">
                    {categoryLabels[cat]}
                  </span>
                  <span className="text-xs text-white/40">
                    {categoryCompleted}/{docs.length}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-white/40" />
                </motion.div>
              </button>

              {/* Category Documents */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 rounded-lg bg-white/3 border border-white/8 border-t-0 px-4 py-3">
                      {docs.map((req) => {
                        const isUploaded = uploadedDocs.has(req.id);

                        return (
                          <motion.button
                            key={req.id}
                            onClick={() => onSelectDocument(req)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="group w-full flex items-start gap-3 rounded-lg bg-white/3 px-3 py-2.5 transition-colors hover:bg-white/5 text-left"
                          >
                            <div className="mt-0.5 shrink-0">
                              {isUploaded ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <Circle
                                  className={`h-5 w-5 ${
                                    req.required
                                      ? "text-amber-400/50"
                                      : "text-white/20"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start gap-2">
                                <p
                                  className={`text-sm font-medium ${
                                    isUploaded
                                      ? "text-emerald-300"
                                      : "text-white/80"
                                  }`}
                                >
                                  {req.name}
                                </p>
                                {req.required && !isUploaded && (
                                  <span className="shrink-0 rounded px-2 py-0.5 bg-amber-500/20 text-[10px] font-semibold text-amber-300">
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-white/40 line-clamp-1">
                                {req.description}
                              </p>
                            </div>
                            <div className="shrink-0 text-xs text-white/40">
                              {isUploaded ? "✓" : "↗"}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 flex gap-3"
      >
        <AlertCircle className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
        <p className="text-xs text-emerald-300/80 leading-relaxed">
          Upload all required documents for the fastest approval. Our team will
          review and provide feedback within 24 hours.
        </p>
      </motion.div>
    </div>
  );
}
