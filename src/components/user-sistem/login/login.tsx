'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/auth/login/signIn';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
    email: z.string().email({
        message: "Por favor insira um email válido"
    }),
    password: z.string().min(8, {
        message: "Senha deve ter pelo menos 8 caracteres"
    })
})

const LoginCard: React.FC = () => {

    const route = useRouter()

    const [error, setError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { handleSubmit, register, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const response = await signIn(data.email, data.password)
        console.log(response)
        if (response === 200) {
            route.push("/dashboard")
        } else if (response === 205) {
            setIsLoading(false)
            setError("Email ou senha inválidos")
            reset()
        } else {
            setIsLoading(false)
            setError("Erro ao realizar login, tente novamente mais tarde")
            reset()
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-[#C6DDED] rounded-xl p-20 md:max-w-3/4 lg:w-[500px]'>
                <form
                    id='form'
                    className="space-y-6 font-goldplay"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label className="block text-gray-700 text-lg mb-2" htmlFor={"email"}>
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border border-blue-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
                            id={"email"}
                            placeholder={"Digite seu email"}
                            {...register("email")}
                        />
                        <span className='text-red-500'>
                            {errors.email?.message}
                        </span>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg mb-2" htmlFor={"password"}>
                            Senha
                        </label>

                        <div className="w-full flex flex-row justify-around shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#E4EFF6]">
                            <input
                                className="w-5/6 bg-[#E4EFF6] appearance-none leading-tight focus:outline-none "
                                id={"password"}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={"Digite sua senha"}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                className=""
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                            </button>
                        </div>
                        <span className='text-red-500'>
                            {errors.password?.message}
                        </span>

                    </div>

                    <div className='mt-8 flex justify-center items-center'>
                        <span className='text-red-500 text-md'>
                            {error}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-4 items-center justify-center mt-6">
                        <div className="">
                            <Link href="https://sistema-safevet-hom.codejr.com.br/resetpassword" className=" mt-4 ">
                                <h1 className="underline text-[#24316e]  hover:text-[#3b4ea1]">Esqueci minha senha.</h1>
                            </Link>
                        </div>
                        <button
                            className="bg-[#1C275F] text-white py-2 px-24 rounded md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
                            type="submit"
                        >
                            Entrar
                        </button>
                    </div>
                </form>



                <div className="flex flex-col space-y-6 items-center justify-center mt-6">

                    <Link href="/sign-up">
                        <button
                            className="bg-[#1C275F] text-white py-2 px-20 rounded md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
                            type="button">
                            Cadastrar
                        </button>
                    </Link>
                </div>


            </div>
        </div>

    );
}





export default LoginCard;
