"use client";

import React, { Suspense } from "react";
import { ApplyForm } from "../../../apply/apply-form";

export default function NewApplicationPage() {
  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-stone-900">
          Start a new application
        </h1>

        <Suspense fallback={<div>Loading application form...</div>}>
          <ApplyForm />
        </Suspense>
      </div>
    </main>
  );
}