import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function getAccessTokenFromCookie(req: Request) {
  // In Edge runtime we can't access cookies directly from Request.headers in same way as NextRequest,
  // but this handler will run in Node. Parse cookie header.
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb:token=([^;]+)/);
  if (!match) return null;
  try {
    const decoded = decodeURIComponent(match[1]);
    const session = JSON.parse(decoded);
    return session?.access_token ?? null;
  } catch (e) {
    return null;
  }
}

export async function GET(request: Request) {
  const accessToken = await getAccessTokenFromCookie(request);
  if (!accessToken) return NextResponse.json({ error: "No session" }, { status: 401 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceRole);

  try {
    const { data } = await admin.auth.getUser(accessToken);
    const user = data?.user;
    if (!user) return NextResponse.json({ verified: false });

    const verified = !!user.email_confirmed_at;
    return NextResponse.json({ verified });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Mirror GET for convenience
  return GET(request);
}
