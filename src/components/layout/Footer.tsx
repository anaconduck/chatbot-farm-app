import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EFEAE2] border-t border-[#E3D9CC] py-6 sm:py-7 text-sm text-[#736357]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left Side: 3 Logos & Grant Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
          {/* 3 Logos: TanyaTernak, Universitas Brawijaya, Diktisaintek */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Logo TanyaTernak - visual optical size matched with UB */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center">
              <Image
                src="/images/logo/logo1.png?v=4"
                alt="Logo TanyaTernak"
                width={36}
                height={36}
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Logo Universitas Brawijaya */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 relative flex items-center justify-center">
              <Image
                src="/images/logo/universitas-brawijaya.svg"
                alt="Logo Universitas Brawijaya"
                width={42}
                height={42}
                className="object-contain"
              />
            </div>

            {/* Logo Diktisaintek */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center">
              <Image
                src="/images/logo/diktisaintek-emblem.png"
                alt="Logo Diktisaintek"
                width={38}
                height={38}
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
              © 2026 TanyaTernak. Didukung oleh Kemdiktisaintek & Fakultas Peternakan Universitas Brawijaya.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
