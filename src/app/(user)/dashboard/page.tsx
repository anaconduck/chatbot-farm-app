"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth/context";
import {
  Bot,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Layers,
  Thermometer,
  ShieldCheck,
  Egg,
  HeartPulse,
  Calendar,
} from "lucide-react";

export default function UserDashboardPage() {
  const { user } = useAuth();

  const topics = [
    { name: "Nutrisi", icon: Layers, query: "Formulasi nutrisi dan rasio protein ayam layer" },
    { name: "Penyakit", icon: HeartPulse, query: "Pencegahan dan pengobatan penyakit Coryza dan ND" },
    { name: "Biosecurity", icon: ShieldCheck, query: "Penerapan standar biosekuriti 3 zona kandang" },
    { name: "Broiler", icon: Bot, query: "Panduan manajemen pemeliharaan ayam pedaging broiler" },
    { name: "Layer", icon: Egg, query: "Siklus puncak produksi telur ayam ras petelur layer" },
    { name: "Produksi Telur", icon: Sparkles, query: "Faktor penyebab penurunan produksi telur harian" },
    { name: "Manajemen Kandang", icon: Thermometer, query: "Pengaturan kecepatan angin dan cooling pad kandang closed house" },
    { name: "Kesehatan Ayam", icon: HeartPulse, query: "Jadwal vaksinasi wajib unggas petelur komersial" },
  ];

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
          <div className="relative z-10 max-w-2xl space-y-4">
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

            <div className="pt-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#DE992B] hover:bg-[#C8851E] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Bot className="w-5 h-5" />
                <span>Tanya ChickAI</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Decorative Mascot in Corner */}
          <div className="hidden lg:block absolute right-8 bottom-0 w-52 h-52 pointer-events-none opacity-90">
            <Image
              src="/images/chatbot/cowboy-robot.png"
              alt="Mascot"
              width={200}
              height={200}
              className="object-contain drop-shadow-xl"
            />
          </div>
        </section>

        {/* TOPIK POPULER SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#361D10]">
              Topik Populer
            </h2>
            <span className="text-xs text-[#7A6A60]">
              Pilih topik untuk memulai pertanyaan cepat
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topics.map((t, idx) => {
              const Icon = t.icon;
              return (
                <Link
                  key={idx}
                  href={`/chat?prompt=${encodeURIComponent(t.query)}`}
                  className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs hover:shadow-md hover:border-[#DE992B] transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#DE992B] group-hover:bg-[#DE992B] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#361D10] group-hover:text-[#4A2D1B]">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-[#8C7B71] mt-0.5 line-clamp-1">
                      {t.query}
                    </p>
                  </div>
                </Link>
              );
            })}
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
