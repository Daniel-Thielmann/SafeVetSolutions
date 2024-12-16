'use server'

import getUserOrders from "@/auth/get-orders/get-orders";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import OrderCard from "@/components/orders/card";
import Pagination from "@/components/pagination/pagination";
import Title from "@/components/title/title";
import Link from "next/link";


async function checkAuthentication() {
    try {
        const authStatus = await isAuthenticated();
        return authStatus
      } catch (error) {
        console.error('Failed to check authentication', error);
    }
}

async function getOrders(currentPage: number) {
    try {
        const orders = await getUserOrders(currentPage);
        return orders
    } catch (error) {
        console.error('Fail to get orders', error)
    }
}

export default async function PurchasesMade ({searchParams}:{searchParams:{page?:string}}) {
    const currentPage = Number(searchParams.page) || 1
    const authentication = await checkAuthentication();
    const orders = await getOrders(currentPage);

    console.log(orders)

    return (
        <div>        
            {authentication === "Authenticated." ? (
                <div className=" flex flex-col">
                    <div className="w-full">
                        <Title title="Compras realizadas" />
                        
                        <div className="flex flex-col mt-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-11/12 lg:w-10/12 mx-auto gap-3">
                            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center w-full">
                                {orders?.orders.map((item, index) => (
                                    <OrderCard title={`Compra ${index+1}`} sold={item.sold} active={item.active} id={item.id} key={index} />
                                ))}
                            </div>
                            {
                                orders?.orders && orders.totalPages > 1 &&
                                <Pagination totalPages={orders?.totalPages} />
                            }
                        </div>
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