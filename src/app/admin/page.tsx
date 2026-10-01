"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import type { KnowledgeDocument } from "@/types";
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
  Inbox,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [stats, setStats] = useState({
    activeVisitors: 0,
    activeVisitorsMoM: "0%",
    pdfDownloads: 0,
    pdfDownloadsLabel: "Total unduhan",
    totalDocuments: 0,
    totalUsers: 0,
    monthlyTrends: [] as Array<{ month: string; visits: number; downloads: number }>,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Nutrisi Pakan");
  const [accessStatus, setAccessStatus] = useState("Publik (Terbuka untuk Semua Peternak)");
  const [abstractText, setAbstractText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Fetch initial data from APIs
  const loadData = async () => {
    try {
      const [docsRes, statsRes] = await Promise.all([
        fetch("/api/admin/documents"),
        fetch("/api/admin/stats"),
      ]);

      if (docsRes.ok) {
        const docsData = await docsRes.json();
        setDocuments(docsData.documents || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formattedTitle = title.endsWith(".pdf") ? title : `${title.replace(/\s+/g, "_")}.pdf`;
      const res = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formattedTitle,
          author: user?.full_name || "Admin TanyaTernak",
          publication_year: new Date().getFullYear(),
          category,
          description: abstractText || "Dokumen teknis terverifikasi untuk peternakan unggas.",
          original_filename: selectedFileName || formattedTitle,
          file_size_bytes: 3.5 * 1024 * 1024,
        }),
      });

      if (res.ok) {
        setUploadSuccess(`Dokumen "${title}" berhasil disimpan ke database.`);
        setTitle("");
        setAbstractText("");
        setSelectedFileName(null);
        await loadData();
      } else {
        const err = await res.json();
        alert(`Gagal menyimpan: ${err.error || "Terjadi kesalahan"}`);
      }
    } catch (err: any) {
      alert(`Gagal mengunggah: ${err?.message || "Koneksi terputus"}`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadSuccess(null), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus dokumen ini dari database?")) return;

    try {
      const res = await fetch(`/api/admin/documents?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
        setStats((prev) => ({
          ...prev,
          totalDocuments: Math.max(0, prev.totalDocuments - 1),
        }));
      } else {
        const err = await res.json();
        alert(`Gagal menghapus: ${err.error || "Terjadi kesalahan"}`);
      }
    } catch (err: any) {
      alert(`Gagal menghapus: ${err?.message}`);
    }
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Top Bar */}
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
          {/* Header Title with Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4A2D1B] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#DE992B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#361D10]">
                  Panel Pengelola TanyaTernak
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] border border-[#C6E6C7] text-[10px] font-bold">
                  ● DATABASE AKTIF
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 text-xs">
            <button className="px-3 py-2 rounded-xl bg-white border border-[#E2D5C7] text-[#5A483E] hover:border-[#4A2D1B] flex items-center gap-1.5 font-medium transition-colors">
              <Calendar className="w-3.5 h-3.5 text-[#DE992B]" />
              <span>Tahun {new Date().getFullYear()}</span>
            </button>
            <button
              onClick={() => loadData()}
              className="px-3 py-2 rounded-xl bg-white border border-[#E2D5C7] text-[#5A483E] hover:border-[#4A2D1B] flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#4A2D1B]" />
              <span>Refresh Data</span>
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
            Manajemen Pengguna ({stats.totalUsers})
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

        {/* STATISTIK PLATFORM & RISET SECTION */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#361D10]">
              Statistik Platform & Riset
            </h2>
            <p className="text-xs text-[#7A6A60]">
              Metrik riil dari database Supabase Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat 1 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCF] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6A60] font-medium">Total Pengunjung Aktif</span>
                <div className="text-2xl font-black text-[#361D10]">
                  {stats.activeVisitors.toLocaleString("id-ID")}{" "}
                  <span className="text-xs font-normal text-[#8A7A70]">/ bln</span>
                </div>
                <div className="text-[11px] font-semibold text-[#8C7B71]">
                  {stats.activeVisitors === 0 ? "Belum ada kunjungan tercatat" : `↗ ${stats.activeVisitorsMoM}`}
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
                  {stats.pdfDownloads.toLocaleString("id-ID")}{" "}
                  <span className="text-xs font-normal text-[#8A7A70]">unduhan</span>
                </div>
                <div className="text-[11px] font-semibold text-[#8C7B71]">
                  {stats.pdfDownloadsLabel}
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
                <div className="text-[11px] font-semibold text-[#8C7B71]">
                  {documents.length === 0 ? "Database kosong" : `${documents.length} dokumen tersimpan`}
                </div>
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

          {/* BAR CHART SECTION */}
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

            {/* Chart Area */}
            {stats.monthlyTrends.length > 0 ? (
              <div className="pt-6 pb-2 px-2 flex items-end justify-between gap-4 h-56 border-b border-[#F1E8DF]">
                {stats.monthlyTrends.map((trend, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div
                        style={{ height: `${Math.min(100, (trend.visits / 200) * 100)}%` }}
                        className="w-4 sm:w-8 bg-[#5A3825] rounded-t-md relative transition-all group-hover:brightness-110"
                      />
                      <div
                        style={{ height: `${Math.min(100, (trend.downloads / 200) * 100)}%` }}
                        className="w-4 sm:w-8 bg-[#EEA734] rounded-t-md relative transition-all group-hover:brightness-110"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#7A6A60]">{trend.month}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pt-8 pb-8 px-4 flex flex-col items-center justify-center border border-dashed border-[#E8DCCF] rounded-2xl text-center space-y-2 bg-[#FAF7F2]/40">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2D5C7] flex items-center justify-center text-[#DE992B] shadow-xs">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[#361D10]">Belum Ada Data Tren Kunjungan</p>
                <p className="text-[11px] text-[#8C7B71] max-w-md">
                  Grafik kunjungan dan unduhan PDF akan otomatis terbentuk saat pengunjung mulai berinteraksi dengan website.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-[#8C7B71] pt-1">
              <span>Basis data riil dari Supabase PostgreSQL</span>
              <span className="font-semibold text-[#4A2D1B]">Status: Terkoneksi</span>
            </div>
          </div>
        </section>

        {/* UNGGAH DOKUMEN PDF RISET & LAPORAN */}
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
                  Publikasikan pedoman teknis budidaya, riset formulasi pakan, dan analisis biosafety flok ke database.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#FAF4EB] border border-[#F3E2CB] text-[11px] font-bold text-[#8C5D19] self-start sm:self-center">
              Format: Dokumen PDF
            </span>
          </div>

          <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Upload Dropzone */}
            <div className="lg:col-span-5 border-2 border-dashed border-[#DFD3C5] hover:border-[#DE992B] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#FAF7F2]/40 transition-colors cursor-pointer min-h-[260px]">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2D5C7] flex items-center justify-center text-[#DE992B] shadow-xs">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="font-bold text-sm text-[#361D10]">
                  Pilih file PDF riset
                </p>
                <p className="text-xs text-[#7A6A60]">
                  Ketik nama dokumen di formulir sebelah kanan
                </p>
              </div>

              <div className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF4EB] text-[#8C5D19] border border-[#F3E2CB]">
                MAKSIMAL UKURAN: 25MB
              </div>

              <p className="text-[11px] text-[#9A8A80]">
                Mendukung jurnal nutrisi, pedoman biosekuriti, dan studi lapang.
              </p>
            </div>

            {/* Right Form Fields */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#361D10]">
                  Judul Riset / Laporan Ilmiah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Analisis Keseimbangan Asam Amino Pakan Ayam"
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
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                  >
                    <option value="Nutrisi Pakan">Nutrisi Pakan</option>
                    <option value="Penyakit & Vaksinasi">Penyakit & Vaksinasi</option>
                    <option value="Manajemen Kandang">Manajemen Kandang</option>
                    <option value="Ekonomi & Pemasaran">Ekonomi & Pemasaran</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#361D10]">Akses Dokumen</label>
                  <select
                    value={accessStatus}
                    onChange={(e) => setAccessStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                  >
                    <option value="Publik (Terbuka untuk Semua Peternak)">Publik (Terbuka)</option>
                    <option value="Internal Riset">Internal Riset</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#361D10]">
                  Abstrak / Ringkasan Dokumen
                </label>
                <textarea
                  rows={3}
                  value={abstractText}
                  onChange={(e) => setAbstractText(e.target.value)}
                  placeholder="Ringkasan temuan riset, metodologi, dan rekomendasi praktis bagi peternak..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D5C7] text-xs sm:text-sm text-[#361D10] focus:border-[#4A2D1B] outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#F3AC3C] hover:bg-[#E59E2E] text-[#361D10] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan ke Database...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Unggah & Publikasikan Dokumen</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* DAFTAR DOKUMEN PDF TERUNGGAH TABLE */}
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
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#7A6A60]">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-[#DE992B]" />
                        <span>Memuat dokumen dari database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#FAF4EB] text-[#DE992B] flex items-center justify-center shadow-xs">
                          <Inbox className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#361D10]">
                            Belum Ada Dokumen di Database
                          </p>
                          <p className="text-xs text-[#8C7A70] max-w-sm mx-auto">
                            Tabel basis pengetahuan Anda masih kosong. Silakan gunakan formulir di atas untuk mengunggah dokumen riset pertama.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
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
                            onClick={() => handleDelete(doc.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#F1E8DF] text-xs text-[#7A6A60]">
            <div>
              Menampilkan {filteredDocs.length} dari total {documents.length} dokumen publikasi riset
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
