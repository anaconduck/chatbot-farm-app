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
  title: "TanyaTernak",
  description:
    "Platform chatbot berbasis RAG dan repositori riset agribisnis peternakan unggas Indonesia. Didukung Program HIBAH Fakultas Peternakan Universitas Brawijaya.",
  icons: {
    icon: "/images/logo/logo1.png?v=3",
    shortcut: "/images/logo/logo1.png?v=3",
    apple: "/images/logo/logo1.png?v=3",
  },
  keywords: [
    "TanyaTernak",
    "Agribisnis Peternakan",
    "Fapet Universitas Brawijaya",
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
