import getEbooksPrivate from "@/auth/api-ebooks-id-dashboard/route";
import fetchSingleEbook from "@/auth/api-ebooks-id/route";
import SingleView from "@/components/single-view-page/single-view";

async function getDashboardEbooksId({ id }: { id: number }) {
  try {
    const response = await getEbooksPrivate(id);


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

export default async function SingleEbookView({ params }: { params: { id: string } }) {

  const id = parseInt(params.id, 10);
  const data = await getDashboardEbooksId({ id });
  console.log(data?.ebook)

  return (
    <div className="bg-[#F2F7FB] flex flex-col gap-12 items-center min-h-screen">
      <div className="w-10/12 flex justify-start">
        <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
          E-BOOK
        </h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <SingleView  {...data} textHoverColor="#1C275F" buttonbg="#1C275F" buttonHoverBg="#A1CAE3" buttonTextColor="#F2F7FB" buttontext="acessar pdf" description={data?.ebook.product.description} image={data?.ebook.product.image} price={data?.ebook.product.price} title={data?.ebook.product.title} about="" file={data?.ebook.file}/>
      </div>
    </div>
  )
}