import getItems from "@/auth/api-dashboard/route";
import isAuthenticated from "@/auth/isAuthenticated/isAuthenticated";
import DashboardCard from "@/components/user-sistem/dashboard/dashboard";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";

const ApiResponseSchema = z.object({
  dashboard: z.object({
    asa: z.boolean(),
    courses: z.boolean(),
    consultancies: z.boolean(),
    manuals: z.boolean(),
    ebooks: z.boolean(),
    certificates: z.boolean(),
    purchases: z.boolean(),
  }),
  status: z.number(),
});

async function getDashboard() {
  try {
    const response = await getItems();

    const parsedResponse = ApiResponseSchema.safeParse(response);

    if (!parsedResponse.success) {
      console.error("Failed to fetch data");

      return null;
    }

    return parsedResponse.data;
  } catch (e) {
    console.error("Failed to fetch data", e);

    return null;
  }
}

export default async function LoginPage() {
  const data = await getDashboard();
  const authentication = await isAuthenticated();

  return (
    <div>
      {authentication === "Authenticated." ? (
        <main className="mb-10">
          <div className="flex flex-row justify-center items-center space-y-2">
            <h1
              className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl"
              style={{ fontFamily: "var(--font-bunken)" }}
            >
              Safe
            </h1>
            <h1
              className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl"
              style={{ fontFamily: "var(--font-manilla)" }}
            >
              Vet
            </h1>
          </div>
          <h2
            className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl mb-10"
            style={{ fontFamily: "var(--font-bunken)" }}
          >
            Dashboard
          </h2>
          <Suspense fallback={<div className="flex justify-center items-center text-3xl">Carregando...</div>}>
            <DashboardCard dashboard={data} />
          </Suspense>
        </main>) : (
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
