import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChickyAI — Asisten Cerdas Peternakan Ayam & Arsip Sains",
  description:
    "Platform chatbot berbasis RAG dan pusat riset peternakan unggas modern Indonesia. Jawaban berbasis dokumen ilmiah pakan, penyakit, dan kandang.",
  icons: {
    icon: "/images/logo/emblem.png",
    shortcut: "/images/logo/emblem.png",
    apple: "/images/logo/emblem.png",
  },
  keywords: [
    "ChickyAI",
    "Peternakan Ayam",
    "Ayam Petelur",
    "Layer",
    "Broiler",
    "Riset Pakan",
    "Biosekuriti",
    "Kandang Closed House",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakartaSans.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1D13] antialiased selection:bg-[#DE992B]/20 selection:text-[#4E2E1E]">
        <AuthProvider>
          {children}
          <FloatingChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
