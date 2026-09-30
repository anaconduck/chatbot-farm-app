"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { MOCK_USERS, MockUserRecord } from "@/lib/mock-data";
import {
  Users,
  Search,
  Eye,
  CheckCircle,
  LogOut,
  Layers,
  FileText,
  Shield,
} from "lucide-react";

export default function AdminUsersPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<MockUserRecord[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === "Aktif" ? "Nonaktif" : "Aktif";
          setActionNotice(`Status pengguna ${u.name} diubah menjadi ${nextStatus}.`);
          setTimeout(() => setActionNotice(null), 3000);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />
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

      {/* Tabs */}
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
            className="px-4 py-2.5 border-b-2 border-[#4A2D1B] text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4 text-[#DE992B]" />
            Manajemen Pengguna ({users.length})
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {actionNotice && (
          <div className="bg-[#EAF5EA] border border-[#BDE3BF] text-[#2E7D32] px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-[#361D10]">
            Daftar & Manajemen Pengguna
          </h1>
          <p className="text-xs text-[#7A6A60]">
            Pantau akun terdaftar, status aktivasi peternak, dan hak akses peran sistem.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DCCF]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7B71] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama atau email pengguna..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
            />
          </div>

          <span className="text-xs text-[#7A6A60] font-medium">
            Total Pengguna: <strong>{filteredUsers.length}</strong>
          </span>
        </div>

        {/* Table per Section U */}
        <div className="bg-white rounded-3xl border border-[#E8DCCF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#7A6A60] font-bold uppercase tracking-wider border-b border-[#E8DCCF]">
                <tr>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-3">Email</th>
                  <th className="py-3.5 px-3">Role</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Joined At</th>
                  <th className="py-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E8DF]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAF7F2]/60">
                    <td className="py-4 px-4 font-bold text-[#361D10]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FAF4EB] border border-[#E0D4C5] text-[#4A2D1B] font-bold flex items-center justify-center shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div>{u.name}</div>
                          <div className="text-[10px] text-[#8C7B71] font-normal">{u.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-[#5A483E]">{u.email}</td>
                    <td className="py-4 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === "ADMIN"
                            ? "bg-[#4A2D1B] text-white"
                            : "bg-[#FFF5E5] text-[#8C5D19]"
                        }`}
                      >
                        {u.role === "ADMIN" && <Shield className="w-3 h-3 text-[#DE992B]" />}
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          u.status === "Aktif"
                            ? "bg-[#EAF5EA] text-[#2E7D32]"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        ● {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[#7A6A60]">{u.joinedAt}</td>
                    <td className="py-4 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-lg text-[#6C5D53] hover:text-[#4A2D1B] hover:bg-[#EADBCE]/50"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                            u.status === "Aktif"
                              ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                              : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          }`}
                        >
                          {u.status === "Aktif" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
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
