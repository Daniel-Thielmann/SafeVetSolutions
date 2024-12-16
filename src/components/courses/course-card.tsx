import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

type cardProps = {
  id?: number;
  image?: string;
  title: string;
  description: string;
  price?: string;
};

export default function CoursesCard({
  title,
  description,
  image,
  price,
  id,
}: cardProps) {
  return (
    <div className=" flex w-full h-full">
      <div className="bg-white flex flex-col rounded-l-lg w-2/3 lg:w-5/6 pl-4 pr-3 py-4 space-y-1">
        <Link href={`/dashboard/courses/${id}`}>
          <h1 className="font-bunken text-2xl">{title}</h1>
          <div className="font-goldplay text-base lg:text-lg xl:text-xl line-clamp-2" dangerouslySetInnerHTML={{__html: description}}></div>
        </Link>
      </div>
      
        <div className="bg-[#1C275F] flex items-center justify-center rounded-r-lg w-1/3 h-full lg:w-1/6 hover:bg-[#3f4d94] transition-all cursor-pointer">
          <ArrowDownToLine strokeWidth={3} color="white" />
        </div>
   </div>
  );
}