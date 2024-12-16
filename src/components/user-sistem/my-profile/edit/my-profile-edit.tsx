'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '../../modal/modal'; // Importando o componente modal localmente
import { z } from 'zod';
import { getToken } from '@/auth/get-users-infos/get-token';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import updateAPI from '@/auth/api-update/route';
import { Eye, EyeOff } from 'lucide-react';

type MyProfileCardEditProps = {
    openModal: () => void;
};

const NoUserData = {
    id: 0,
    name: "Não há dados",
    email: "Não há dados",
    phone: "Não há dados",
    cpf: "Não há dados",
    birth_date: "Não há dados",
}

type MyProfileCardProps = {
    openModal: () => void;
};

const UserScheme = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    cpf: z.string(),
    birth_date: z.string(),
});

type usertype = z.infer<typeof UserScheme>;

const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const formSchema = z.object({
    name: z.string().min(1, { message: "O campo nome é obrigatório." }),
    cpf: z.string().regex(cpfRegex, {
        message: "CPF inválido. O formato deve ser xxx.xxx.xxx-xx.",
    }),
    email: z.string().email({ message: "Por favor insira um email válido." }),
    phone: z.string().regex(phoneRegex, {
        message: "Telefone inválido. O formato deve ser (xx) xxxxx-xxxx.",
    }),
    password: z.string().min(8, { message: "O campo senha precisa ter no mínimo 8 caracteres." }),
    birth_date: z.string().refine((dateStr) => {

        const [day, month, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();

        date.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    

        return date < today;
    }, {
        message: "A data de nascimento deve ser menor que a data atual.",
    }),
});

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

export default function MyProfileEditCard({ data }: { data: UserSchema }) {
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSave = () => {
        setIsModalOpen(true);
    };

    const buttons = [
        { text: 'Ir para loja', href: '/store' },
        { text: 'Meu perfil', href: '/dashboard/my-profile' },
    ];

    const [info, setInfo] = useState<usertype>(NoUserData);
    const [error, setError] = useState<string | undefined>(undefined);


    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const { password, ...restData } = data;
            const response = await updateAPI(restData.name, restData.email, password || undefined, restData.phone, restData.cpf, restData.birth_date);
            console.log(response);

            if (response.status === 200) {
                setSuccess(response.message || "Usuário atualizado com sucesso!");
                handleSave();
            } else {
                setError(response.message);
            }
        } catch (err: any) {
            console.log(err);
            setError("Erro inesperado.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-[#C6DDED] rounded-xl w-11/12 sm:full lg:w-[850px]'>
                <form onSubmit={handleSubmit(onSubmit)} className="font-goldplay">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-14'>
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                Nome
                            </label>
                            <input
                                className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                                type="text"
                                defaultValue={data.user.name}
                                {...register('name')}
                                required
                            />
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.name?.message}</span>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                CPF
                            </label>
                            <input
                                className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                                type="text"
                                defaultValue={data.user.cpf}
                                {...register('cpf')}
                                required
                            />
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.cpf?.message}</span>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                Email
                            </label>
                            <input
                                className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                                type="text"
                                defaultValue={data.user.email}
                                {...register('email')}
                                required
                            />
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.email?.message}</span>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                Contato
                            </label>
                            <input
                                className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                                type="text"
                                defaultValue={data.user.phone}
                                {...register('phone')}
                                required
                            />
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.phone?.message}</span>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                Senha
                            </label>
                            <div className="w-full flex flex-row justify-between shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]">
                                <input
                                    className="w-4/5 appearance-none    focus:outline-none bg-[#E4EFF6]"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    {...register('password')}
                                    required
                                />
                                <button
                                    type="button"
                                    className=""
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </button>
                            </div>
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.password?.message}</span>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm md:text-lg mb-1 md:mb-2">
                                Nascimento
                            </label>
                            <input
                                className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                                type="text"
                                defaultValue={data.user.birth_date}
                                {...register('birth_date')}
                                required
                            />
                            <span className='w-full text-red-500 text-md cursor-default'>{errors.birth_date?.message}</span>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className="flex md:items-center flex-col md:flex-row my-8 gap-3">
                            <Link href="/dashboard/my-profile">
                                <button
                                    className="bg-[#C6DDED] text-[#1C275F] py-2 px-8 sm:px-10 rounded text-sm md:text-xl lg:text-2xl hover:bg-gray-300 transition-all font-goldplay"
                                    type="button">
                                    Cancelar
                                </button>
                            </Link>
                            <button
                                className="bg-[#1C275F] text-white py-2 px-8 sm:px-10 rounded text-sm md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
                                type="submit"
                                disabled={isLoading} // Desabilita o botão enquanto está carregando
                            >
                                {isLoading ? 'Salvando...' : 'Salvar'} {/* Exibe "Salvando..." durante o carregamento */}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* Renderizando o modal apenas se isModalOpen for true */}
            {isModalOpen && (
                <Modal
                    title="Salvo com sucesso!"
                    paragraph="As alterações foram salvas com sucesso."
                    closeModal={() => setIsModalOpen(false)} // Função para fechar o modal
                    buttons={buttons}
                />
            )}
        </div>
    );
}

