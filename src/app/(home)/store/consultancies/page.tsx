import fetchStoreConsultancies from "@/auth/get-store-consultancies";
import Pagination from "@/components/pagination/pagination";
import SidebarStore from "@/components/sidebar-store";
import StoreCard from "@/components/store-page/store-cards/store-card";


async function getConsutancieStore(currentPage: number) {
  try {
    const response = await fetchStoreConsultancies(currentPage);


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

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {

  const currentPage = Number(searchParams.page) || 1
  const data = await getConsutancieStore(currentPage)


  return (
    <div className="flex flex-col w-full items-start justify-center gap-6">
      <div className="bg-[#C6DDED] w-2/3 md:w-1/4 h-12 flex justify-end items-center pr-2 ">
        <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
          LOJA
        </h1>
      </div>
      <div className="flex w-full flex-col md:flex-row justify-center gap-3 md:justify-center md:gap-6 mb-8">
        <div className="rounded-lg bg-[#1C275F] w-11/12 mx-auto md:mx-0 md:w-1/4 lg:w-1/5 flex flex-row justify-center items-start text-white">
          <SidebarStore category={"consultorias"} />
        </div>
        <div className="w-11/12 mx-auto md:mx-0 md:w-2/3 lg:w-1/2 flex flex-col gap-3">
          <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-9">
            {data?.consultancies ? (data?.consultancies.map((product, index) => (
              <StoreCard {...product} category={"consultancies"} key={index} />
            )))
              :
              <div className="flex items-center justify-center">
                <h1 className="text-2xl text-red-500">Ainda não possui consultorias.</h1>
              </div>
            }
          </div>
          {
            data?.consultancies && data.totalPages > 1 &&
            <Pagination totalPages={data?.totalPages} />
          }
        </div>
      </div>
    </div >

  )
}