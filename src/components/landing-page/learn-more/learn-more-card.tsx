import Image from "next/image";

export default function LearnMoreCard({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: string;
}) {
  return (
    <div className="relative bg-[#F2F7FB] p-6 rounded-lg border border-blue-900 min-h-[150px] mx-auto md:w-[450px] lg:min-h-[290px] lg:max-w-[320px]">
      <Image
        src={image}
        alt={title}
        width={68}
        height={68}
        quality={100}
        className="absolute top-[-26px] right-[-26px]"
      />
      <h1 className="font-bunken text-[#1C275F] text-2xl text-center mb-8">
        {title}
      </h1>
      <p className="font-goldplay text-[#192355] text-base lg:text-lg">
        {text}
      </p>
    </div>
  );
}
