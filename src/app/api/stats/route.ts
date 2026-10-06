import { NextResponse } from "next/server";
import { getStats, deleteAllEvents } from "@/lib/event-store";

/**
 * GET /api/stats?token=<ADMIN_TOKEN>&from=YYYY-MM-DD&to=YYYY-MM-DD
 *
 * Returns aggregated conversion stats for the /admin dashboard.
 * Protected by ADMIN_TOKEN env var (set in Vercel).
 *
 * Date range (optional):
 *   - from: inclusive start date (YYYY-MM-DD)
 *   - to:   inclusive end date (YYYY-MM-DD)
 *   - If both omitted: returns all-time stats.
 */
export async function GET(req: Request) {
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

  const url = new URL(req.url);
  const from = url.searchParams.get("from") ?? undefined;
  const to = url.searchParams.get("to") ?? undefined;

  const stats = await getStats({ from, to });
  return NextResponse.json({ ok: true, ...stats });
}

/**
 * DELETE /api/stats?token=<ADMIN_TOKEN>
 *
 * Clears all conversion events from the database.
 * Used by the admin dashboard "Reset stats" button.
 */
export async function DELETE(req: Request) {
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

  const result = await deleteAllEvents();
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}
