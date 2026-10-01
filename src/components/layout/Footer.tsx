import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EFEAE2] border-t border-[#E3D9CC] py-6 sm:py-7 text-sm text-[#736357]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
        {/* Left Side: 2 Logos & Grant Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 text-center sm:text-left">
          {/* 2 Logos: TanyaTernak & Universitas Brawijaya */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 relative flex items-center justify-center p-0.5">
              <Image
                src="/images/logo/logo1.png?v=3"
                alt="Logo TanyaTernak"
                width={46}
                height={46}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 relative flex items-center justify-center">
              <Image
                src="/images/logo/universitas-brawijaya.svg"
                alt="Logo Universitas Brawijaya"
                width={46}
                height={46}
                className="object-contain"
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block h-10 w-[1px] bg-[#D6CABE]" />

          {/* Grant & Collaboration Details */}
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-[#361D10] tracking-wide">
              Program Hibah Fakultas Peternakan Universitas Brawijaya (FAPET UB)
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A6A5E] leading-relaxed">
              Hilirisasi Riset Ilmiah & Kecerdasan Buatan (AI) Terapan untuk Agribisnis Peternakan
            </p>
            <p className="text-[11px] text-[#8A7A6E]">
              © 2026 TanyaTernak. Fakultas Peternakan Universitas Brawijaya.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
