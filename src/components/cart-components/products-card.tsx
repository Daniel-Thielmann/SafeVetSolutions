import { CartContext } from "@/context/cart";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Product } from "types/product";

export default function ProductsCard({ product }: { product: Product }) {

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }
    
    const { handleRemoveFromCart } = cartContext;

    const handleRemoveClick = () => {
        if (product && product.id !== undefined) {
            handleRemoveFromCart(product.id);
        } else {
            console.error("Product or product ID is undefined");
        }
    };

    return (
        <div className="py-4 gap-3 md:gap-10 flex flex-col items-center w-full text-center md:text-start lg:flex-row rounded-lg">
            <img
                src={product?.image}
                alt="Imagem ilustrativa do produto"
                width={500}
                height={500}
                className="aspect-video rounded-xl w-10/12 lg:w-1/2 h-auto"
            />
            <div className="flex flex-col w-10/12 items-center md:items-start lg:w-full gap-3">
                <h1 className="font-bunken w-full text-[#192355] text-md lg:text-xl overflow-hidden uppercase py-1">
                    {product?.title}
                </h1>
                {
                    product?.description &&
                    <div className="font-goldplay w-full font-normal text-[#192355] px-3 md:px-0 line-clamp-2" dangerouslySetInnerHTML={{ __html: product?.description }}>
                    </div>
                }
                <span className="font-goldplay w-full font-normal text-[#192355] text-2xl">
                    R$ {product?.price}
                </span>
                <div className="w-fit cursor-pointer">
                    <button
                        className="hover:bg-[#1C275F] border-4 border-[#A1CAE3] text-[#027AA0] font-goldplay hover:text-[#F2F7FB] px-3 py-2 rounded-lg text-md xl:text-lg transition ease-in-out delay-50"
                        onClick={ handleRemoveClick }
                    >
                        remover do carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}