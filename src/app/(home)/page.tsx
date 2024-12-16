
import getFourNews from "@/auth/get-landing-page/get-landing-page";
import LearnMore from "@/components/landing-page/learn-more/learn-more";
import LetsMeet from "@/components/landing-page/lets-meet/lets-meet";
import Logo from "@/components/landing-page/logo/logo";
import OurMaterials from "@/components/landing-page/our-materials/our-materials";
import ArticleSection from "@/components/landing-page/stay-updated-cards/article-section";
import { Suspense } from "react";

async function getLastFourNews() {
  try {
      const response = await getFourNews();
      console.log(response);

      return response;

  } catch (error) {
      return {message: "Houve um erro ao buscar"};
  }
}

export default async function Home() {

  const data = await getLastFourNews();

  return (
    <main className="space-y-16 mb-10">
      <Logo />
      <Suspense fallback={<p>Carregando</p>}>
      <ArticleSection news={data}/>
      </Suspense>
      <LearnMore />
      <OurMaterials />
      <LetsMeet />
    </main>
  );
}
