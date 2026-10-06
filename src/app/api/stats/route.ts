import { NextResponse } from "next/server";
import { getStats } from "@/lib/event-store";

/**
 * GET /api/stats?token=<ADMIN_TOKEN>
 *
 * Returns aggregated conversion stats for the /admin dashboard.
 * Protected by ADMIN_TOKEN env var (set in Vercel).
 */
export async function GET(req: Request) {
  // Optional password protection.
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (ADMIN_TOKEN) {
    const url = new URL(req.url);
    const provided = url.searchParams.get("token");
    if (provided !== ADMIN_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  const stats = await getStats();
  return NextResponse.json({ ok: true, ...stats });
}
