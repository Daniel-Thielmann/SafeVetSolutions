import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getUser from '@/auth/get-info-user/route';

type User = {
    id: number;
    name: string,
    phone: string,
    email: string,
    cpf: string,
    birth_date: string,
}

type UserSchema = {
    user: User,
    status: number
}

type MyProfileCardProps = {
    openModal: () => void;
};

export default async function MyProfileCard({ data }: { data: UserSchema }) {


    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-[#C6DDED] rounded-xl w-11/12 sm:w-full md:w-[750px]'>
                <form className="font-goldplay grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-10">
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            Nome
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue={data.user.name}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            CPF
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue={data.user.cpf}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            Email
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue={data.user.email}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            Contato
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue={data.user.phone}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            Senha
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue="************"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                            Nascimento
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            type="text"
                            defaultValue={data.user.birth_date}
                            required
                        />
                    </div>


                </form>

                <div className="flex items-center justify-end justify-center md:justify-end px-6 md:px-10 mb-8">
                    <Link href="/dashboard/my-profile/edit">
                        <button
                            className="bg-[#1C275F] text-white py-2 px-12 rounded text-sm md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
                            type="button">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

