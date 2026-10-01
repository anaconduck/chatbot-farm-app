"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  X,
  UploadCloud,
  LogOut,
  Layers,
  Users,
} from "lucide-react";

export default function AdminDocumentsPage() {
  const { user, logout } = useAuth();
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("2025");
  const [category, setCategory] = useState("Nutrisi Pakan");
  const [description, setDescription] = useState("");

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: title.endsWith(".pdf") ? title : `${title.replace(/\s+/g, "_")}.pdf`,
      author: author || user?.full_name || "Admin AgroLivestock AI",
      publication_year: parseInt(year, 10) || 2025,
      category,
      description,
      original_filename: `${title.replace(/\s+/g, "_")}.pdf`,
      status: "READY" as const,
      file_size_bytes: 4.2 * 1024 * 1024,
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setDocuments([newDoc, ...documents]);
    setIsModalOpen(false);
    setTitle("");
    setAuthor("");
    setDescription("");

    setNotification(
      `[Development Placeholder] Dokumen "${newDoc.title}" berhasil ditambahkan.`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const filtered = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      (d.author && d.author.toLowerCase().includes(search.toLowerCase()))
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
            className="px-4 py-2.5 border-b-2 border-[#4A2D1B] text-[#4A2D1B] flex items-center gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-[#DE992B]" />
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {notification && (
          <div className="bg-[#EAF5EA] border border-[#BDE3BF] text-[#2E7D32] px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#361D10]">
              Arsip & Manajemen Dokumen RAG
            </h1>
            <p className="text-xs text-[#7A6A60]">
              Kelola status indexing berkas PDF yang digunakan chatbot AgroLivestock AI untuk menjawab peternak.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F3AC3C] hover:bg-[#E59E2E] text-[#361D10] text-xs font-bold shadow-xs transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Upload PDF</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DCCF]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7B71] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan judul, kategori, atau penulis..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
            />
          </div>

          <span className="text-xs text-[#7A6A60] font-medium">
            Total Dokumen: <strong>{filtered.length}</strong>
          </span>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-3xl border border-[#E8DCCF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#7A6A60] font-bold uppercase tracking-wider border-b border-[#E8DCCF]">
                <tr>
                  <th className="py-3.5 px-4">Document</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3">Author & Year</th>
                  <th className="py-3.5 px-3">Size</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Uploaded At</th>
                  <th className="py-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E8DF]">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#FAF7F2]/60">
                    <td className="py-4 px-4 font-bold text-[#361D10]">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-[#DE992B] shrink-0 mt-0.5" />
                        <div>
                          <div className="leading-snug">{doc.title}</div>
                          <div className="text-[11px] font-normal text-[#8C7B71] line-clamp-1">
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
                    <td className="py-4 px-3 text-[#5A4B42]">
                      <div>{doc.author || "Anonim"}</div>
                      <div className="text-[10px] text-[#8C7B71]">{doc.publication_year || 2025}</div>
                    </td>
                    <td className="py-4 px-3 text-[#6A5A50]">
                      {(Number(doc.file_size_bytes || 0) / (1024 * 1024)).toFixed(1)} MB
                    </td>
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] font-bold text-[10px]">
                        ● {doc.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[#7A6A60]">
                      {new Date(doc.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-lg text-[#6C5D53] hover:text-[#4A2D1B] hover:bg-[#EADBCE]/50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Upload PDF Modal per Section T */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#E8DCCF] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F1E8DF] pb-3">
              <h3 className="text-lg font-bold text-[#361D10] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#DE992B]" />
                Upload Dokumen PDF Riset
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#8C7B71] hover:text-[#361D10]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#361D10]">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Manajemen Biosekuriti Kandang Broiler 2025"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#361D10]">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nama Penulis / Lab"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#361D10]">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#361D10]">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
                >
                  <option value="Nutrisi Pakan">Nutrisi Pakan</option>
                  <option value="Penyakit & Vaksinasi">Penyakit & Vaksinasi</option>
                  <option value="Manajemen Suhu & Kandang">Manajemen Suhu & Kandang</option>
                  <option value="Smart Poultry IoT">Smart Poultry IoT</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#361D10]">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ringkasan abstrak dokumen riset..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D5C7] text-xs text-[#361D10] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#361D10]">PDF File *</label>
                <div className="p-4 border-2 border-dashed border-[#DFD3C5] rounded-xl text-center text-xs text-[#8C7B71] bg-[#FAF7F2]">
                  Pilih file PDF dari komputer (Maksimal 25MB)
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2D5C7] text-xs font-semibold text-[#5A483E]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F3AC3C] hover:bg-[#E59E2E] text-[#361D10] text-xs font-bold shadow-xs"
                >
                  Simpan & Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
