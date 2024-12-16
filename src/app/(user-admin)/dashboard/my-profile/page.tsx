
import MyProfileCard from "@/components/user-sistem/my-profile/my-profile";
import Link from "next/link";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import getUser from "@/auth/get-info-user/route";
import LogoutButtom from "@/components/logoutButtom";

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

export default async function MyProfile() {
    const authentication = await checkAuthentication();

    const buttons = [
    { text: 'Ir para loja'},
    { text: 'Meu perfil', href: '/my-profile' },
];

    const data = await getInfoUser();
    console.log(data)
    return (
        <div>        
            {authentication === "Authenticated." ? (
                <main className="relative bg-[#F2F7FB] fonts-class min-h-screen overflow-hidden">
                    
                    <h2 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl mb-10" style={{ fontFamily: "var(--font-bunken)" }}>
                        Meu perfil
                    </h2>
                    <div className="flex items-center justify-center">
                        {
                            data ?
                            <MyProfileCard data={data}/>
                            :
                            <h1>Nao ha dados </h1>
                        }
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
