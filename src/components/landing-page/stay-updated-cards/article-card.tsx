"use client";

import Image from "next/image";
import { textResize } from "@/utils/text-resize";
import { useWindowWidth } from "@/utils/use-window-width";
import Link from "next/link";

type articleProp = {
  id: number | null;
  title: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
  adm_id: number | null;
};

export default function ArticleCard({ title, content, image, id }: articleProp) {
  const windowWidth = useWindowWidth();
  return (
    <Link
      href={`/article/${id}`}
      className="bg-[#1C275F] px-4 py-8 rounded-xl flex items-center justify-start gap-4 lg:gap-6 w-full hover:bg-[#3f4d94] transition-all cursor-pointer"
    >
      <img
        width={500}
        height={500}
        src={image}
        alt="Imagem ilustrativa de contato"
        className="aspect-video rounded-xl w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
      />
      <div className="flex flex-col text-start gap-1 text-white">
        <h1 className="text-xl font-bunken font-manilla-cellos">{title}</h1>
        <div className="text-base lg:text-lg font-goldplay line-clamp-3 break-all" dangerouslySetInnerHTML={{__html : textResize(content, windowWidth)}}>
        </div>
      </div>
    </Link>
  );
}
