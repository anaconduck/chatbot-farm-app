import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path || "/";
    const visitorId = body?.visitorId || null;
    const userAgent = req.headers.get("user-agent") || "";

    // Ignore any admin paths
    if (path.startsWith("/admin")) {
      return NextResponse.json({ success: true, note: "Admin path ignored" });
    }

    const adminClient = createAdminClient();

    // Insert record
    const insertData: Record<string, any> = {
      page_path: path,
      user_agent: userAgent.slice(0, 255),
    };

    if (visitorId) {
      insertData.visitor_id = visitorId;
    }

    await adminClient.from("page_views").insert([insertData]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, note: "Tracking skipped" });
  }
}
