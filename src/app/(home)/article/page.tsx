import ArticleCard from "@/components/article-components/article-card/article-card";
import Pagination from "@/components/pagination/pagination";
import { Suspense, useEffect, useState } from "react";
import getArticles from "@/auth/get-articles/route";

async function getNews(currentPage: number) {
  try {
    const response = await getArticles(currentPage);

    if (response.status !== 200) {
      console.error("Failed to fetch data");

      return null;
    }
    return response;
  } catch (e) {
    console.error("Failed to fetch data", e);
    return null;
  }
}

export default async function ArticlePage({ searchParams }: { searchParams: { page?: string } }) {

  const currentPage = Number(searchParams.page) || 1
  const data = await getNews(currentPage)
  console.log(data?.totalPages)
  console.log(data?.status)

  return (
    <div className="bg-[#F2F7FB] flex flex-col gap-10 min-h-screen">
      <div className="bg-[#C6DDED] w-2/3 lg:w-1/4 h-12 mt-6 flex justify-end items-center pr-2 ">
        <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-manilla font-normal">
          ARTIGOS
        </h1>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center texte-3xl">Carregando...</div>}>
        <div className="grid grid-cols-1 md:gap-x-12 gap-y-6 mr-8 md:mx-12 lg:mx-20 lg:grid-cols-2 pb-6 ">
          {data?.news ? (data?.news.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))) :
            <div className="flex items-center justify-center">
              <h1 className="text-2xl text-red-500">A página ainda não possui artigos.</h1>
            </div>
          }
        </div>
      </Suspense>

      {
        data?.news && data.totalPages > 1 &&
        <Pagination totalPages={data?.totalPages ?? 1} />
      }

    </div>
  );
}
