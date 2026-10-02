"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Alihkan ke portal login tunggal TanyaTernak
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#DE992B]" />
        <p className="text-xs font-semibold text-[#6C5D53]">
          Mengalihkan ke halaman masuk...
        </p>
      </div>
    </div>
  );
}
