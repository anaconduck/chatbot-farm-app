import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  href = "/",
}) => {

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Golden icon frame with chicken */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#E2A638] to-[#C4861C] p-0.5 shadow-sm">
        <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center p-1">
          <Image
            src="/images/chatbot/cowboy-robot.png"
            alt="ChickyAI Emblem"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-extrabold text-xl tracking-tight text-[#4A2D1B] leading-none">
          Chicky<span className="text-[#DE992B]">AI</span>
        </span>
        <span className="text-[9px] font-semibold text-[#8C7B71] tracking-widest uppercase mt-0.5">
          Poultry AI Partner
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-transform hover:scale-[1.02]">
        {content}
      </Link>
    );
  }

  return content;
};
