import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MOCK_ADMIN_STATS } from "@/lib/mock-data";

export async function GET() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

  if (isDemo) {
    return NextResponse.json({
      activeVisitors: MOCK_ADMIN_STATS.activeVisitors,
      activeVisitorsMoM: MOCK_ADMIN_STATS.activeVisitorsMoM,
      pdfDownloads: MOCK_ADMIN_STATS.pdfDownloads,
      pdfDownloadsLabel: MOCK_ADMIN_STATS.pdfDownloadsLabel,
      totalDocuments: 4,
      monthlyTrends: MOCK_ADMIN_STATS.monthlyTrends,
    });
  }

  try {
    const adminClient = createAdminClient();

    const [profilesRes, docsRes] = await Promise.all([
      adminClient.from("profiles").select("*", { count: "exact", head: true }),
      adminClient.from("documents").select("download_count", { count: "exact" }),
    ]);

    const userCount = profilesRes.count || 0;
    const docCount = docsRes.count || 0;
    const totalDownloads = (docsRes.data || []).reduce(
      (sum, d) => sum + (d.download_count || 0),
      0
    );

    return NextResponse.json({
      activeVisitors: 0,
      activeVisitorsMoM: "0%",
      pdfDownloads: totalDownloads,
      pdfDownloadsLabel: "Total unduhan",
      totalDocuments: docCount,
      totalUsers: userCount,
      monthlyTrends: [],
    });
  } catch (err: any) {
    console.error("Error fetching admin stats:", err);
    return NextResponse.json({
      activeVisitors: 0,
      activeVisitorsMoM: "0%",
      pdfDownloads: 0,
      pdfDownloadsLabel: "Total unduhan",
      totalDocuments: 0,
      totalUsers: 0,
      monthlyTrends: [],
    });
  }
}
