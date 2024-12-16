"use client";

import Image from "next/image";
import { textResize } from "../../../../public/assets/js/text-resize";
import { useWindowWidth } from "../../../../public/assets/js/use-window-width";

type articleProp = {
    image: string;
    title: string;
    text: string;
};

export default function ArticleCards({ title, text, image }: articleProp) {
    const windowWidth = useWindowWidth();
    return (
        <div className="bg-[#1C275F] px-4 py-8 rounded-xl flex items-center justify-center gap-4 lg:gap-6 w-full">
            <Image
                width={500}
                height={500}
                src={image}
                alt="Imagem ilustrativa de contato"
                className="aspect-video rounded-xl w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
            />
            <div className="flex flex-col text-start gap-1 text-white">
                <h1 className="text-sm md:text-lg font-bunken font-manilla-cellos">{title}</h1>
                <p className="text-xs md:text-sm lg:text-lg font-normal font-goldplay">{textResize(text, windowWidth)}</p>
            </div>
        </div>
    );
}
