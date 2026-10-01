"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { MOCK_DOCUMENTS, MOCK_ADMIN_STATS } from "@/lib/mock-data";
import {
  ShieldCheck,
  Calendar,
  Download,
  Users,
  FileDown,
  UploadCloud,
  FileText,
  Search,
  SlidersHorizontal,
  Eye,
  Edit2,
  Trash2,
  LogOut,
  CheckCircle,
  Database,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Nutrisi Pakan");
  const [accessStatus, setAccessStatus] = useState("Publik (Terbuka untuk Semua Peternak)");
  const [abstractText, setAbstractText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: title.endsWith(".pdf") ? title : `${title.replace(/\s+/g, "_")}.pdf`,
      author: user?.full_name || "Admin AgroLivestock AI",
      publication_year: new Date().getFullYear(),
      category: category,
      description: abstractText || "Dokumen teknis terverifikasi untuk peternakan unggas.",
      original_filename: selectedFileName || `${title.replace(/\s+/g, "_")}.pdf`,
      status: "READY" as const,
      file_size_bytes: 3.5 * 1024 * 1024,
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setDocuments([newDoc, ...documents]);
    setUploadSuccess(`[Development Placeholder] Dokumen "${title}" berhasil disiapkan ke antrean basis pengetahuan.`);

    // Reset
    setTitle("");
    setAbstractText("");
    setSelectedFileName(null);

    setTimeout(() => setUploadSuccess(null), 5000);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Top Bar matching Admin.png */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-[#361D10]">{user?.full_name || "Admin"}</span>
              <span className="text-[10px] text-[#2E7D32] font-semibold">Verified Administrator</span>
            </div>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A2D1B] hover:bg-[#382112] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Logout</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Sub-Navbar / Navigation Tabs */}
      <div className="bg-[#FAF7F2] border-b border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Header Title with Badge matching Admin.png */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4A2D1B] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#DE992B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#361D10]">
                  Panel Pengelola AgroLivestock AI
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] border border-[#C6E6C7] text-[10px] font-bold">
                  ● ADMIN TERVERIFIKASI
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions matching Admin.png */}
          <div className="flex items-center gap-2 text-xs">
            <button className="px-3 py-2 rounded-xl bg-white border border-[#E2D5C7] text-[#5A483E] hover:border-[#4A2D1B] flex items-center gap-1.5 font-medium transition-colors">
              <Calendar className="w-3.5 h-3.5 text-[#DE992B]" />
              <span>1 Jan - 31 Des 2025</span>
            </button>
            <button className="px-3 py-2 rounded-xl bg-white border border-[#E2D5C7] text-[#5A483E] hover:border-[#4A2D1B] flex items-center gap-1.5 font-medium transition-colors">
              <Download className="w-3.5 h-3.5 text-[#4A2D1B]" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Tab links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto text-xs font-semibold pt-1">
          <Link
            href="/admin"
            className="px-4 py-2.5 border-b-2 border-[#4A2D1B] text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <Layers className="w-4 h-4 text-[#DE992B]" />
            Ringkasan & Upload Riset
          </Link>
          <Link
            href="/admin/documents"
            className="px-4 py-2.5 text-[#6E5D52] hover:text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            Repositori Dokumen ({documents.length})
          </Link>
          <Link
            href="/admin/users"
            className="px-4 py-2.5 text-[#6E5D52] hover:text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            Manajemen Pengguna
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {uploadSuccess && (
          <div className="bg-[#EAF5EA] border border-[#BDE3BF] text-[#2E7D32] px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* STATISTIK PLATFORM & RISET SECTION matching Admin.png */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#361D10]">
              Statistik Platform & Riset
            </h2>
            <p className="text-xs text-[#7A6A60]">
              Metrik performa edukasi ilmiah, pertumbuhan ekosistem, dan stabilitas produksi peternak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat 1 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6A60] font-medium">Total Pengunjung Aktif</span>
                <div className="text-2xl font-black text-[#361D10]">
                  {MOCK_ADMIN_STATS.activeVisitors.toLocaleString("id-ID")} <span className="text-xs font-normal text-[#8A7A70]">/ bln</span>
                </div>
                <div className="text-[11px] font-bold text-[#2E7D32]">
                  ↗ {MOCK_ADMIN_STATS.activeVisitorsMoM} vs bulan lalu
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#4A2D1B] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6A60] font-medium">Unduhan Riset PDF</span>
                <div className="text-2xl font-black text-[#361D10]">
                  {MOCK_ADMIN_STATS.pdfDownloads.toLocaleString("id-ID")} <span className="text-xs font-normal text-[#8A7A70]">unduhan</span>
                </div>
                <div className="text-[11px] font-bold text-[#2E7D32]">
                  ↗ {MOCK_ADMIN_STATS.pdfDownloadsLabel}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#4A2D1B] flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6A60] font-medium">Total Dokumen Terindeks</span>
                <div className="text-2xl font-black text-[#361D10]">{documents.length}</div>
                <div className="text-[11px] font-semibold text-[#8C7B71]">4 Kategori Pokok</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#DE992B] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6A60] font-medium">Status Integrasi Dify</span>
                <div className="text-base font-bold text-[#2E7D32] flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Mode Simulasi Siap
                </div>
                <div className="text-[11px] text-[#8C7B71]">DIFY_MOCK_MODE=true</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] text-[#4A2D1B] flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* BAR CHART SECTION matching Admin.png */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-[#361D10]">
                  Tren Kunjungan & Unduhan Riset
                </h3>
                <p className="text-xs text-[#7A6A60]">
                  Perbandingan volume pengunjung bulanan terhadap interaksi unduh dokumen teknis
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#5A3825]" />
                  <span className="text-[#5A3825]">Kunjungan Web</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#EEA734]" />
                  <span className="text-[#EEA734]">Unduhan PDF</span>
                </div>
              </div>
            </div>

            {/* Interactive Bars matching Admin.png */}
            <div className="pt-6 pb-2 px-2 flex items-end justify-between gap-4 h-56 border-b border-[#F1E8DF]">
              {MOCK_ADMIN_STATS.monthlyTrends.map((trend, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Dark brown visit bar */}
                    <div
                      style={{ height: `${(trend.visits / 200) * 100}%` }}
                      className="w-4 sm:w-8 bg-[#5A3825] rounded-t-md relative transition-all group-hover:brightness-110"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-[#361D10] text-white text-[10px] px-1 rounded transition-opacity pointer-events-none whitespace-nowrap">
                        {trend.visits * 250}
                      </span>
                    </div>

                    {/* Golden download bar */}
                    <div
                      style={{ height: `${(trend.downloads / 200) * 100}%` }}
                      className="w-4 sm:w-8 bg-[#EEA734] rounded-t-md relative transition-all group-hover:brightness-110"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-[#A36D16] text-white text-[10px] px-1 rounded transition-opacity pointer-events-none whitespace-nowrap">
                        {trend.downloads * 200}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#7A6A60]">{trend.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#8C7B71] pt-1">
              <span>Basis data agregasi per peternak aktif se-Indonesia</span>
              <span className="font-semibold text-[#4A2D1B] cursor-pointer hover:underline">
                Lihat Analisis Detail →
              </span>
            </div>
          </div>
        </section>

        {/* UNGGAH DOKUMEN PDF RISET & LAPORAN matching Admin.png */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1E8DF] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF5E5] text-[#DE992B] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#361D10]">
                  Unggah Dokumen PDF Riset & Laporan
                </h3>
                <p className="text-xs text-[#7A6A60]">
                  Publikasikan pedoman teknis budidaya, riset formulasi pakan, dan analisis biosafety flok.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#FAF4EB] border border-[#F3E2CB] text-[11px] font-bold text-[#8C5D19] self-start sm:self-center">
              Format Terverifikasi: Standar PDF/A
            </span>
          </div>

          <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Upload Dropzone matching Admin.png */}
            <div className="lg:col-span-5 border-2 border-dashed border-[#DFD3C5] hover:border-[#DE992B] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#FAF7F2]/40 transition-colors cursor-pointer min-h-[260px]">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2D5C7] flex items-center justify-center text-[#DE992B] shadow-xs">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="font-bold text-sm text-[#361D10]">
                  Tarik dan lepaskan file PDF riset ke sini
                </p>
                <p className="text-xs text-[#7A6A60]">
                  atau <span className="text-[#DE992B] font-semibold underline">klik untuk memilih file</span> dari komputer
                </p>
              </div>

              <div className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF4EB] text-[#8C5D19] border border-[#F3E2CB]">
                MAKSIMAL UKURAN: 25MB
              </div>

              <p className="text-[11px] text-[#9A8A80]">
                Mendukung laporan flok, jurnal nutrisi pakan, pedoman biosekuriti.
              </p>

              {selectedFileName && (
                <div className="text-xs font-bold text-[#2E7D32] bg-[#EAF5EA] px-3 py-1 rounded-md">
                  File terpilih: {selectedFileName}
                </div>
              )}
            </div>

            {/* Right Form Fields matching Admin.png */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#361D10]">
                  Judul Riset / Laporan Ilmiah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Analisis Keseimbangan Asam Amino Pakan Terhadap Kualitas Kerabang Telur"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#361D10]">
                    Kategori Pembahasan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                  >
                    <option value="Nutrisi Pakan">Nutrisi Pakan</option>
                    <option value="Penyakit & Vaksinasi">Penyakit & Vaksinasi</option>
                    <option value="Manajemen Suhu & Kandang">Manajemen Suhu & Kandang</option>
                    <option value="Smart Poultry IoT">Smart Poultry IoT</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#361D10]">
                    Status Akses Publikasi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={accessStatus}
                    onChange={(e) => setAccessStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                  >
                    <option value="Publik (Terbuka untuk Semua Peternak)">
                      Publik (Terbuka untuk Semua Peternak)
                    </option>
                    <option value="Internal Khusus Admin">Internal Khusus Admin</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#361D10]">
                  Abstrak / Ringkasan Singkat (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={abstractText}
                  onChange={(e) => setAbstractText(e.target.value)}
                  placeholder="Tuliskan temuan kunci rekomendasi formulasi, dosis, atau dampak langsung ke rasio FCR flok..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                />
              </div>

              {/* Golden Submit Button matching Admin.png */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#F3AC3C] hover:bg-[#E59E2E] text-[#361D10] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Unggah & Publikasikan Dokumen</span>
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* DAFTAR DOKUMEN PDF TERUNGGAH TABLE matching Admin.png */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#361D10]">
                Daftar Dokumen PDF Terunggah
              </h3>
              <p className="text-xs text-[#7A6A60]">
                Manajemen arsip jurnal, status visibilitas pustaka, dan rekap statistik unduhan pengguna.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8C7B71] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari arsip PDF..."
                  className="pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] focus:border-[#4A2D1B] outline-none"
                />
              </div>
              <button className="p-2 rounded-xl border border-[#E2D5C7] text-[#5A483E] hover:border-[#4A2D1B] transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#7A6A60] font-bold uppercase tracking-wider border-y border-[#E8DCCF]">
                <tr>
                  <th className="py-3 px-4">Nama File PDF</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Tanggal Unggah</th>
                  <th className="py-3 px-3">Ukuran File</th>
                  <th className="py-3 px-3">Total Unduhan</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E8DF]">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#361D10]">
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="leading-snug">{doc.title}</div>
                          <div className="text-[11px] font-normal text-[#8C7A70] mt-0.5">
                            {doc.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#FFF5E5] text-[#8C5D19] font-semibold text-[11px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[#6A5A50]">
                      {new Date(doc.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-3 text-[#6A5A50]">
                      {(Number(doc.file_size_bytes || 0) / (1024 * 1024)).toFixed(1)} MB
                    </td>
                    <td className="py-4 px-3 font-semibold text-[#361D10]">
                      📥 {doc.download_count?.toLocaleString("id-ID") || 0}
                    </td>
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] font-bold text-[10px]">
                        ● Publik
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-[#6C5D53] hover:text-[#4A2D1B] hover:bg-[#EADBCE]/50 transition-colors"
                          title="Lihat"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-[#6C5D53] hover:text-[#4A2D1B] hover:bg-[#EADBCE]/50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination matching Admin.png */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#F1E8DF] text-xs text-[#7A6A60]">
            <div>
              Menampilkan 1 - {filteredDocs.length} dari total 42 dokumen publikasi riset
            </div>

            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#5A483E] transition-colors">
                Sebelumnya
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-[#4A2D1B] text-white font-bold">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#5A483E] transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#5A483E] transition-colors">
                3
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#5A483E] transition-colors">
                Selanjutnya
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
