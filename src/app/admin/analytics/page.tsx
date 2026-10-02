"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { LogOut } from "lucide-react";

export default function AdminAnalyticsPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo href="/admin" />
          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A2D1B] text-white text-xs font-semibold"
          >
            <span>Logout</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#361D10]">Analitik & Metrik Performa</h1>
          <p className="text-xs text-[#7A6A60]">
            Statistik keterlibatan pengguna dan utilisasi dokumen ilmiah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF]">
            <span className="text-xs text-[#7A6A60]">Tingkat Akurasi Rujukan RAG</span>
            <div className="text-3xl font-black text-[#2E7D32] mt-1">98.4%</div>
            <p className="text-[11px] text-[#8C7B71] mt-1">Evaluasi sumber bab terverifikasi</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF]">
            <span className="text-xs text-[#7A6A60]">Waktu Respons Rata-rata</span>
            <div className="text-3xl font-black text-[#DE992B] mt-1">1.2 detik</div>
            <p className="text-[11px] text-[#8C7B71] mt-1">Latensi inferensi Dify Cloud</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF]">
            <span className="text-xs text-[#7A6A60]">Topik Terbanyak Ditanyakan</span>
            <div className="text-xl font-black text-[#4A2D1B] mt-1">Formulasi Pakan Layer</div>
            <p className="text-[11px] text-[#8C7B71] mt-1">42% total pertanyaan bulan ini</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF]">
          <Link href="/admin" className="text-xs font-bold text-[#4A2D1B] hover:underline">
            ← Kembali ke Panel Pengelola Utama
          </Link>
        </div>
      </main>
    </div>
  );
}
