"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import getSupabaseClient from "@/lib/supabase";

function VerifyEmailContent() {
  const search = useSearchParams();
  const email = search?.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const resendMagicLink = async () => {
    if (!email) {
      setMessage("Email not provided.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) {
        setMessage(error.message || "Failed to send link");
      } else {
        setMessage("Magic link sent to your email. Check your inbox.");
      }
    } catch (err: any) {
      setMessage(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-lg p-8 bg-[var(--bg-2)] rounded-2xl shadow-lg border border-[var(--border-2)]">
        <h1 className="text-2xl font-bold mb-3 text-[var(--text-1)]">
          Verify your email
        </h1>

        <p className="text-sm text-[var(--text-2)] mb-6 leading-6">
          We sent a verification link to{" "}
          <strong className="text-[var(--text-1)]">
            {email || "your email"}
          </strong>
          . Please click the link in your inbox to verify your address.
        </p>

        {message && (
          <div className="mb-4 rounded-lg bg-[var(--bg)] p-3 text-sm text-[var(--text-2)] border border-[var(--border-2)]">
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resendMagicLink}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[var(--green)] text-white font-medium transition-opacity disabled:opacity-60"
          >
            {loading ? "Sending..." : "Resend magic link"}
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="px-4 py-2 rounded-lg border border-[var(--border-2)] text-[var(--text-1)] hover:bg-[var(--bg)] transition"
          >
            I verified — go to login
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}