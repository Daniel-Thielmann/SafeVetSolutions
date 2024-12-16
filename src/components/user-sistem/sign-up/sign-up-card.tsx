'use client'

import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import registerAPI from '@/auth/api-register/route';
import Modal from '../modal/modal';
import { Eye, EyeOff } from 'lucide-react';

type SignUpCardProps = {
  openModal: () => void;
};

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
  birth_date:z.string().refine((dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date < today;
  }, {
    message: "A data de nascimento deve ser menor que a data atual.",
  }),
});

const SignUpCard: React.FC<SignUpCardProps> = ({ openModal }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const { handleSubmit, register, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      birth_date: '',
    },
  });



const [showPassword, setShowPassword] = useState(false);

const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try{
      const response = await registerAPI(data.name, data.email, data.password, data.phone, data.cpf, data.birth_date);
      console.log(response);
      if(response.status === 200){
        setSuccess(response.message);
        reset();
      }
      else if(response.status === 422){
        setIsLoading(false);
        setError(response.message);
      }
    }catch(err: any){
      setIsLoading(false);
      console.log(err);
      reset();
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

    const buttons = [
    { text: 'Ir para loja', href: '/store/ebooks'},
    { text: 'Meu perfil', href: '/dashboard/my-profile' },
]; 

  return (
    <div className="flex flex-col justify-center items-center">
      <div className='bg-[#C6DDED] rounded-xl flex flex-col items-center justify-center w-full md:max-w-3/4 lg:max-w-full'>
        <form
          id="form"
          className="font-goldplay grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-6 pt-6  md:px-10 md:pt-10 md:pb-2 md:w-[700px] lg:w-[990px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
              Nome
            </label>
            <input
              className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
              id="name"
              type="text"
              placeholder=""
              {...register('name')}
            />
            <span className='w-full text-red-500 text-md cursor-default'>{errors.name?.message}</span>

          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="cpf">
              CPF
            </label>
            <input
              className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
              id="cpf"
              type="text"
              placeholder=""
              {...register('cpf')}
              
            />
            <span className='text-red-500 cursor-default text-md'>{errors.cpf?.message}</span>

          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
              id="email"
              type="email"
              placeholder=""
              {...register('email')}
            />
            <span className='text-red-500 cursor-default text-md'>{errors.email?.message}</span>

          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="phone">
              Contato
            </label>
            <input
              className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
              id="phone"
              type="text"
              placeholder=""
              {...register('phone')}
            />
            <span className='text-red-500 cursor-default text-md'>{errors.phone?.message}</span>

          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="password">
              Senha
            </label>
            <div className="w-full flex flex-row justify-between shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]">
                <input
                    className="w-4/5 appearance-none    focus:outline-none bg-[#E4EFF6]"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='********'
                    {...register('password')}
                    
                />
                <button
                type="button"
                className=""  
                onClick={toggleShowPassword}
                >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
            </div>

            <span className='text-red-500 text-md cursor-default'>{errors.password?.message}</span>

          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="birth_date">
              Nascimento
            </label>
            <input
              className="w-full shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-[#E4EFF6]"
              id="birth_date"
              type="date"
              placeholder=""
              {...register('birth_date')}
            />
            <span className='text-red-500  cursor-default text-md'>{errors.birth_date?.message}</span>

          </div>
          
          <div className="flex items-center justify-center col-span-1 md:col-span-2">
            <button
              className="bg-[#1C275F] text-white py-2 px-8 sm:px-10 rounded text-sm md:text-xl lg:text-2xl hover:bg-[#3f4d94] transition-all font-goldplay"
              type="submit"
              disabled={isLoading}
            >
              Cadastrar
            </button>
          </div>
        </form>
        {
          (success) ?
          <Modal title='Cadastro realizado' paragraph='Cadastro realizado com sucesso' closeModal={() => setIsModalOpen(false)} buttons={buttons} />
          :
          <span className=' w-3/4 md:w-full text-center pb-8 text-red-500 cursor-default text-md'>{error}</span>
        }
      </div>
    </div>
  );
};

export default SignUpCard;
