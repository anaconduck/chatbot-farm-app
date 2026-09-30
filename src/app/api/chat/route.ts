import { NextRequest, NextResponse } from "next/server";
import { sendChatMessage } from "@/lib/dify/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, conversation_id, user } = body;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Query pertanyaan wajib diisi." },
        { status: 400 }
      );
    }

    const response = await sendChatMessage({
      query: query.trim(),
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
