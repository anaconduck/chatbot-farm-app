import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const adminClient = createAdminClient();

    const [viewsRes, profilesRes, docsRes] = await Promise.all([
      adminClient.from("page_views").select("*", { count: "exact", head: true }),
      adminClient.from("profiles").select("*", { count: "exact", head: true }),
      adminClient.from("documents").select("*", { count: "exact", head: true }),
    ]);

    const totalVisits = viewsRes.count || 0;
    const totalUsers = profilesRes.count || 0;
    const totalDocuments = docsRes.count || 0;

    return NextResponse.json({
      totalVisits,
      totalUsers,
      totalDocuments,
    });
  } catch (err: any) {
    console.error("Error fetching admin stats from Supabase:", err);
    return NextResponse.json({
      totalVisits: 0,
      totalUsers: 0,
      totalDocuments: 0,
    });
  }
}
