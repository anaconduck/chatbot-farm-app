import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EFEAE2] border-t border-[#E3D9CC] py-10 text-sm text-[#736357]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-3">
        {/* Logo Universitas Brawijaya */}
        <div className="w-14 h-14 relative flex items-center justify-center">
          <Image
            src="/images/logo/universitas-brawijaya.svg"
            alt="Logo Universitas Brawijaya"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        {/* Program Hibah FAPET UB */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-[#361D10] tracking-wide">
            Program Hibah Fakultas Peternakan Universitas Brawijaya (FAPET UB)
          </p>
          <p className="text-[11px] sm:text-xs text-[#7A6A5E] leading-relaxed max-w-xl mx-auto">
            Hilirisasi Riset Ilmiah & Kecerdasan Buatan (AI) Terapan untuk Agribisnis Peternakan
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-2 text-center text-[11px] sm:text-xs text-[#8A7A6E]">
          © 2026 TanyaTernak. Fakultas Peternakan Universitas Brawijaya.
        </div>
      </div>
    </footer>
  );
};
