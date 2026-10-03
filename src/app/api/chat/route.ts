import { NextRequest, NextResponse } from "next/server";
import { sendChatMessage } from "@/lib/dify/chat";
import { checkRateLimit } from "@/lib/security/rateLimiter";

export const MAX_QUERY_LENGTH = 1000;
export const MAX_REQUESTS_PER_MINUTE = 15;

export async function POST(req: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 2. Rate limit check to prevent Dify quota drain
    const rateCheck = checkRateLimit(clientIp, MAX_REQUESTS_PER_MINUTE, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak permintaan. Silakan tunggu ${rateCheck.resetInSeconds} detik sebelum bertanya kembali.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateCheck.resetInSeconds.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const { query, conversation_id, user } = body;

    // 3. Query presence check
    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Query pertanyaan wajib diisi." },
        { status: 400 }
      );
    }

    const trimmedQuery = query.trim();

    // 4. Maximum query length check (protects against token / quota overflow)
    if (trimmedQuery.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        {
          error: `Pertanyaan terlalu panjang (maksimal ${MAX_QUERY_LENGTH} karakter). Anda memasukkan ${trimmedQuery.length} karakter.`,
        },
        { status: 400 }
      );
    }

    const response = await sendChatMessage({
      query: trimmedQuery,
      conversation_id,
      user: user || "anonymous_poultry_farmer",
    });

    return NextResponse.json(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Terjadi kendala pada layanan AI.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
