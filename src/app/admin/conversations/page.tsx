"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import {
  MessageSquare,
  Eye,
  LogOut,
  Layers,
  FileText,
  Users,
  Bot,
} from "lucide-react";

export default function AdminConversationsPage() {
  const { user, logout } = useAuth();

  const mockConversations = [
    {
      id: "conv-1",
      user: "Budi Santoso",
      email: "user@demo.local",
      topic: "Keseimbangan Asam Amino Pakan Layer",
      messagesCount: 6,
      date: "Hari ini, 14:20",
      status: "Selesai",
    },
    {
      id: "conv-2",
      user: "drh. Siti Rahmawati",
      email: "siti.rahmawati@poultryvet.id",
      topic: "Zonasi Biosekuriti Avian Influenza",
      messagesCount: 12,
      date: "Kemarin, 09:15",
      status: "Selesai",
    },
    {
      id: "conv-3",
      user: "Ahmad Zulkarnain",
      email: "ahmad.farm@blitar-layer.com",
      topic: "Kontrol Ventilasi Exhaust Amonia Closed-House",
      messagesCount: 4,
      date: "28 Sep 2026",
      status: "Selesai",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo href="/admin" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#361D10]">{user?.full_name}</span>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A2D1B] text-white text-xs font-semibold"
            >
              <span>Logout</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-[#FAF7F2] border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto text-xs font-semibold pt-2">
          <Link
            href="/admin"
            className="px-4 py-2.5 text-[#6E5D52] hover:text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <Layers className="w-4 h-4" />
            Ringkasan & Upload Riset
          </Link>
          <Link
            href="/admin/documents"
            className="px-4 py-2.5 text-[#6E5D52] hover:text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            Repositori Dokumen
          </Link>
          <Link
            href="/admin/users"
            className="px-4 py-2.5 text-[#6E5D52] hover:text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            Manajemen Pengguna
          </Link>
          <Link
            href="/admin/conversations"
            className="px-4 py-2.5 border-b-2 border-[#4A2D1B] text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#DE992B]" />
            Percakapan Pengguna
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#361D10]">
            Log Percakapan Asisten AI TanyaTernak
          </h1>
          <p className="text-xs text-[#7A6A60]">
            Analisis riwayat interaksi peternak dengan model RAG untuk perbaikan kualitas dokumen.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8DCCF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#7A6A60] font-bold uppercase tracking-wider border-b border-[#E8DCCF]">
                <tr>
                  <th className="py-3.5 px-4">Pengguna</th>
                  <th className="py-3.5 px-3">Topik Pembahasan</th>
                  <th className="py-3.5 px-3">Volume Pesan</th>
                  <th className="py-3.5 px-3">Waktu</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E8DF]">
                {mockConversations.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF7F2]/60">
                    <td className="py-4 px-4 font-bold text-[#361D10]">
                      <div>{c.user}</div>
                      <div className="text-[10px] text-[#8C7B71] font-normal">{c.email}</div>
                    </td>
                    <td className="py-4 px-3 font-medium text-[#361D10]">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#DE992B]" />
                        <span>{c.topic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-[#6A5A50]">{c.messagesCount} pesan</td>
                    <td className="py-4 px-3 text-[#7A6A60]">{c.date}</td>
                    <td className="py-4 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] text-[10px] font-bold">
                        ● {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button className="p-1.5 rounded-lg text-[#6C5D53] hover:text-[#4A2D1B] hover:bg-[#EADBCE]/50">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
