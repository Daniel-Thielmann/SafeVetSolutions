'use client'

import { ArrowDownToLine, BadgeCheck, CircleEllipsis, CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type cardProps = {
  id?: number;
  title: string;
  sold: number;
  active: number;
  price?: string;
};

export default function OrderCard({
  title,
  sold,
  active,
  price,
  id,
}: cardProps) {

    const getStatus = () => {
        if (sold === 1 && active === 0) {
          return { text: "aprovado", icon: <BadgeCheck className="text-[#1C275F]" /> };
        } else if (sold === 0 && active === 0) {
          return { text: "cancelado", icon: <CircleX className="text-[#1C275F]" /> };
        } else {
          return { text: "aguardando", icon: <CircleEllipsis className="text-[#1C275F]" /> };
        }
      };
    
    const {text, icon} = getStatus();

  return (
    <div className=" flex w-full h-full">
      <div className="bg-white flex flex-col rounded-l-lg w-2/3 lg:w-5/6 pl-4 pr-3 py-4 space-y-1">
        <Link href={`/dashboard/purchases-made/${id}`}>
          <h1 className="font-bunken text-2xl">{title}</h1>
          <p className="font-goldplay text-base lg:text-lg xl:text-xl line-clamp-2 flex pt-2 gap-2 text-[#1C275F] items-center">
            {icon}{text}
        </p>
        </Link>
      </div>
      
        
        <div className="bg-[#1C275F] flex items-center justify-center rounded-r-lg w-1/3 h-full lg:w-1/6 hover:bg-[#3f4d94] transition-all cursor-pointer">
          <ArrowDownToLine strokeWidth={3} color="white" />
        </div>
 </div>
  );
}
