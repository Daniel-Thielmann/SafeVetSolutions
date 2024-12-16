import getCertificate from "@/auth/api-certificates/route";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import Pagination from "@/components/pagination/pagination";
import Title from "@/components/title/title";
import CardCertificates from "@/components/user-sistem/certificates";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";


async function getCertificates(currentPage: number) {
  try {
    const response = await getCertificate(currentPage);

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


export default async function Certificates({ searchParams }: { searchParams: { page?: string } }) {

  const currentPage = Number(searchParams.page) || 1
  const data = await getCertificates(currentPage);
  const authentication = await isAuthenticated();


  return (
    <div>
      {authentication === "Authenticated." ? (
        <div className="flex flex-col">
          <div className="w-full">
            <Title title="Certificados" />
            <div className="flex flex-col mt-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-11/12 lg:w-10/12 mx-auto gap-3">
              {data != null &&
                <Suspense fallback={<div className="w-full text-center text-xl text-blue-950 font-goldplay">Carregando...</div>}>
                  <div className="gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center w-full">
                    {data.certificates.map((certificado, index) => (
                      <CardCertificates description="" {...certificado} id={certificado.course_id} key={index} />
                    ))}
                  </div>
                </Suspense>
              }
              {
                data?.certificates && data.totalPages > 1 &&
                <Pagination totalPages={data.totalPages} />
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#1C275F] text-xl lg:text-3xl mt-16 mb-10">É necessário estar logado para acessar essa página</h1>
          <Link href={"/login"}>
            <button className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full">Ir para página de login</button>
          </Link>
        </div>
      )}
    </div>

  )
}


