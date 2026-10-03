import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminRole } from "@/server/authorization";
import { MOCK_USERS } from "@/lib/mock-data";

export async function GET() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

  try {
    await requireAdminRole();
  } catch {
    return NextResponse.json(
      { error: "Akses ditolak: Diperlukan hak akses administrator." },
      { status: 403 }
    );
  }

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Map to UI friendly shape if needed
      const mapped = data.map((p) => ({
        id: p.id,
        name: p.full_name || "Tanpa Nama",
        email: p.email,
        role: p.role === "ADMIN" ? "Admin" : "Peternak",
        status: p.is_active ? "Aktif" : "Nonaktif",
        joinDate: new Date(p.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));
      return NextResponse.json({ users: mapped });
    }
  } catch (err: any) {
    console.error("Error fetching users:", err);
  }

  return NextResponse.json({ users: isDemo ? MOCK_USERS : [] });
}

export async function PATCH(req: Request) {
  try {
    await requireAdminRole();
  } catch {
    return NextResponse.json(
      { error: "Akses ditolak: Diperlukan hak akses administrator." },
      { status: 403 }
    );
  }

  try {
    const { id, is_active } = await req.json();
    if (!id) return NextResponse.json({ error: "ID pengguna diperlukan." }, { status: 400 });

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("profiles")
      .update({ is_active, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ user: data, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Gagal memperbarui status pengguna." }, { status: 500 });
  }
}
