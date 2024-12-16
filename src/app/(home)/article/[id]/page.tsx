import ArticleContent from "@/components/article-components/article-content/article-content";
import ArticleCard from "@/components/landing-page/stay-updated-cards/article-card";
import fetchSingleNews from "@/auth/news-id/route";
import getFourNews from "@/auth/get-landing-page/get-landing-page";


async function getNewsId(id: number) {
  try {
    const response = await fetchSingleNews(id);

    if (response !== null) {
      if (response.status !== 200) {
        console.error("Failed to fetch data");

        return null;
      }
      return response;
    }
  } catch (e) {
    console.error("Failed to fetch data", e);
    return null;
  }
}

async function getLastFourNews() {
  try {
    const response = await getFourNews();
    console.log(response);

    return response;

  } catch (error) {
    return { message: "Houve um erro ao buscar" };
  }
}
export default async function SingleArticleViewPage({ params }: { params: { id: string } }) {

  const id = parseInt(params.id, 10)
  const data = await getNewsId(id)

  const lastFourNews = await getLastFourNews();
  const newsArray = Array.isArray(lastFourNews)

  return (
    <div className="flex flex-col justify-center px-6 py-12 items-center w-full bg-[#E4EFF6]">
      <div className="flex flex-col w-11/12 md:w-2/3">
      {
        data?.news.id &&
        <ArticleContent  {...data?.news} />
      }
        
      </div>
      <div className=" w-11/12 md:w-4/5 flex flex-col items-center justify-center">
        <div className="bg-[#C6DDED] w-full h-12 my-8 flex justify-end lg:bg-transparent items-center pr-2 ">
          <h1 className="w-full my-8 text-end lg:text-start font-manilla lg:font-bunken lg:font-bold text-[#192355] text-xl md:text-2xl lg:text-3xl font-normal">
            OUTROS ARTIGOS
          </h1>
        </div>
        {
            newsArray ? 
            (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {lastFourNews.map((news, index) => (
                    <ArticleCard key={news.id} {...news} />
                  ))}
                </div>

            ):
            <h1>Nenhum artigo encontrado</h1>
          }
        </div>
    </div>
  );
}
