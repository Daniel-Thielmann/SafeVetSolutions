
import clsx from "clsx";
import Link from "next/link";

type SingleViewProps = {
    title: string | undefined;
    about?: string;
    price: string | undefined;
    buttontext: string;
    buttonbg: string;
    image: string | undefined;
    description: string | undefined;
    buttonHoverBg: string;
    buttonTextColor: string;
    textHoverColor: string;
    file: string | undefined
}


export default function SingleView({ title, textHoverColor, about, price, buttontext, buttonbg, image, description, buttonHoverBg, buttonTextColor, file }: SingleViewProps) {

    const buttonClassName = clsx(
        "w-fit transition ease-in-out delay-75 font-goldplay rounded-md px-2 py-1 text-lg",
        {
            [`bg-[${buttonbg}] text-[${buttonTextColor}]`]: true,
            [`hover:bg-[${buttonHoverBg}]`]: true,
            [`hover:text-[${textHoverColor}]`]: true,
        }
    );

    return (
        <div className="flex flex-col items-center justify-center w-full gap-16">
            <div className="flex flex-col md:flex-row w-10/12 justify-center items-center gap-12">

                {image && (
                    <img
                        src={image}
                        width={500}
                        height={500}
                        alt="imagem"
                        className="md:w-96 md:h-72 w-full h-56 rounded-lg"
                    />
                )

                }

                <div className=" w-full md:w-2/3 flex flex-col justify-center md:justify-start gap-5 lg:gap-12">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bunken font-bold text-center md:text-start text-[#192355] text-lg lg:text-xl">{title}</h1>
                        <p className="font-goldplay text-center md:text-start text-[#192355] text-md">{about}</p>
                    </div>
                    <span className="font-goldplay text-center md:text-start text-[#192355] text-2xl">R$ {price}</span>
                    <div className="w-full flex items-center justify-center md:justify-start">
                        {
                            file ?
                                <Link href={file} target="_blank">
                                    <button className={buttonClassName}>{buttontext}</button>
                                </Link>
                                :
                                <button className={buttonClassName}>{buttontext}</button>
                        }
                    </div>
                </div>
            </div>
            <div className="px-1 md:px-0 flex flex-col w-full md:w-10/12 gap-3 md:gap-5">
                <h1 className="font-bunken font-bold text-center md:text-start text-[#192355] text-lg lg:text-xl">Descrição</h1>

                {
                    description &&
                    <div className="text-[#192355] text-md font-goldplay" dangerouslySetInnerHTML={{ __html: description }}></div>
                }
            </div>
        </div>
    )
}
