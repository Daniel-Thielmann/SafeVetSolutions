'use client'

import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import ProductsCard from "@/components/cart-components/products-card";
import SummaryCard from "@/components/cart-components/summary-card";
import { CartContext, CartItem } from "@/context/cart";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";


export default function Cart() {

  const cartContext = useContext(CartContext);
  const [authentication, setAuthentication] = useState<string | null> ("Authenticated.")

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authStatus = await isAuthenticated();
        if (authStatus !== authentication) {
          setAuthentication(authStatus);
        }
      } catch (error) {
        console.error('Failed to check authentication', error);
        setAuthentication(null);
    }
  };

    checkAuthentication()
  }, [])

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }

    const { count, cartItems } = cartContext;

    const cardItemCount = count();

  return (

    <div>        
        <div className="w-full space-y-6 min-h-screen pb-10">
          <h1 className="uppercase text-[#1C275F] bg-[#C6DDED] pr-3 py-2 pl-6 sm:pl-16 md:pl-32 font-manilla text-2xl lg:text-3xl w-fit">
            Carrinho
          </h1>
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-center lg:flex-row lg:w-11/12 gap-10">
              {cartItems && cartItems.length > 0 ? (
                <div className="flex flex-col w-10/12 lg:w-4/6 items-center gap-5">
                  {cartItems.map((item: CartItem, index: number) => (
                    <div key={index} className="w-full">
                      <ProductsCard product={item.product} />
                      <div className="w-full h-[1px] bg-gray-300" />
                    </div>
                  ))
                  }
                </div>
              ) : (
                <div className="flex flex-col w-full lg:w-4/6 items-center gap-5 pt-12">
                  <Link href={"/store/ebooks"}>
                      <button className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full">Adicionar produtos</button>
                  </Link>
                </div>
              )}
              <div className="w-11/12 mx-auto lg:w-2/6">
                <SummaryCard />
              </div>
            </div>
          </div>
        </div>
  </div>
  )
}