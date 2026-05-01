"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import { DocumentRequirement } from "@/lib/types/document";
import { schengenDocumentRequirements } from "@/lib/document-requirements";
import { DocumentChecklist } from "@/components/modules/document-checklist";
import { DocumentUpload } from "@/components/modules/document-upload";

function PrepareContent() {
  const searchParams = useSearchParams();
  const [selectedRequirement, setSelectedRequirement] =
    useState<DocumentRequirement | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Map<string, any>>(
    new Map()
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Load from localStorage
    const saved = localStorage.getItem("uploadedDocs");
    if (saved) {
      try {
        const docs = new Map<string, any>(JSON.parse(saved));
        setUploadedDocs(docs);
      } catch (e) {
        console.error("Failed to load saved docs", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(
      "uploadedDocs",
      JSON.stringify(Array.from(uploadedDocs.entries()))
    );
  }, [uploadedDocs]);

  const handleUploadSuccess = (docId: string) => {
    if (selectedRequirement) {
      const newDocs = new Map(uploadedDocs);
      newDocs.set(selectedRequirement.id, { id: docId, timestamp: new Date() });
      setUploadedDocs(newDocs);
      setSelectedRequirement(null);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-stone-950 to-stone-900">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-white/5 bg-stone-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 py-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/70 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to application
            </Link>
            <h1 className="text-3xl font-black text-white">
              Prepare Your Documents
            </h1>
            <p className="mt-2 text-sm text-white/40">
              Upload and organize all required documents for your Schengen visa
              application
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 space-y-4"
            >
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: "Complete Checklist",
                    desc: "Know exactly what you need to upload",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Quality Review",
                    desc: "Our team checks everything before submission",
                  },
                  {
                    icon: "🚀",
                    title: "Fast Approval",
                    desc: "Reduce rejection risk significantly",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg bg-white/5 border border-white/10 p-4"
                  >
                    <div className="flex items-start gap-3">
                      {typeof item.icon === "string" ? (
                        <span className="text-xl">{item.icon}</span>
                      ) : (
                        <item.icon className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4 text-center"
              >
                <p className="text-2xl font-black text-emerald-400">98%</p>
                <p className="text-xs text-white/60 mt-1">Approval rate</p>
                <p className="text-[10px] text-white/40 mt-2">
                  When docs are complete
                </p>
              </motion.div>
            </motion.div>

            {/* Main Content - Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8"
            >
              <DocumentChecklist
                requirements={schengenDocumentRequirements}
                uploadedDocs={uploadedDocs}
                onSelectDocument={setSelectedRequirement}
              />
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-8 text-center"
          >
            <h3 className="text-lg font-semibold text-white">Ready to submit?</h3>
            <p className="mt-2 text-sm text-white/60">
              When all required documents are uploaded, our team will review
              everything and provide feedback within 24 hours.
            </p>
            <Link href="/apply" className="mt-6 inline-block">
              <button className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-400 transition-colors">
                Continue with Application
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Document Upload Modal */}
      <DocumentUpload
        requirement={selectedRequirement}
        onClose={() => setSelectedRequirement(null)}
        onUploadSuccess={handleUploadSuccess}
      />
    </main>
  );
}

export default function PreparePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrepareContent />
    </Suspense>
  );
}
