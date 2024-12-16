import AccreditationCard from "@/components/accreditation/accreditation-card";
import Image from "next/image";
import Link from "next/link";

export default function AccreditationPage() {

    const vantagem1 = "A creditação em saúde animal garante às clínicas e hospitais veterinários um selo de excelência, certificando a qualidade e segurança no cuidado aos animais. "
    const vantagem2 = "Com a certificação do SISTEMA ASA, o estabelecimento se destaca no mercado, oferecendo aos tutores maior confiança nos serviços prestados."
    const vantagem3 = "Além disso, promove melhorias contínuas nos processos, aumenta a satisfação da equipe e assegura o cumprimento de padrões rigorosos de higiene, bem-estar animal e atendimento."

    return (
        <div className="w-full min-h-screen space-y-12">
            <h1 className="uppercase text-[#C59F52] bg-[#232323] pr-3 py-2 pl-6 sm:pl-16 md:pl-32 font-bunken text-2xl xl:text-3xl w-fit">
                Certificação
            </h1>
            <div className="flex flex-col gap-16 xl:gap-0 xl:flex-row xl:justify-between w-11/12 xl:w-10/12 mx-auto xl:mx-36">
                <div className="space-y-16 xl:w-8/12 xl:pr-16">
                    <div className="space-y-6">
                        <p className="font-goldplay xl:text-lg text-justify w-11/12 xl:w-full mx-auto">
                            Nosso produto é voltado para clínicas veterinárias de todos os portes e veterinários autônomos que buscam alcançar um novo nível de qualidade nos serviços prestados. Inspirado nas certificações da saúde humana, oferecemos:
                            Certificação de Qualidade adaptada para a medicina veterinária.
                            Manual de Boas Práticas abrangendo gestão, atendimento clínico e ambiental.
                            Software de Monitoramento com ferramentas para análise de desempenho, cursos e atualizações contínuas.
                            Seja referência no mercado veterinário e ofereça o melhor para seus pacientes! Descubra as vantagens do ASA e veja como nossa plataforma pode ajudar a impulsionar seu negócio veterinário ao próximo nível!

                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center xl:justify-normal gap-8">
                        <AccreditationCard text={vantagem1} />
                        <AccreditationCard  text={vantagem2} />
                        <AccreditationCard text={vantagem3} />
                    </div>
                </div>
                <div className="w-full xl:w-4/12 flex flex-col xl:gap-0 gap-4 items-center xl:text-clip">
                    <Image
                        src="/assets/sistemasa.png"
                        alt="Logo do Asa"
                        width={500}
                        height={302}
                        className=""
                    />
                    <Link href={'/store/asa'}>
                        <button className="w-11/12 md:w-6/12 xl:w-11/12 bg-[#232323] p-5 rounded-xl hover:bg-opacity-90 transition-all text-center font-bunken text-[#C59F52] text-md xl:text-xl">
                            Adquira creditação e ganhe um manual
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}