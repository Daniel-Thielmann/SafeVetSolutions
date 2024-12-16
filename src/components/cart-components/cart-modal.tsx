import { X } from "lucide-react";
import Link from "next/link";

export default function CartModal () {
    return (
        <div className="border-2 border-[#1C275F] rounded-2xl bg-[#E4EFF6] w-11/12 md:w-1/2 lg:w-1/3 h-1/2 flex flex-col items-center p-10">
            <div className="flex w-full justify-end cursor-pointer">
                <X />
            </div>
            <div className="flex flex-col items-center justify-center w-9/12 gap-8 text-center">
                <h1 className="uppercase text-xl font-bunken text-[#1C275F]">Oops...</h1>
                <p className="text-lg font-goldplay text-[#1C275F]">
                    Parece que você não está conectado na sua conta
                </p>
                <div className="flex gap-10">
                    <Link
                        href={'/'}
                    >
                        <button className="font-goldplay text-white text-lg bg-[#1C275F] rounded-md p-2">
                            cadastrar
                        </button>
                    </Link>
                    <Link
                        href={'/'}
                    >
                        <button className="font-goldplay text-white text-lg bg-[#1C275F] rounded-md p-2">
                            entrar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}