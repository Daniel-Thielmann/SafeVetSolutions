import Link from "next/link";
import LearnMoreCard from "./learn-more-card";

const visao = `Ser reconhecida como uma força transformadora pioneira na medicina veterinária brasileira, estabelecendo novos padrões de qualidade e segurança nos cuidados com os animais, e fomentando profissionais veterinários com conhecimento e tecnologia para uma prática excepcional.`;

const missao = `Promover a excelência na medicina veterinária, fornecendo soluções inovadoras, integradas e sustentáveis para certificação de qualidade, educação contínua e análise de serviços, a fim de elevar o padrão de cuidado e bem-estar animal em todo o setor.`

const valores = `Nossos valores representam os princípios fundamentais e crenças que orientam o comportamento e as decisões da empresa em todos os níveis. Servem como uma bússola para as decisões estratégicas, operações diárias e cultura organizacional, assegurando que a empresa permaneça alinhada com seu propósito fundamental de melhorar a medicina veterinária.`
export default function LearnMore() {
  return (
    <div
      className="bg-[#C6DDED] py-14 px-4 lg:px-0 w-11/12 lg:w-10/12 rounded-xl bg-no-repeat space-y-12 mx-auto"
      style={{
        backgroundImage: "url(/assets/petts.png)",
        backgroundPosition: "right",
        backgroundSize: "contain",
      }}
    >
      <div className="w-11/12 mx-auto lg:w-9/12 lg:mx-36 space-y-20">
        <div className="space-y-6">
          <h1 className="font-manilla text-[#1C275F] text-2xl lg:text-3xl">
            Saiba Mais
          </h1>
          <p className="font-goldplay w-full lg:w-[60%] lg:text-lg text-justify">
            Na Safevet Solutions, somos pioneiros na elevação dos padrões de qualidade e segurança nos cuidados veterinários. Nossa missão é promover a excelência por meio de soluções inovadoras e sustentáveis, que incluem certificação de qualidade, educação contínua e análise de serviços. Nosso compromisso é com o bem-estar animal, sempre priorizando a integridade, a inovação e a responsabilidade social.
            Unimos tecnologia e conhecimento para capacitar profissionais veterinários e melhorar a prática clínica em todo o setor.

          </p>
          <Link href="/accreditation">
            <button className="text-white bg-[#1C275F] px-8 py-4 font-bunken rounded-xl text-lg lg:text-xl w-full lg:max-w-md hover:bg-[#3f4d94] transition-all cursor-pointer mt-6">
              Nossa Certificação
            </button>
          </Link>
        </div>

        <div className="flex-wrap flex gap-8">
          <LearnMoreCard
            title="Missão"
            text={missao}
            image="/assets/missao.png"
          />
          <LearnMoreCard title="Visão" text={visao} image="/assets/visao.png" />
          <LearnMoreCard
            title="Valores"
            text={valores}
            image="/assets/valores.png"
          />
        </div>
      </div>
    </div>
  );
}
