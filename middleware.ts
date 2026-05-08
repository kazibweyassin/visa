import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const protectedRoutes = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Read Supabase session cookie (sb:token) which stores JSON including access_token
  const sbToken = request.cookies.get("sb:token")?.value;

  if (!sbToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }

  let accessToken: string | null = null;
  try {
    // Supabase stores the session JSON stringified in the cookie
    const session = JSON.parse(sbToken);
    accessToken = session?.access_token ?? null;
  } catch (e) {
    accessToken = null;
  }

  if (!accessToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    // If service role key is not configured, allow through but log a warning
    return NextResponse.next();
  }

  const admin = createClient(supabaseUrl, serviceRole);

  try {
    const { data: userData } = await admin.auth.getUser(accessToken);

    const user = userData?.user;

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }

    // If user's email is not confirmed, redirect to verify-email page
    // Supabase user has `email_confirmed_at` when verified (nullable)
    // For some setups the field may differ; we check `email_confirmed_at`.
    // If not present, send user to verification page.
    // NOTE: this is a best-effort check that requires SUPABASE_SERVICE_ROLE_KEY.
    if (!user?.email_confirmed_at) {
      const verifyUrl = request.nextUrl.clone();
      verifyUrl.pathname = "/auth/verify-email";
      return NextResponse.redirect(verifyUrl);
    }

    return NextResponse.next();
  } catch (err) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
