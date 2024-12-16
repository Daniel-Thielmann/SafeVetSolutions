"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname(); //armazena url atual do usuario ex: /article caso ele esteja na pag 1
  const searchParams = useSearchParams(); //igual a usepathname, mas armazena os parametros da url. ex: ?page=1
  const currentPage = Number(searchParams.get("page")) || 1; //existe o parametro page? se sim, retorna o valor, se não, retorna 1

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams); //passa os parametros da url(page)
    params.set("page", "1"); //seta o parametro page para 1 por segurança
    params.set("page", String(pageNumber)); //seta o parametro page para o numero da pagina
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="rounded-full w-full flex items-center px-4 py-2 justify-center gap-6">
      <div className="flex items-center">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex items-center text-sm font-normal font-goldplay text-black">
          {currentPage} - {totalPages}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-full border",
    {
      "pointer-events-none text-[#E4EFF6] bg-[#E4EFF6]": isDisabled,
      "text-white bg-[#1C275F] hover:bg-[#A1CAE3] hover:text-[#1C275F]":
        !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  return (
    <Link href={href} className={className}>
      <button>
        {direction === "left" ? (
          <ChevronLeft className="w-4" />
        ) : (
          <ChevronRight className="w-4" />
        )}
      </button>
    </Link>
  );
}
