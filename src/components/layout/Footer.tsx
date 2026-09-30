import React from "react";
import { Mail, Camera, MapPin } from "lucide-react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EFEAE2] border-t border-[#E3D9CC] py-8 text-sm text-[#736357]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Brand & Socials */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#DE992B]/40 flex items-center justify-center p-1">
                <Image
                  src="/images/chatbot/cowboy-robot.png"
                  alt="ChickyAI Icon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-[#4A2D1B]">ChickyAI</span>
            </div>

            <div className="flex items-center gap-2 text-[#736357]">
              <a
                href="mailto:halo@chickyai.id"
                className="w-7 h-7 rounded-full bg-white/70 border border-[#DCD2C4] flex items-center justify-center hover:text-[#4A2D1B] hover:bg-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/70 border border-[#DCD2C4] flex items-center justify-center hover:text-[#4A2D1B] hover:bg-white transition-colors"
                aria-label="Social Media"
              >
                <Camera className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/70 border border-[#DCD2C4] flex items-center justify-center hover:text-[#4A2D1B] hover:bg-white transition-colors"
                aria-label="Location"
              >
                <MapPin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Copyright */}
          <div className="text-center text-xs text-[#7A6A5E]">
            © 2026 ChickyAI. Hak cipta dilindungi undang-undang.
          </div>

          {/* Right spacing holder (chatbot sits fixed above) */}
          <div className="hidden sm:block w-28" />
        </div>
      </div>
    </footer>
  );
};
