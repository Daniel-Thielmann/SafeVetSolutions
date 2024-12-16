"use client";

import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className={`${ pathname === '/accreditation' ? "bg-[#C59F52]":"bg-[#1C275F]"} flex flex-col  font-bunkentechsans text-[#C6DDED] items-center gap-10 py-10 md:py-12 md:px-28 md:flex-row md:justify-between md:items-start`}>
      <div className="flex flex-col items-center gap-6 md:items-start">
        <span>CONTATO</span>
        <div className="flex flex-col gap-2 items-center md:gap-6 md:items-start">
          <span className="flex gap-4 items-center">
            <Phone className="w-8 h-8" />
            (32) 99197-3007
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 md:gap-10">
        NOSSAS REDES
        <div className="flex gap-12">
          <Instagram className="w-8 h-8 md:w-12 md:h-12" />
          <MessageCircle className="w-8 h-8 md:w-12 md:h-12" />
        </div>
      </div>
    </div>
  );
}
