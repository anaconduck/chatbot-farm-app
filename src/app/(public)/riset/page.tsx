"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_FACTS, MOCK_DOCUMENTS } from "@/lib/mock-data";
import {
  Search,
  SlidersHorizontal,
  Lightbulb,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Bot,
} from "lucide-react";

export default function RisetPage() {
  const [selectedDomain, setSelectedDomain] = useState("Semua Domain");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const domains = [
    "Semua Domain",
    "Fisiologi Ayam",
    "Nutrisi & Pakan",
    "Manajemen Suhu & Kandang",
  ];

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    const matchesDomain =
      selectedDomain === "Semua Domain" ||
      (selectedDomain === "Nutrisi & Pakan" && doc.category.includes("Nutrisi")) ||
      (selectedDomain === "Manajemen Suhu & Kandang" &&
        (doc.category.includes("Kandang") || doc.category.includes("IoT"))) ||
      (selectedDomain === "Fisiologi Ayam" && doc.category.includes("Penyakit"));

    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.author && doc.author.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDomain && matchesSearch;
  });

  const handleDownload = (docTitle: string) => {
    setDownloadNotice(`Mengunduh dokumen: ${docTitle}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* HEADER SECTION */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DF] border border-[#DFD3C4] text-[11px] font-bold text-[#6D4226] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DE992B]" />
            ARSIP SAINS
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#361D10] tracking-tight">
            Pusat Riset dan Edukasi
          </h1>

          <p className="text-base sm:text-lg text-[#6C5D53] max-w-3xl leading-relaxed">
            Eksplorasi wawasan berbasis data, biologi komparatif, dan repositori studi empiris untuk memberikan inovasi baru dalam peternakan ayam modern.
          </p>
        </section>

        {/* SEARCH & DOMAIN FILTER SECTION */}
        <section className="space-y-5">
          {/* Search Box matching Riset.png */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#8A7A70] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari riset..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-[#E2D5C7] text-sm text-[#361D10] focus:border-[#4A2D1B] focus:ring-1 focus:ring-[#4A2D1B] outline-none shadow-xs"
              />
            </div>

            <button
              onClick={() => {}}
              className="px-6 py-3.5 rounded-xl bg-[#4A2D1B] hover:bg-[#382112] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Temukan</span>
            </button>

            <button
              onClick={() => setSearchQuery("")}
              className="px-5 py-3.5 rounded-xl bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#4A2D1B] text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Domain Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[#786960] font-semibold mr-1">Domain:</span>
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3.5 py-1.5 rounded-full transition-all font-medium ${
                  selectedDomain === domain
                    ? "bg-[#361D10] text-white shadow-xs"
                    : "bg-white border border-[#E2D5C7] text-[#5A4B42] hover:bg-[#F3EBE0]"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </section>

        {downloadNotice && (
          <div className="bg-[#EAF5EA] border border-[#BDE3BF] text-[#2E7D32] px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* TAHUKAH ANDA? FAKTA UNIK SECTION matching Riset.png */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A86F15] mb-1">
                <Lightbulb className="w-4 h-4 text-[#DE992B]" />
                WAWASAN BIOLOGIS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#361D10]">
                Tahukah Anda? Fakta Unik & Menarik Seputar Ayam Petelur
              </h2>
            </div>
            <p className="text-xs text-[#7A6A60] max-w-md">
              Mekanisme neurobiologi dan fisiologi luar biasa di balik siklus produksi harian ayam petelur komersial.
            </p>
          </div>

          {/* Fact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_FACTS.map((fact) => (
              <div
                key={fact.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF4EB] text-[10px] font-bold text-[#966318] border border-[#F3E2CB]">
                      {fact.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-[#8C7A70]">
                      {fact.factNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#361D10] leading-snug">
                    {fact.title}
                  </h3>

                  <p className="text-xs text-[#6B5B51] leading-relaxed">
                    {fact.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1E7DD] flex items-center justify-between text-xs text-[#7A695E]">
                  <span className="font-medium">{fact.footerLabel}</span>
                  <span className="font-bold text-[#361D10]">{fact.footerValue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH LIBRARY SECTION matching Riset.png */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#DE992B]" />
              <h2 className="text-2xl font-bold text-[#361D10]">
                Kompilasi Riset Terkini Peternakan Unggas (Research Library)
              </h2>
            </div>
            <span className="text-xs text-[#7A695E]">
              Menampilkan {filteredDocs.length} publikasi unggulan
            </span>
          </div>

          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Document Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF5EA] text-[#2E7D32] text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                      Peer-Reviewed
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5E6] text-[#A66E14] text-[10px] font-bold">
                      {doc.category}
                    </span>

                    <span className="text-[11px] text-[#8C7B71]">
                      Doi: 10.1016/j.chickyai.{doc.publication_year || "2025"}.0{doc.id.charCodeAt(0) % 9}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#361D10] hover:text-[#DE992B] transition-colors">
                    {doc.title.replace(".pdf", "").replace(/_/g, " ")}
                  </h3>

                  <p className="text-xs text-[#6B5B51] leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6A60] pt-1">
                    <span>✍️ {doc.author || "Peneliti ChickyAI"}</span>
                    <span>📅 Tahun {doc.publication_year || 2025}</span>
                    <span>📥 {doc.download_count?.toLocaleString("id-ID") || 0} Unduhan</span>
                  </div>
                </div>

                {/* Right Action Buttons matching Riset.png */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#F1E7DD]">
                  <span className="text-[11px] font-semibold text-[#8C7A70] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#DE992B]" />
                    Tersedia PDF ({(Number(doc.file_size_bytes || 0) / (1024 * 1024)).toFixed(1)} MB)
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(doc.title)}
                      className="px-4 py-2.5 rounded-xl bg-[#4A2D1B] hover:bg-[#382112] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Riset</span>
                    </button>

                    <button
                      onClick={() => handleDownload(doc.title)}
                      className="p-2.5 rounded-xl bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#5A483E] hover:text-[#4A2D1B] transition-colors"
                      title="Lihat Abstrak"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM PROMPT BANNER */}
        <section className="bg-gradient-to-r from-[#4E2E1E] to-[#361D10] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Butuh Penjelasan Spesifik Seputar Formula & Penyakit?
            </h3>
            <p className="text-sm text-[#D9C8BC] max-w-xl">
              Tanyakan langsung ke asisten cerdas ChickyAI. AI akan membaca ratusan halaman dokumen riset dan merangkum jawaban terbaik untuk Anda.
            </p>
          </div>
          <Link
            href="/chat"
            className="px-6 py-3.5 rounded-xl bg-[#DE992B] hover:bg-[#C8851E] text-white text-sm font-bold flex items-center gap-2 shrink-0 shadow-md transition-all active:scale-95"
          >
            <Bot className="w-5 h-5" />
            <span>Tanya Chicky Sekarang</span>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
