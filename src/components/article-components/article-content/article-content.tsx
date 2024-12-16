import Image from "next/image";
import { newLineToP } from "@/utils/new-line-to-p";

type PostProps = {
  id: number ;
  title: string;
  image: string ;
  content: string;
  created_at: string;
  updated_at: string;
  adm_id: number | null;
};


export default function ArticleContent({
  id, title, image, content, created_at, updated_at, adm_id
}: PostProps) {
  const date = new Date(created_at.substring(0, 10)).toLocaleDateString();
  return (
    <div className="flex flex-col gap-11 lg:gap-12">
      <img src={image} alt="Imagem ilustrativa do artigo" className="aspect-video rounded-xl w-full"></img>
      <div className="flex font-goldplay flex-col gap-4 lg:gap-8 font-normal text-black">
        <h1 className="text-center font-bunken text-[#192355] text-xl md:text-2xl lg:text-3xl font-bold">
          {title}
        </h1>
        <div className="flex text-md md:text-lg lg:text-xl flex-col gap-y-2.5" dangerouslySetInnerHTML={{__html: content}}>
          
        </div>
        <h2 className="text-end text-[#192355] text-lg md:text-xl lg:text-2xl">
          {date}
        </h2>
      </div>
    </div>
  );
}
