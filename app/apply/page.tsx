import { Suspense } from "react";

import { ApplyForm } from "./apply-form";

export default function ApplyPage() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-[#0B1324] px-4 py-14 text-white sm:px-6 lg:px-8" />}
    >
      <ApplyForm />
    </Suspense>
  );
}