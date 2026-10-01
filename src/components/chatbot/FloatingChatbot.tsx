"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, X, Maximize2, Loader2, BookOpen } from "lucide-react";
import type { ChatMessage } from "@/types";

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      conversation_id: "quick-chat",
      role: "assistant",
      content:
        "Hai 👋 Selamat datang di AgroLivestock AI!\n\nSaya siap membantu menjawab pertanyaan mengenai riset dan agribisnis peternakan unggas berdasarkan literatur ilmiah terverifikasi.\n\nSilakan tanyakan apa saja yang ingin Anda ketahui.",
      created_at: new Date().toISOString(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      conversation_id: "quick-chat",
      role: "user",
      content: userText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userText,
          conversation_id: "quick-chat",
        }),
      });

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        conversation_id: "quick-chat",
        role: "assistant",
        content: data.answer || "Maaf, terjadi kendala saat memproses jawaban.",
        sources: data.sources || [],
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          conversation_id: "quick-chat",
          role: "assistant",
          content:
            "Mode offline / simulasi: Pastikan sistem terhubung ke backend untuk menerima jawaban terkini.",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#E8DCCF] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-[#4E2E1E] text-white p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-[#FAF7F2] p-0.5 border border-[#DE992B]/50 flex items-center justify-center">
                <Image
                  src="/images/chatbot/cowboy-robot.png"
                  alt="ChickyAI"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#4E2E1E]" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-[#FAF7F2]">
                  AgroLivestock AI Assistant
                </h4>
                <p className="text-[11px] text-[#D8C7B8] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Asisten Riset & Agribisnis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/chat"
                className="p-1.5 rounded-lg text-[#D8C7B8] hover:text-white hover:bg-white/10 transition-colors"
                title="Buka Layar Penuh"
                onClick={() => setIsOpen(false)}
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#D8C7B8] hover:text-white hover:bg-white/10 transition-colors"
                title="Tutup Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[#FAF7F2]/60 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-[#DE992B]/20 flex items-center justify-center shrink-0 border border-[#DE992B]/30 p-0.5">
                    <Image
                      src="/images/chatbot/cowboy-robot.png"
                      alt="Chicky"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.role === "user"
                      ? "bg-[#4E2E1E] text-white rounded-br-none shadow-sm"
                      : "bg-white text-[#2C1D13] border border-[#EADBCE] rounded-bl-none shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>

                  {/* Sources Preview */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#E8DCCF] text-[11px] text-[#7C6A5D]">
                      <p className="font-semibold flex items-center gap-1 text-[#4E2E1E] mb-1">
                        <BookOpen className="w-3 h-3 text-[#DE992B]" />
                        Referensi Terkait:
                      </p>
                      <ul className="space-y-1">
                        {msg.sources.map((s, idx) => (
                          <li key={idx} className="truncate">
                            • {s.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#7C6A5D]">
                <div className="w-7 h-7 rounded-lg bg-[#DE992B]/20 flex items-center justify-center shrink-0 p-0.5">
                  <Image
                    src="/images/chatbot/cowboy-robot.png"
                    alt="Chicky"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white border border-[#EADBCE] rounded-2xl px-3 py-2 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DE992B]" />
                  <span>Chicky sedang mencari literatur...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-[#FAF7F2] border-t border-[#EADBCE] flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            <button
              onClick={() => setInput("Berapa kebutuhan kalsium ayam layer puncak?")}
              className="px-2 py-0.5 rounded-full bg-white border border-[#E0D4C5] text-[#54321D] whitespace-nowrap hover:border-[#DE992B] transition-colors"
            >
              Kalsium Layer
            </button>
            <button
              onClick={() => setInput("Bagaimana mitigasi penyakit ND dan AI?")}
              className="px-2 py-0.5 rounded-full bg-white border border-[#E0D4C5] text-[#54321D] whitespace-nowrap hover:border-[#DE992B] transition-colors"
            >
              Biosekuriti ND/AI
            </button>
            <button
              onClick={() => setInput("Suhu optimal kandang closed-house?")}
              className="px-2 py-0.5 rounded-full bg-white border border-[#E0D4C5] text-[#54321D] whitespace-nowrap hover:border-[#DE992B] transition-colors"
            >
              Suhu Closed House
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 bg-white border-t border-[#EADBCE] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan seputar ayam & pakan..."
              className="flex-1 bg-[#FAF7F2] border border-[#E5DACD] focus:border-[#DE992B] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#2C1D13] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-[#4E2E1E] hover:bg-[#3D2113] disabled:opacity-50 text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
              aria-label="Kirim Pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Collapsed Button: Square/Rounded button in the corner matching user instruction */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br from-[#965A2E] to-[#54321D] p-1.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#FAF7F2]"
        aria-label="Buka Chatbot AgroLivestock AI"
      >
        <div className="w-full h-full rounded-xl bg-[#613619] flex items-center justify-center relative overflow-hidden">
          <Image
            src="/images/chatbot/cowboy-robot.png"
            alt="AgroLivestock AI Mascot"
            width={52}
            height={52}
            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
          {/* Notification status dot */}
          <span className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#54321D]" />
        </div>
      </button>
    </div>
  );
};
