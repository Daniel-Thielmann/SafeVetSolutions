'use client'

import Link from "next/link";
import ArticleCard from "./article-card";
import getNews from "@/auth/get-landing-page/get-landing-page";
import { useEffect, useState } from "react";

type NewsProps = {
  id: number | null;
  title: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
  adm_id: number | null;
};

type Mensagem = {
  message: string;
}

export default function ArticleSection({ news }: { news: NewsProps[] | { message: string } }) {

  const newsArray = Array.isArray(news)

  return (
    <>
      <div className="bg-[#C6DDED] w-11/12 sm:w-2/4">
        <h1 className="xl:pl-72 pl-16 py-2 text-[#1C275F] font-manilla text-2xl lg:text-3xl">
          Fique Atualizado
        </h1>
      </div>
      <div
        className="w-11/12 mx-auto"
        style={{
          backgroundImage: "url(/assets/hex.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      >
        <div className="space-y-8">
          <p className="font-goldplay text-xl lg:text-2xl">Fique por Dentro das Novidades na Medicina Veterinária!</p>
          <p className="font-goldplay text-lg lg:text-xl w-11/12 lg:w-8/12">
            Acompanhe as últimas atualizações em estudos científicos, boas práticas e gestão para clínicas e hospitais veterinários. Na Safevet Solutions, estamos sempre conectados a inovações que elevam a qualidade do cuidado animal e impulsionam o sucesso de sua clínica. Não perca dicas exclusivas e tendências do setor!
          </p>
          {
            newsArray ?
              (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {news.map((news, index) => (
                    <ArticleCard key={news.id} {...news} />
                  ))}
                </div>

              ) :
              <h1>{news.message}</h1>
          }

        </div>
      </div>
      <div className="flex justify-end w-full">
        <div className="bg-[#C6DDED] flex justify-start w-10/12 sm:w-5/12 hover:bg-[#aecfe7] cursor-pointer transition-all">
          <Link href={"/article"}>
            <h1 className="xl:pl-72 pl-16 pr-4 py-2 text-[#1C275F] font-manilla text-2xl lg:text-3xl">
              Ver mais
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}
