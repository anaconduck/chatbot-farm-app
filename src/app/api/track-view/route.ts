import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path || "/";
    const userAgent = req.headers.get("user-agent") || "";

    const adminClient = createAdminClient();
    await adminClient.from("page_views").insert([
      {
        page_path: path,
        user_agent: userAgent.slice(0, 255),
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Graceful handling if page_views table has not been created yet in Supabase
    return NextResponse.json({ success: false, note: "Tracking skipped" });
  }
}
