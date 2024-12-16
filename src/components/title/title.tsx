
type titleProps = {
    title: string;
  };

export default function Title ({
    title
} : titleProps) {
    return (
        <div className="uppercase w-full text-center text-[#1C275F] font-goldplay text-2xl lg:text-3xl pb-5">
            {title}
        </div>
    )
}