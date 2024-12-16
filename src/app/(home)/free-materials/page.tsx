import getFreeMaterials from "@/auth/get-free-materials/get-free-materials";
import FreeMaterialsCard from "@/components/free-materials-page/free-materials-card";
import Pagination from "@/components/pagination/pagination";

async function getMaterials(currentPage: number) {
  try {
    const materials = await getFreeMaterials(currentPage)
    return materials
  } catch (error) {
    console.error("Fail to get free materials", error)
  }
}

export default async function FreeMaterialsPage({ searchParams }: { searchParams: { page?: string } }) {

  const currentPage = Number(searchParams.page) || 1
  const freeMaterials = await getMaterials(currentPage)

  return (
    <div className="bg-[#F2F7FB] w-full space-y-6 min-h-screen">
      <h1 className="uppercase text-[#1C275F] bg-[#C6DDED] pr-3 py-2 pl-6 sm:pl-16 md:pl-32 font-manilla text-2xl lg:text-3xl w-fit">
        Materiais Gratuitos
      </h1>
      <div className="w-11/12 lg:w-10/12 mx-auto">
        <p className="text-justify font-goldplay w-full mx-auto text-base lg:text-xl">
          Na SafevteSolutions, acreditamos no poder do conhecimento para transformar o cuidado veterinário. Disponibilizamos uma seleção de materiais gratuitos para apoiar clínicas, hospitais e profissionais da área, contribuindo para a melhoria dos processos e da qualidade do atendimento.
          Baixe agora e tenha acesso a guias práticos, e-books e conteúdos exclusivos que vão ajudar você a elevar o nível dos seus serviços e garantir o melhor para os seus pacientes!
          Aproveite, é gratuito e vai te ajudar a ir mais longe!
        </p>
        <div className="w-full flex justify-center">
          <div className=" flex flex-col my-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-full gap-3">
            <div className=" gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center">
              {freeMaterials?.freeContents ? (freeMaterials?.freeContents.map((content, index) => (
                <FreeMaterialsCard title={content.title} type="pdf" data={content.updated_at.slice(0, 10)} key={index} file={content.file} />
              )))
                :
                <h1 className="text-2xl text-red-500">Ainda não possui materiais gratuitos.</h1>
              }
            </div>
            {
              freeMaterials?.freeContents && freeMaterials?.totalPages > 1 &&
              <Pagination totalPages={freeMaterials?.totalPages} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
