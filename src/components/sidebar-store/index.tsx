'use client'
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function SidebarStore({category}: {category:string}) {

    const [isFilterOpen, setIsFilterOpen] = useState(true);

    return (
        <div className="w-10/12 md:w-2/3 flex flex-col text-start gap-4 py-4">
            <div className="w-full flex justify-between items-center">
                <button className="cursor-pointer">
                    <h1 className="font-bunken font-bold text-[#F2F2F4] text-xl">
                        filtrar
                    </h1>
                </button>
                <ArrowDown className="h-8 w-8" onClick={() => setIsFilterOpen(!isFilterOpen)} />
            </div>
            {isFilterOpen && (
                <>
                    <div className="w-full h-[1px] bg-gray-500" />
                    <Link href={"/store/ebooks"} className={`w-fit text-white hover:text-[#d6d6d6] transition-all text-xl capitalize ${category == 'ebooks' ? "font-manilla" : "font-goldplay"} `}>ebooks</Link>
                    <div className="w-full h-[1px] bg-gray-500" />
                    <Link href={"/store/consultancies"} className={`w-fit text-white hover:text-[#d6d6d6] transition-all text-xl capitalize ${category == 'consultorias' ? "font-manilla" : "font-goldplay"}`}>consultorias</Link>
                    <div className="w-full h-[1px] bg-gray-500" />
                    <Link href={"/store/courses"} className={`w-fit text-white hover:text-[#d6d6d6] transition-all text-xl capitalize ${category == 'cursos' ? "font-manilla" : "font-goldplay"}`}> cursos</Link>
                    <div className="w-full h-[1px] bg-gray-500" />
                    <Link href={"/store/manuals"} className={`w-fit text-white hover:text-[#d6d6d6] transition-all text-xl capitalize ${category == 'manuais' ? "font-manilla" : "font-goldplay"}`}>manuais</Link>
                    <div className="w-full h-[1px] bg-gray-500" />
                    <Link href={"/store/asa"} className={`w-fit text-white hover:text-[#d6d6d6] transition-all text-xl capitalize ${category == 'asa' ? "font-manilla" : "font-goldplay"}`}>certificação</Link>
                    <div className="w-full h-[1px] bg-gray-500" />
                </>
            )}
        </div>
    )
}