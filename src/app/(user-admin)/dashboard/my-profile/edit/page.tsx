

import Modal from "@/components/user-sistem/modal/modal";
import MyProfileEditCard from "@/components/user-sistem/my-profile/edit/my-profile-edit";
import Link from "next/link";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import getUser from "@/auth/get-info-user/route";

async function getInfoUser() {
    try {
      const response = await getUser();
  
      return response;
    } catch (e) {
      console.error("Failed to fetch data", e);
  
      return null;
    }
  }

  async function checkAuthentication() {
    try {
        const authStatus = await isAuthenticated();
        return authStatus
      } catch (error) {
        console.error('Failed to check authentication', error);
    }
}


export default async function MyProfileEdit() {
    const authentication = await checkAuthentication();
    const data = await getInfoUser();
    console.log(data?.user)
   // let isModalOpen = false

   /* async function openModal(){
        isModalOpen = true
    }*/

    const buttons = [
    { text: 'Ir para loja', href: '/store'},
    { text: 'Meu perfil', href: '/dashboard/my-profile' },
];

    return (
        <div>        
            {/*{authentication === "Authenticated." ? (*/}
                <main className="relative bg-[#F2F7FB] fonts-class min-h-screen overflow-hidden">
                    {/*{isModalOpen && <Modal title="Editar meu Perfil" paragraph="A edição do seu perfil foi um sucesso" closeModal={() => openModal} buttons={buttons}/>}*/}
                    <h2 className="flex items-center text-center justify-center text-[#1C275F] text-3xl lg:text-5xl mb-10 mt-6" style={{ fontFamily: "var(--font-bunken)" }}>
                        Meu perfil / Editar
                    </h2>
                    <div className="flex items-center justify-center">
                        {
                            data?.user ?
                            <MyProfileEditCard  data={data}/>
                            :
                            <h1>Nada encontrado</h1>
                        }
                    </div>
                    
                </main>
           {/*} ) : (*/}
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[#1C275F] text-xl lg:text-3xl mt-16 mb-10">É necessário estar logado para acessar essa página</h1>
                    <Link href={"/login"}>
                        <button className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full">Ir para página de login</button>
                    </Link>
                </div>
           {/*} )}*/}
        </div>
    );
}
