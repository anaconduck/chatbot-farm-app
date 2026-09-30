import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UserRole } from "@/types";

export interface ServerUserContext {
  userId: string;
  email: string;
  role: UserRole;
  isDemo: boolean;
}

export async function getCurrentServerUser(): Promise<ServerUserContext | null> {
  // Check Supabase session first
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      // Query profile role from PostgreSQL using service admin client
      const adminClient = createAdminClient();
      const { data: profile } = await adminClient
        .from("profiles")
        .select("role, is_active")
        .eq("id", session.user.id)
        .single();

      if (profile && profile.is_active) {
        return {
          userId: session.user.id,
          email: session.user.email || "",
          role: profile.role as UserRole,
          isDemo: false,
        };
      }
    }
  } catch {
    // Supabase might not be initialized yet in local dev
  }

  return null;
}

export async function requireAdminRole(): Promise<ServerUserContext> {
  const user = await getCurrentServerUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED: Akun ini tidak memiliki akses administrator.");
  }

  return user;
}
