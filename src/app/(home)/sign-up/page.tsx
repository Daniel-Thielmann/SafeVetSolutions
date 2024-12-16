'use client'
import Navbar from "@/components/layout/navbar";
import SignUpCard from "@/components/user-sistem/sign-up/sign-up-card";
import { useState } from "react";
import Modal from "@/components/user-sistem/modal/modal";



export default function SignUpPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <main className="bg-[#F2F7FB] fonts-class min-h-screen">
            
            <div className="flex flex-row justify-center items-center space-y-2">
                <h1 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl" style={{ fontFamily: "var(--font-bunken)" }}>
                    Safe
                </h1>
                <h1 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl" style={{ fontFamily: "var(--font-manilla)" }}>
                    Vet
                </h1>
            </div>
            <h2 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl mb-10" style={{ fontFamily: "var(--font-bunken)" }}>
                Cadastro
            </h2>
            <div className="flex items-center justify-center">
                <SignUpCard openModal={openModal} />
            </div>
            {/* <div className="fixed top-0 right-0 w-1/3 md:w-1/6 lg:w-1/5">
                <img src="/assets/upperdetail.png" alt="Upper Detail" className="" />
            </div> */}
        </main>
    );
}
