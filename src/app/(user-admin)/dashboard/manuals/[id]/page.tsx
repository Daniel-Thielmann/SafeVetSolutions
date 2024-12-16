
import getManualPrivate from "@/auth/api-manual-id-dashboard/route";
import fetchSingleManual from "@/auth/api-manual-id/route";
import SingleView from "@/components/single-view-page/single-view";


async function getDashboardManualsId({id} : {id : number}) {
  try {
    const response = await getManualPrivate(id);


    if (response?.status !== 200) {
      console.error("Failed to fetch data aqui");

      return null;
    }

    return response;
  } catch (e) {
    console.error("Failed to fetch data", e);

    return null;
  }
}

export default async function SingleManualView({params} : {params: {id: string}}){
    
      const id = parseInt(params.id, 10);
      const data = await getDashboardManualsId({id});

    return (
        <div className="bg-[#F2F7FB] flex flex-col gap-12 items-center min-h-screen">
            <div className="w-10/12 flex justify-start">
                <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
                    MANUAL
                </h1>
            </div>
            <div className="flex items-center justify-center w-full">
                <SingleView textHoverColor="#1C275F" buttonbg="#1C275F" buttonHoverBg="#A1CAE3" buttonTextColor="#F2F7FB" buttontext="acessar pdf"
                 description={data?.manual.product.description}
                 image={data?.manual.product.image} price={data?.manual.product.price} title={data?.manual.product.title} about="" file={data?.manual.file}/>
            </div>
        </div>
    )
}