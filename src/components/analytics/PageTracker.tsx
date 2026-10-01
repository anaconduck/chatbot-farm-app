"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public/user facing paths, ignore /api and assets
    if (!pathname || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
      return;
    }

    try {
      fetch("/api/track-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
      }).catch(() => {
        // Silently catch tracking errors
      });
    } catch {
      // Ignore
    }
  }, [pathname]);

  return null;
}
