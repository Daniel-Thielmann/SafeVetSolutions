'use server'

import getTheOrder from "@/auth/get-orders/get-the-order";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import SingleOrderView from "@/components/purchases-made/single-order-view"
import Link from "next/link";

async function checkAuthentication() {
    try {
        const authStatus = await isAuthenticated();
        return authStatus
      } catch (error) {
        console.error('Failed to check authentication', error);
    }
}

async function getOrder(id: number) {
    try {
        const orders = await getTheOrder(id);
        return orders
    } catch (error) {
        console.error('Fail to get order', error)
    }
}


export default async function singleOrderPage({ params }: { params: { id: string } }) {

    const id  = parseInt(params.id, 10);
    const authentication = await checkAuthentication();
    const order = await getOrder(id);

    return (
        <div>        
            {authentication === "Authenticated." ? (
                <div className="bg-[#F2F7FB] flex flex-col gap-12 items-center min-h-screen">
                    <div className="w-10/12 flex justify-start">
                        <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
                            Informações da compra
                        </h1>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <SingleOrderView products={order?.products} total_price={order?.order.total_price} active={order?.order.active} sold={order?.order.sold} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[#1C275F] text-xl lg:text-3xl mt-16 mb-10">É necessário estar logado para acessar essa página</h1>
                    <Link href={"/login"}>
                        <button className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full">Ir para página de login</button>
                    </Link>
                </div>
            )}
        </div>
    )
}