"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getSupabaseClient from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message || "Sign in failed");
        setLoading(false);
        return;
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-6 bg-[var(--bg-2)] rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-[var(--text-1)]">Sign in</h1>

        <form onSubmit={onSubmit}>
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <label className="block mb-2 text-sm text-[var(--text-2)]">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="you@example.com"
          />

          <label className="block mb-2 text-sm text-[var(--text-2)]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="••••••••"
          />

          <button disabled={loading} className="w-full p-2 bg-[var(--green)] rounded" style={{ color: "#fff" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--text-3)]">
          No account? <Link href="/auth/signup" className="text-[var(--green)]">Create one</Link>
        </p>
      </div>
    </div>
  );
}
