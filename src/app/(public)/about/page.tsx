import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_TEAM } from "@/lib/mock-data";
import {
  Compass,
  Target,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Microscope,
  Cpu,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#361D10] leading-[1.2] tracking-tight">
                Mendedikasikan Inovasi untuk Masa Depan & Peternakan Unggas Indonesia
              </h1>

              <p className="text-base sm:text-lg text-[#6A5A50] leading-relaxed max-w-2xl">
                ChickyAI hadir sebagai jembatan ilmu pengetahuan antara riset akademis,
                keilmuan veteriner, dan operasional peternakan lapangan melalui kecerdasan
                buatan (AI) yang kredibel dan berbasis literatur ilmiah.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A2D1B] hover:bg-[#382112] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  <span>Mulai Konsultasi Chicky</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/riset"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#DCD0C1] hover:border-[#4A2D1B] text-[#4A2D1B] font-semibold text-sm transition-all"
                >
                  Jelajahi Riset
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl aspect-4/3 group">
                <Image
                  src="/images/farm/modern-poultry-farm.jpg"
                  alt="Modern Poultry Farm Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI SECTION (Replaces single 45+ Jurnal card per user instruction) */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visi Card */}
            <div className="bg-white rounded-2xl p-7 border border-[#E9DDCF] shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5E5] border border-[#F6D7A0] flex items-center justify-center shrink-0 text-[#DE992B]">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#DE992B]">
                  Visi Kami
                </div>
                <h3 className="text-xl font-bold text-[#361D10]">
                  Kedaulatan & Modernisasi Perunggasan Nasional
                </h3>
                <p className="text-sm text-[#6C5D53] leading-relaxed">
                  Menjadi ekosistem kecerdasan buatan dan pusat rujukan ilmiah perunggasan terdepan di Asia Tenggara, mewujudkan peternakan ayam yang berdaya saing tinggi, berkelanjutan, dan efisien berbasis data empiris.
                </p>
              </div>
            </div>

            {/* Misi Card */}
            <div className="bg-white rounded-2xl p-7 border border-[#E9DDCF] shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EAF5EA] border border-[#C6E6C7] flex items-center justify-center shrink-0 text-[#2E7D32]">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
                  Misi Kami
                </div>
                <h3 className="text-xl font-bold text-[#361D10]">
                  Demokratisasi Pengetahuan & Biosekuriti Presisi
                </h3>
                <p className="text-sm text-[#6C5D53] leading-relaxed">
                  Menyederhanakan akses literatur veteriner, panduan manajemen kandang, dan formulasi nutrisi pakan terkini melalui asisten AI interaktif yang dapat diakses oleh setiap peternak rakyat hingga industri besar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ARAH & LANDASAN KERJA */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DF] border border-[#DFD3C4] text-[11px] font-bold text-[#6D4226] tracking-wider uppercase">
              ARAH & LANDASAN KERJA
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#361D10]">
              Membangun Ekosistem Berkelanjutan
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-[#E9DDCF] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF5E5] text-[#DE992B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DE992B]">
                  MISI PERUSAHAAN
                </span>
                <h3 className="text-lg font-bold text-[#361D10]">
                  Langkah Nyata Digitalisasi & Demokratisasi Riset
                </h3>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <p className="text-sm text-[#5B4C42]">
                  <strong className="text-[#361D10]">Demokratisasi Riset Ilmiah:</strong> Menyajikan hasil uji laboratorium secara transparan, mudah diakses, dan aplikatif bagi pengguna di setiap jenjang peternakan.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#54321D] flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#FAF7F2]" />
                </div>
                <p className="text-sm text-[#5B4C42]">
                  <strong className="text-[#361D10]">Inklusif & Berorientasi Lapangan:</strong> Menyelaraskan rekomendasi teori pakan dengan ketersediaan bahan baku lokal Indonesia dan kondisi cuaca tropis basah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TIM RISET SECTION */}
        <section className="py-14 bg-gradient-to-b from-transparent via-[#F3ECE2]/40 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#361D10]">
                Tim Riset & Dewan Pakar
              </h2>
              <p className="text-sm text-[#6C5D53]">
                Didukung oleh akademisi dan praktisi veteriner unggas terkemuka Indonesia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_TEAM.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E9DDCF] shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Portrait with Badge */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#EAE2D7]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 text-[10px] font-extrabold tracking-wider text-[#4A2D1B] shadow-sm uppercase">
                        {member.specialtyBadge}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-[#361D10] leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#DE992B]">
                        {member.role}
                      </p>
                      <p className="text-xs text-[#6C5D53] leading-relaxed pt-2">
                        {member.description}
                      </p>
                    </div>

                    {/* Footer achievement */}
                    <div className="pt-4 border-t border-[#EFE8DF] flex items-center justify-between text-xs text-[#5B4C42]">
                      <span className="font-medium">{member.achievement}</span>
                      {member.specialtyBadge.includes("KESEHATAN") && (
                        <Microscope className="w-4 h-4 text-[#DE992B]" />
                      )}
                      {member.specialtyBadge.includes("NUTRISI") && (
                        <FlaskConical className="w-4 h-4 text-[#DE992B]" />
                      )}
                      {member.specialtyBadge.includes("SISTEM") && (
                        <Cpu className="w-4 h-4 text-[#DE992B]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
