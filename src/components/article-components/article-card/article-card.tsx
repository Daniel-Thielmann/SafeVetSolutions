"use client";

import Image from "next/image";
import Link from "next/link";
import { useWindowWidth } from "@/utils/use-window-width";
import { textResizeSmall } from "@/utils/text-resize";

type articleProp = {
  id: number;
  image: string;
  title: string;
  created_at: string;
  content: string;
};

export default function ArticleCard({
  id,
  title,
  created_at,
  content,
  image,
}: articleProp) {
  const windowWidth = useWindowWidth();
  const date = new Date(created_at.substring(0, 10)).toLocaleDateString();
  return (
    <Link
      href={`/article/${id}`}
      className="bg-[#C6DDED] hover:bg-[#bad4e7] p-3 w-full md:p-5 rounded-xl flex flex-row items-center justify-around gap-4 lg:gap-6"
    >
      <img src={image} alt="Imagem ilustrativa do artigo" className=" rounded-xl w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"></img>
      <div className=" w-2/3 flex flex-col text-start gap-1">
        <h1 className="text-[#192355] text-sm md:text-lg xl:text-xl font-bunken font-bold">
          {title}
        </h1>
        <h2 className="text-black text-xs md:text-sm lg:text-lg font-normal font-goldplay">
          {date}
        </h2>
        <div className="text-black text-xs md:text-sm lg:text-lg font-normal font-goldplay" dangerouslySetInnerHTML={{__html: textResizeSmall(content, windowWidth)}}>
        </div>
      </div>
    </Link>
  );
}
