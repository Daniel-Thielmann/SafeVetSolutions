import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

type cardProps = {
  title: string;
  type?: string;
  data?: string;
  description?: string;
  status?: string;
  id:number;
  file: string
};

export default function CardManual({
  title,
  type,
  data,
  description,
  status,
  id,
  file
}: cardProps) {
  return (
    <div className=" flex w-full h-full">
      <Link href={`/dashboard/manuals/${id}`} className="bg-white hover:bg-slate-100 flex flex-col rounded-l-lg w-2/3 lg:w-5/6 pl-4 pr-3 py-4 space-y-1">
        <h1 className="font-bunken text-2xl">{title}</h1>
        <p className="font-goldplay text-base lg:text-lg xl:text-xl">{type}</p>
        {
          description &&
        <div className="font-goldplay text-base lg:text-lg xl:text-xl line-clamp-2" dangerouslySetInnerHTML={{__html : description}}></div>
        }
        <p className="font-goldplay text-base lg:text-lg xl:text-xl">{status}</p>
        <p className="font-goldplay text-base lg:text-lg xl:text-xl">{data}</p>
      </Link>
      
        <Link href={file} target="_blank" className="bg-[#1C275F] flex items-center justify-center rounded-r-lg w-1/3 h-full lg:w-1/6 hover:bg-[#3f4d94] transition-all cursor-pointer">
          <ArrowDownToLine strokeWidth={3} color="white" />
        </Link>
      
    </div>
  );
}