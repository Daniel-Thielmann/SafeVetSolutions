import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "url(/assets/hex.png), url(/assets/hex.png)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "left bottom, right top",
        backgroundSize: "25%, 25%",
      }}
    >
      <div className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto">
        <div className="w-9/12 mx-auto bg-[#C6DDED] shadow-[#027AA0] rounded-2xl p-6 shadow-2xl relative flex justify-center items-center">
          <Image
            src="/safevet.png"
            alt="Logo do Blog"
            width={437}
            height={422}
            quality={100}
          />
          <Link
            href={"/free-materials"}
            className="absolute z-20 bg-[#1C275F] text-white px-8 py-4 rounded-xl right-[-30px] md:right-[-70px] lg:right-[-100px] bottom-[-24px] text-base md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-manilla"
          >
            ACESSAR MATERIAIS
          </Link>
        </div>
        <p className="font-goldplay mt-16 text-xl lg:text-2xl">Safevet Solutions: Inovação e Excelência para a Medicina Veterinária</p>
        <p className="font-goldplay mt-2 text-lg lg:text-xl">
        Transforme sua clínica veterinária com soluções que elevam a qualidade de seus serviços ao mais alto nível. Na Safevet, oferecemos certificação de qualidade, educação contínua e ferramentas de monitoramento para garantir o bem-estar animal e o sucesso do seu negócio. Seja referência no mercado com tecnologias inovadoras e práticas sustentáveis ​​que fazem a diferença!
        </p>
      </div>
    </div>
  );
}
