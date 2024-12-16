import OurMaterialsCard from "./our-materials-card";

const loja = `Conheça nossas soluções exclusivas de consultoria, certificação de qualidade e cursos especializados que impulsionam sua prática veterinária. Transforme sua clínica com ferramentas que garantem excelência em gestão, atendimento e bem-estar animal.`

const materiais = `Aproveite nossos e-books, aulas e dicas exclusivas, tudo grátis! Conhecimento prático e atualizado para melhorar a gestão, o atendimento e a qualidade dos serviços veterinários.`

const acreditacao = `Ao contratar nosso diagnóstico institucional, sua clínica ou hospital veterinário recebe gratuitamente o Manual de Certificação, uma ferramenta completa para elevar o padrão de qualidade e gestão.`

export default function OurMaterials() {
  return (
    <div
      className="flex flex-col justify-center items-center mt-10 mb-10"
      style={{
        backgroundImage: "url(/assets/hex.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <div className="space-y-8 flex flex-col items-center w-11/12">
        <h1 className="font-manilla text-[#1C275F] text-3xl lg:text-4xl text-center">
          Nossos Materiais
        </h1>
        <OurMaterialsCard title="Loja" text={loja} href="/store/ebooks" />
        <OurMaterialsCard
          title="Materiais Gratuitos"
          text={materiais}
          href="/free-materials"
        />
        <OurMaterialsCard
          title="Ganhe um Manual"
          text={acreditacao}
          href="/accreditation"
        />
      </div>
    </div>
  );
}
