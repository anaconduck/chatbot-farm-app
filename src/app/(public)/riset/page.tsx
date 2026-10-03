"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MOCK_FACTS } from "@/lib/mock-data";
import { Search, Lightbulb } from "lucide-react";

export default function RisetPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacts = MOCK_FACTS.filter(
    (fact) =>
      fact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20 space-y-12">
        {/* HEADER SECTION */}
        <Reveal>
          <section className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#361D10] tracking-tight">
              Pusat Riset dan Edukasi
            </h1>

            <p className="text-base sm:text-lg text-[#6C5D53] max-w-3xl leading-relaxed">
              Eksplorasi wawasan berbasis data, biologi komparatif, dan repositori studi empiris untuk memberikan inovasi baru dalam peternakan ayam modern.
            </p>
          </section>
        </Reveal>

        {/* SEARCH BOX SECTION */}
        <Reveal delayMs={100}>
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#8A7A70] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari topik wawasan atau fisiologi unggas..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-[#E2D5C7] text-sm text-[#361D10] focus:border-[#4A2D1B] focus:ring-1 focus:ring-[#4A2D1B] outline-none shadow-xs"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-3.5 rounded-xl bg-white border border-[#E2D5C7] hover:border-[#4A2D1B] text-[#4A2D1B] text-sm font-semibold transition-all shrink-0 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </section>
        </Reveal>

        {/* TAHUKAH ANDA? FAKTA UNIK SECTION */}
        <section className="space-y-6 pt-2">
          <Reveal delayMs={150}>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A86F15] mb-1">
                <Lightbulb className="w-4 h-4 text-[#DE992B]" />
                WAWASAN BIOLOGIS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#361D10]">
                Tahukah Anda? Fakta Unik & Menarik Seputar Ayam Petelur
              </h2>
            </div>
          </Reveal>

          {/* Fact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacts.map((fact, idx) => (
              <Reveal key={fact.id} delayMs={(idx % 3) * 100}>
                <div className="interactive-card bg-white rounded-3xl overflow-hidden border border-[#E8DCCF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full group">
                  {fact.image && (
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EAE2D7]">
                      <Image
                        src={fact.image}
                        alt={fact.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 text-[10px] font-extrabold text-[#4A2D1B] shadow-xs uppercase tracking-wider backdrop-blur-xs">
                          {fact.factNumber}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {!fact.image && (
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-[#FAF4EB] text-[10px] font-bold text-[#966318] border border-[#F3E2CB]">
                            {fact.badge}
                          </span>
                          <span className="text-[11px] font-semibold text-[#8C7A70]">
                            {fact.factNumber}
                          </span>
                        </div>
                      )}

                      {fact.image && (
                        <div className="flex items-center">
                          <span className="px-2.5 py-1 rounded-md bg-[#FAF4EB] text-[10px] font-bold text-[#966318] border border-[#F3E2CB]">
                            {fact.badge}
                          </span>
                        </div>
                      )}

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
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
