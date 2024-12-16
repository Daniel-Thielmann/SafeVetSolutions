"use client"
import { FormValue, formSchema } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function LetsMeet() {
  const [isSubmitSuccessful, setIsSubmitSuccesfull] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  })

  const onSubmit = async (data: FormValue) => {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      setIsSubmitSuccesfull(true)
      reset()
    }
    else {
      setError("House um erro ao enviar o email!")
    }
  }

  return (
    <div id="contact" className="flex flex-col justify-center items-center text-2xl text-[#01465D] bg-[#C6DDED] w-11/12 lg:w-9/12 rounded-xl py-12 mx-auto">
      <div className="w-11/12 lg:w-4/6 mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <Image
            src={"/assets/minipets.png"}
            width={48}
            height={48}
            quality={100}
            alt="Logo"
          />
          <h1 className="font-manilla text-2xl lg:text-3xl">
            Vamos nos Conhecer
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:justify-between flex-wrap gap-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-goldplay">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                className="border border-blue-950 rounded-md px-4 py-2 bg-[#E4EFF6] w-full lg:w-[400px] outline-none"
                {...register("name")}
              />
              <div className="text-red-500 mt-1">{errors.name?.message}</div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-goldplay">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="border border-[#1C275F] rounded-md px-4 py-2 bg-[#E4EFF6] w-full lg:w-[400px] outline-none"
                {...register("email")}
              />
              <div className="text-red-500 mt-1">{errors.email?.message}</div>
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="message" className="block mb-1 font-goldplay">
              Mensagem:
            </label>
            <textarea
              id="message"
              rows={8}
              className="border border-[#1C275F] h-[200px] rounded-md px-10 py-2 w-full resize-none bg-[#E4EFF6] outline-none"
              {...register("message")}
            />
            <div className="text-red-500 mt-1">{errors.message?.message}</div>
          </div>
          <div className="mb-8 flex w-full justify-end">
            <button type="submit" className="lg:w-fit w-full">
              <h1 className="text-white bg-[#1C275F] px-8 py-4 font-goldplay rounded-xl text-2xl hover:bg-[#3f4d94] transition-all">
                Enviar
              </h1>
            </button>
          </div>
        </form>
        {isSubmitSuccessful && <span className="flex justify-center text-green-500 bg-[#1C275F] px-8 py-2 font-manilla rounded-xl text-2xl">Email enviado com sucesso!</span>}
        {error && <span className="flex justify-center text-red-500 bg-[#1C275F] px-8 py-2 font-manilla rounded-xl text-2xl">Erro ao enviar o email!</span>}
      </div>
    </div>
  );
}
