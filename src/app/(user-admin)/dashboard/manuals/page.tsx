
import getManuals from "@/auth/api-manuals/route";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import Pagination from "@/components/pagination/pagination";
import CardManual from "@/components/title/CardManual";
import Title from "@/components/title/title";
import Link from "next/link";


async function getDashboardManuals(currentPage: number) {
  try {
    const response = await getManuals(currentPage);

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
export default async function Manuals({searchParams}:{searchParams:{page?:string}}) {

  const currentPage = Number(searchParams.page) || 1
  const data = await getDashboardManuals(currentPage);
  console.log(data?.manuals)

  const authentication = await checkAuthentication();
  return (
    <div>
      {authentication === "Authenticated." ? (
        <div className=" flex flex-col">
          <div className="w-full">
            <Title title="Manuais" />
            <div className="flex flex-col mt-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-11/12 lg:w-10/12 mx-auto gap-3">
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center w-full">
                {data?.manuals.map((item, index) => (
                  <CardManual title={item.product.title} id={item.id} description={item.product.description} key={index} file={item.file}/>
                ))}
              </div>
              {
                data?.manuals && data.totalPages > 1 &&
                <Pagination totalPages={data?.totalPages} />
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