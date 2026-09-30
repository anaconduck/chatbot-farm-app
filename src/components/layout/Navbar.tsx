"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import {
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Bot,
  LayoutDashboard,
  BookOpen,
  Home,
  Info,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, logout, isDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Logo />
            {isDemo && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FFF3D6] text-[#A36D16] border border-[#F3DB9A]">
                Demo Mode
              </span>
            )}
          </div>

          {/* Desktop Navigation Links: Beranda -> Riset & Edukasi -> [User links] -> About */}
          <nav className="hidden md:flex items-center gap-8">
            {/* 1. Beranda */}
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors pb-1 relative ${
                isActive("/")
                  ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                  : "text-[#6E5D52] hover:text-[#4A2D1B]"
              }`}
            >
              Beranda
            </Link>

            {/* 2. Riset & Edukasi */}
            <Link
              href="/riset"
              className={`text-sm font-semibold transition-colors pb-1 relative ${
                isActive("/riset")
                  ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                  : "text-[#6E5D52] hover:text-[#4A2D1B]"
              }`}
            >
              Riset & Edukasi
            </Link>

            {/* Logged in User links */}
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-semibold transition-colors pb-1 flex items-center gap-1.5 ${
                    isActive("/dashboard")
                      ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                      : "text-[#6E5D52] hover:text-[#4A2D1B]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#DE992B]" />
                  Dashboard
                </Link>

                <Link
                  href="/chat"
                  className={`text-sm font-semibold transition-colors pb-1 flex items-center gap-1.5 ${
                    isActive("/chat")
                      ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                      : "text-[#6E5D52] hover:text-[#4A2D1B]"
                  }`}
                >
                  <Bot className="w-4 h-4 text-[#DE992B]" />
                  Chat Chicky
                </Link>
              </>
            )}

            {role === "ADMIN" && (
              <Link
                href="/admin"
                className={`text-sm font-semibold transition-colors pb-1 flex items-center gap-1.5 ${
                  isActive("/admin")
                    ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                    : "text-[#6E5D52] hover:text-[#4A2D1B]"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#DE992B]" />
                Admin Panel
              </Link>
            )}

            {/* 3. About (ditaruh terakhir sesuai instruksi) */}
            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors pb-1 relative ${
                isActive("/about")
                  ? "text-[#4A2D1B] border-b-2 border-[#4A2D1B]"
                  : "text-[#6E5D52] hover:text-[#4A2D1B]"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Action / Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-[#4A2D1B]">{user.full_name}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#EADBCE] text-[#5A3825]">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4A2D1B] hover:bg-[#382112] text-white text-sm font-medium transition-all shadow-sm active:scale-95"
                >
                  <span>Logout</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#4A2D1B] hover:text-[#2A170C] transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#DE992B] hover:bg-[#C8851E] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4A2D1B] hover:bg-[#EADBCE]/50 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EADBCE] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
          >
            <Home className="w-4 h-4 text-[#DE992B]" />
            Beranda
          </Link>

          <Link
            href="/riset"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
          >
            <BookOpen className="w-4 h-4 text-[#DE992B]" />
            Riset & Edukasi
          </Link>

          {user && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
              >
                <LayoutDashboard className="w-4 h-4 text-[#DE992B]" />
                Dashboard Peternak
              </Link>
              <Link
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
              >
                <Bot className="w-4 h-4 text-[#DE992B]" />
                Chatbot ChickyAI
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
            >
              <ShieldCheck className="w-4 h-4 text-[#DE992B]" />
              Admin Portal
            </Link>
          )}

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#4A2D1B] hover:bg-[#EADBCE]/40"
          >
            <Info className="w-4 h-4 text-[#DE992B]" />
            About
          </Link>

          <div className="pt-3 border-t border-[#EADBCE]">
            {user ? (
              <div className="space-y-3">
                <div className="text-xs text-[#7A6B62]">
                  Login sebagai: <span className="font-bold text-[#4A2D1B]">{user.full_name}</span> ({user.role})
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#4A2D1B] text-white text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-lg border border-[#4A2D1B] text-sm font-semibold text-[#4A2D1B]"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-lg bg-[#DE992B] text-white text-sm font-semibold"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
