

import getConsultancies from "@/auth/get-consultancies/route";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import ConsultancyCard from "@/components/consultancy/consultancy-card";
import Pagination from "@/components/pagination/pagination";
import Title from "@/components/title/title";
import Link from "next/link";
import { Suspense } from "react";

async function getDashboardConsultancies(page: number) {
  try {
    const response = await getConsultancies(page);


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

async function checkAuthentication() {
  try {
    const authStatus = await isAuthenticated();
    if (authStatus !== "Authenticated") {
      return authStatus;
    }
  } catch (error) {
    console.error('Failed to check authentication', error);
    return null;
  }
}


export default async function Consultancies({searchParams}:{searchParams:{page?: string}}) {

  const currentPage = Number(searchParams?.page) || 1
  const data = await getDashboardConsultancies(currentPage);
  console.log(data?.consultancies)
  console.log(data?.totalPages)

  const authentication = await checkAuthentication();
  console.log(authentication)

  return (
    <div>
      {authentication === "Authenticated." ? (
        <div className="flex flex-col mb-12">
          <div className="w-full">
            <Title title="Consultorias" />

            <div className="flex flex-col mt-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-11/12 lg:w-10/12 mx-auto gap-3">
              <Suspense fallback={<div className="flex justify-center items-center text-3xl">Carregando...</div>}>
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center w-full">
                  {data?.consultancies.map((item, index) => (
                    <ConsultancyCard
                      id={item.id}
                      price={item.product.price}
                      title={item.product.title}
                      image={item.product.image}
                      description={item.product.description}
                      key={index}
                    />
                  ))}
                </div>
              </Suspense>
            </div>
          </div>
          {
            data?.consultancies && data.totalPages > 1 &&
            <Pagination totalPages={data?.totalPages} />
          }
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
  );
}