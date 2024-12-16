'use client'
import { useEffect, useState } from "react";

export default function CompanyCard() {
    const [companyName1, setCompanyName1] = useState('');
    const [companyName2, setCompanyName2] = useState('');
    const [companyName3, setCompanyName3] = useState('');

    const isClient = typeof window !== 'undefined';

    useEffect(() => {
        if (isClient) {
            const savedName1 = localStorage.getItem('companyName1');
            const savedName2 = localStorage.getItem('companyName2');
            const savedName3 = localStorage.getItem('companyName3');
            
            if (savedName1) setCompanyName1(savedName1);
            if (savedName2) setCompanyName2(savedName2);
            if (savedName3) setCompanyName3(savedName3);
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('companyName1', companyName1);
        }
    }, [companyName1]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('companyName2', companyName2);
        }
    }, [companyName2]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('companyName3', companyName3);
        }
    }, [companyName3]);

    return (
        <div className="md:ml-16 space-y-8 text-sm flex flex-col justify-center items-center md:text-md lg:text-xl xl:text-2xl w-3/4 text-start">
            <h1 className="font-bunken text-lg text-start w-full">Empresa</h1>
            <div className="w-full flex flex-col items-center text-start justify-center">
                <h1 className="font-goldplay w-full pl-2 mb-2 ">Nome da Empresa</h1>
                <input
                    type="text"
                    placeholder="Nome"
                    value={companyName1}
                    onChange={(e) => setCompanyName1(e.target.value)}
                    className="font-goldplay w-full py-1 pl-6 pr-26 border border-blue-300 rounded-lg bg-[#E4EFF6] outline-0"
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="font-goldplay mb-2 w-full pl-2 ">CNPJ</h1>
                <input
                    type="text"
                    placeholder="CNPJ"
                    value={companyName2}
                    onChange={(e) => setCompanyName2(e.target.value)}
                    className="font-goldplay w-full py-1 pl-6 pr-26 border border-blue-300 rounded-lg bg-[#E4EFF6] outline-0"
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="font-goldplay mb-2 w-full pl-2 ">Profissão do Usuário</h1>
                <input
                    type="text"
                    placeholder="Profissão"
                    value={companyName3}
                    onChange={(e) => setCompanyName3(e.target.value)}
                    className="font-goldplay w-full py-1 pl-6 border pr-26 border-blue-300 rounded-lg bg-[#E4EFF6] outline-0"
                />
            </div>
        </div>
    );
}
