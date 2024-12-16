'use client'
import fetchSingleAsaId from "@/auth/api-store-asa-id/route";
import fetchSingleAsa from "@/auth/api-store-asa/route";
import { isLoggedIn } from "@/components/user-sistem/login/islogin";
import { CartContext } from "@/context/cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";


async function getAsaId({ id }: { id: number }) {
  try {
    const response = await fetchSingleAsaId(id);


    if (response?.status !== 200) {
      console.error("Failed to fetch data");

      return null;
    }

    return response;
  } catch (e) {
    console.error("Failed to fetch data", e);

    return null;
  }
}
export default async function Page({ params }: { params: { id: string } }) {
//funcionalidade carrinho
  const route = useRouter()

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext is not provided!");
  }

  const { handleAddToCart } = cartContext;

  const addToCart = async () => {

    const currentUser = await isLoggedIn();

    console.log(currentUser)

    if (!currentUser) {
      route.push("/login")
    } else {
      handleAddToCart(singleProduct?.asa.product)
    }
  }
//fim da funcionalidade carrinho
    const id = parseInt(params.id, 10);
    const singleProduct = await getAsaId({ id });
    

  return (
    <div className="bg-[#F2F7FB] flex flex-col gap-16 items-center mb-8">
      <div className="w-full flex justify-start">
        <div className="bg-[#C6DDED] w-2/3 md:w-1/4 h-12 flex justify-end items-center pr-2">
          <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
            LOJA
          </h1>
        </div>
      </div>
      <div>
        {singleProduct ? (
          <div className="flex w-full justify-center items-center flex-col gap-12">
            <div className="flex flex-col md:flex-row w-full justify-center items-center gap-12">
              {singleProduct.asa.product.image && (
                <Image
                  src={singleProduct.asa.product.image}
                  width={500}
                  height={500}
                  alt="imagem"
                  className="md:w-96 md:h-72 w-full h-56 rounded-lg"
                />
              )
              }
              <div className="w-full md:w-2/3 flex flex-col justify-center md:justify-start gap-5 lg:gap-12">
                <div className="flex flex-col gap-4">
                  <h1 className="font-bunken font-bold text-center md:text-start text-[#192355] text-lg lg:text-xl">
                    {singleProduct.asa.product.title}
                  </h1>
                </div>
                <span className="font-goldplay text-center md:text-start text-[#192355] text-2xl">
                  R$ {singleProduct.asa.product.price}
                </span>
                <div className="w-full flex items-center justify-center md:justify-start">
                  <Link href={'/cart'}>
                  <button className="w-fit hover:bg-[#C6DDED] bg-[#A1CAE3] transition ease-in-out delay-75 rounded-md text-[#1C275F] px-2 py-1 text-lg" onClick={addToCart}>
                    adicionar ao carrinho
                  </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-1 md:px-0 flex flex-col w-full md:w-10/12 gap-3 md:gap-5 mb-4">
              <h1 className="font-bunken font-bold text-center md:text-start text-[#192355] text-lg lg:text-xl">
                Descrição
              </h1>
              <div className="text-[#192355] text-md font-goldplay mx-4 md:mx-0" dangerouslySetInnerHTML={{__html: singleProduct.asa.product.description}}>
                
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-zinc-400 font-goldplay text-lg">Produto não encontrado</h1>
        )}
      </div>
    </div>
  );
}

