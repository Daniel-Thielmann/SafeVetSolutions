import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OurMaterialsCard({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-[#C6DDED] border-[#72B5D9] p-6 rounded-lg border-4 flex justify-between lg:items-center w-full lg:w-[55%] hover:bg-[#aecfe7] cursor-pointer transition-all"
    >
      <div className="max-w-[80%]">
        <h1 className="font-bunken text-[#1C275F] mb-4 text-xl lg:text-2xl uppercase">
          {title}
        </h1>
        <p className="font-goldplay text-base lg:text-xl">{text}</p>
      </div>
      <ArrowRight width={42} height={42} />
    </Link>
  );
}
