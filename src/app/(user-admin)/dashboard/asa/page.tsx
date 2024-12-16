'use server'

import getTries from "@/auth/api-asa/get-asa-tries/route";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import AsaSistemCard from "@/components/asa/sistem";
import Link from "next/link";

async function checkAuthentication() {
    try {
      const authStatus = await isAuthenticated();
      if (authStatus !== "Authenticated") {
        return authStatus;
      }
    } catch (error) {
      console.error('Failed to check authentication', error);
      return null;
    }
  }

async function AsaTries() {
    try {
        const tries = await getTries();
        return tries;
    } catch (error) {
        console.error('Fail to get asa tries', error)
    }
}

export default async function AsaSistemPage() {

    const authentication = await checkAuthentication();
    const tries = await AsaTries();

    console.log(tries)

    return (

        <div>        
            {authentication === "Authenticated." ? (
                <main className=" bg-[#F2F7FB] ">
                    <div className="flex justify-center flex-col items-center">
                        <h1 className="text-[#1C275F] text-3xl lg:text-4xl font-bunken">
                            Sistema ASA
                        </h1>
                        <div className="mt-12 w-4/5 sm:w-3/5 bg-[#C6DDED] mb-8 p-8 rounded-xl">
                            <AsaSistemCard response={tries || "Registros não encontrados"} />
                        </div>
                        <div className="w-4/5 sm:w-3/5 flex justify-end">
                            <Link href="/dashboard/asa/diagnosis" className="flex justify-center w-[200px] sm:w-[250px] py-4 bg-[#1C275F] rounded-xl text-white text-sm sm:text-xl font-bunken mt-4">
                                <img src="/assets/menu_book.png" className="mr-2" />
                                <button className="flex justify-center items-center">
                                    Formulário
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[#1C275F] text-xl lg:text-3xl mt-16 mb-10">É necessário estar logado para acessar essa página</h1>
                    <Link href={"/login"}>
                        <button className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full">Ir para página de login</button>
                    </Link>
                </div>
            )}
        </div>


        
    );
}
