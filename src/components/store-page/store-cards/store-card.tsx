import Image from "next/image";
import Link from "next/link";

type productsProp = {
    id: number;
    category: string;
    product: {
        id: number;
        image: string;
        title: string;
        description: string;
        price: string;
    };

}

export default function StoreCard({ id, product, category}: productsProp) {
    return (
        <div className="bg-[#C6DDED] rounded-xl py-4 gap-3 flex flex-col items-center justify-center">
            <img
                src={product.image}
                alt="Imagem ilustrativa do produto"
                width={500}
                height={500}
                className="aspect-video rounded-xl w-4/5 h-auto"
            />
            <div className="flex flex-col justify-between w-10/12 gap-3">
                <h1 className="font-bunken w-full font-bold text-start text-[#192355] text-sm md:text-lg lg:text-xl overflow-hidden">
                    {product.title}
                </h1>
                <span className="w-full text-end font-normal text-[#192355] text-xl font-goldplayMedium">
                    R$ {product.price}
                </span>
            </div>
            <div className="w-10/12 flex justify-end">
                <Link href={`/store/${category}/${id}`}>
                    <button className="bg-[#1C275F] hover:bg-opacity-80 border border-[#1C275F] text-white font-goldplay px-3 py-2 text-center rounded-lg text-sm lg:text-lg transition ease-in-out delay-50">
                        acessar 
                    </button>
                </Link>
            </div>
        </div>
    );
}
