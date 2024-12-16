
import fetchSingleConsultancy from "@/auth/api-consultancy-id/route";
import SingleView from "@/components/single-view-page/single-view";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

async function getDashboardConsultanciesId({ id }: { id: number }) {
  try {
    const response = await fetchSingleConsultancy(id);


    if (response?.status !== 200) {
      console.error("Failed to fetch data");

      return null;
    }

    return response;
  } catch (e) {
    console.error("Failed to fetch data", e);

    return null;
  }
}

export default async function SingleConsultancyView({ params }: { params: { id: string } }) {

  const id = parseInt(params.id, 10);
  const data = await getDashboardConsultanciesId({ id });
  console.log(data?.consultancy)

  return (
    <div className="bg-[#F2F7FB] flex flex-col gap-12 items-center min-h-screen">
      <div className="w-10/12 flex justify-start">
        <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
          consultoria
        </h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <SingleView {...data} buttonbg="#1C275F" buttontext="acessar consultoria" buttonHoverBg="#A1CAE3" buttonTextColor="#F2F7FB" textHoverColor="#1C275F" description={data?.consultancy.product.description}
          image={data?.consultancy.product.image} price={data?.consultancy.product.price} title={data?.consultancy.product.title} file={''}/>
      </div>
    </div>
  )
}