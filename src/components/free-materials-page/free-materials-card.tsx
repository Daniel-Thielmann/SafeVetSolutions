import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

type freeMaterialsProps = {
  title: string;
  type: string;
  data: string;
  file: string
};

export default function FreeMaterialsCard({
  title,
  type,
  data,
  file
}: freeMaterialsProps) {
  return (
    <div className=" flex w-full">
      <div className="bg-white flex flex-col rounded-l-lg w-2/3 h-[172px] lg:w-5/6 pl-4 justify-center gap-4">
        <h1 className="font-bunken text-2xl md:text-xl lg:text-2xl line-clamp-2 mr-2">{title}</h1>
        <p className="font-goldplay text-base lg:text-lg xl:text-xl">{type}</p>
        <p className="font-goldplay text-base lg:text-lg xl:text-xl">{data}</p>
      </div>
      <Link href={file} target="_blank" className="bg-[#1C275F] flex items-center justify-center rounded-r-lg w-1/3 h-[172px] lg:w-1/6 hover:bg-[#3f4d94] transition-all cursor-pointer">
        <ArrowDownToLine strokeWidth={3} color="white" />
      </Link>
    </div>
  );
}
