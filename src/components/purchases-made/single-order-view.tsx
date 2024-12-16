import { BadgeCheck, CircleEllipsis, CircleX } from "lucide-react";


type Product = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: string;
    productable_type: string;
    productable_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
        order_id: number,
        products_id: number,
    }
}

type SingleViewProps = {
    total_price: string | undefined;
    products: Product[] | undefined;
    sold: number | undefined;
    active: number | undefined;
}

export default function SingleOrderView({total_price, products, sold, active}: SingleViewProps) {

    const getStatus = () => {
        if (sold === 1 && active === 0) {
          return { text: "aprovado" };
        } else if (sold === 0 && active === 0) {
          return { text: "cancelado" };
        } else {
          return { text: "aguardando" };
        }
      };
    
    const {text} = getStatus();

    return (
        <div className="px-1 md:px-0 flex flex-col w-10/12 gap-3 md:gap-5">
            <h1 className="font-bunken font-bold text-center md:text-start text-[#192355] text-lg lg:text-xl mb-3">
                Produtos
            </h1>
            {products?.map((product, index) => (
                <div className="py-4 gap-3 md:gap-10 flex flex-col items-center w-full text-center md:text-start lg:flex-row rounded-lg" key={index}>
                    <img
                        src={product?.image}
                        alt="Imagem ilustrativa do produto"
                        width={100}
                        height={100}
                        className="aspect-video rounded-xl w-6/12 lg:w-1/6 h-auto"
                    />
                    <div className="flex flex-col w-10/12 items-center md:items-start lg:w-full gap-3">
                        <h1 className="font-bunken w-full text-[#192355] text-sm lg:text-md overflow-hidden uppercase py-1">
                            {product?.title}
                        </h1>
                        <span className="font-goldplay w-full font-normal text-[#192355] text-xl">
                            R$ {product?.price}
                        </span>
                    </div>
                </div>
            ))}
            <p className="text-[#192355] text-lg lg:text-2xl font-bold font-goldplay mt-4">Total: R${total_price}</p>
            <div className="text-[#192355] text-md lg:text-xl font-bold font-goldplay mt-4 mb-12">
                <p>Status: {text}</p>
            </div>
        </div>
    )
}