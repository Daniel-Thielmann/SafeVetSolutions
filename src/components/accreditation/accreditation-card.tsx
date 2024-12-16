import { CircleCheckBig, Flag } from "lucide-react";

type accreditarionProps = {
  text: string;
};

export default function AccreditationCard({
  text,
}: accreditarionProps) {
  return (
    <div className="flex bg-[#E6DCC978] items-center justify-center rounded-2xl border border-[#C59F52] w-[254px] h-[281px] lg:w-[280px]">
      <div className="p-3 flex flex-col items-center gap-6">
        <div className="w-[58px] h-[58px] rounded-full bg-[#C59F52] flex items-center justify-center">
          <CircleCheckBig strokeWidth={3} color="#E6DCC9" className="w-12 h-8"/>
        </div>
        
        <p className="font-goldplay text-center text-base xl:line-clamp-none">{text}</p>
      </div>
    </div>
  );
}