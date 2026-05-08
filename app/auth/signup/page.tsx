"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getSupabaseClient from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (signUpError) {
        setError(signUpError.message || "Signup failed");
        setLoading(false);
        return;
      }

      // After sign up, Supabase may require email confirmation.
      // Redirect user to dashboard if session exists, otherwise to a confirmation page.
      if (data?.user) {
        router.push("/dashboard");
      } else {
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-6 bg-[var(--bg-2)] rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-[var(--text-1)]">Create account</h1>

        <form onSubmit={onSubmit}>
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <label className="block mb-2 text-sm text-[var(--text-2)]">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Jane Doe"
          />

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
            placeholder="Create a password"
          />

          <button disabled={loading} className="w-full p-2 bg-[var(--green)] rounded" style={{ color: "#fff" }}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--text-3)]">
          Already have an account? <Link href="/auth/login" className="text-[var(--green)]">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
