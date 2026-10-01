"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth/context";
import {
  MessageSquare,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function UserDashboardPage() {
  const { user } = useAuth();

  const recentConversations = [
    {
      id: "conv-1",
      title: "Rasio Kalsium & Fosfor untuk Mencegah Kerabang Retak",
      date: "Kemarin, 14:32",
      messagesCount: 6,
    },
    {
      id: "conv-2",
      title: "Protokol Fumigasi Sebelum Chick-In DOC Broiler",
      date: "28 Sep 2026",
      messagesCount: 4,
    },
    {
      id: "conv-3",
      title: "Standar Kecepatan Angin dan Suhu Kandang Closed House",
      date: "25 Sep 2026",
      messagesCount: 9,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* WELCOME BANNER */}
        <section className="bg-gradient-to-r from-[#4E2E1E] to-[#361D10] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold border border-white/20 text-[#FAF7F2]">
              <Sparkles className="w-3.5 h-3.5 text-[#DE992B]" />
              Portal Peternak Terverifikasi
            </div>

            <h1 className="text-3xl sm:text-4xl font-black">
              Halo, {user?.full_name || "Peternak Hebat"} 👋
            </h1>

            <p className="text-sm sm:text-base text-[#D8C7B8] leading-relaxed">
              Apa yang ingin Anda ketahui tentang peternakan ayam hari ini? Tanyakan segala hal mulai dari pakan hingga mitigasi mikroklimat kandang.
            </p>
          </div>
        </section>

        {/* PERCAKAPAN TERAKHIR SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#361D10]">
              Percakapan Terakhir
            </h2>
            <Link
              href="/chat"
              className="text-xs font-semibold text-[#DE992B] hover:text-[#C8851E] flex items-center gap-1"
            >
              <span>Buka Ruang Obrolan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentConversations.map((conv) => (
              <Link
                key={conv.id}
                href="/chat"
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCCF] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#4A2D1B] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#361D10] group-hover:text-[#DE992B] transition-colors">
                      {conv.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#8C7B71] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {conv.date}
                      </span>
                      <span>• {conv.messagesCount} pesan terkirim</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A2D1B] shrink-0">
                  <span className="hidden sm:inline">Lanjutkan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
