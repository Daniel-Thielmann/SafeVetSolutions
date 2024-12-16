'use client'

import { Logout } from "@/auth/logout/logout"
import Link from "next/link"

const handlelogout = async () => {
    const logout = await Logout()
}

export default function LogoutButtom() {
    return (
        <Link href={"/"}>
            <button
                className="bg-[#1C275F] text-white py-2 px-12 rounded md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
                type="button"
                onClick={handlelogout}
            >
                Sair da Conta
            </button>
        </Link>
    )
}