'use server'

import { cookies } from 'next/headers';
import getInfos from './get-users-info';
import { z } from "zod";

const UserScheme = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    cpf: z.string(),
    birth_date: z.string(),
  });

  const ApiResponseSchema = z.object({
    user: UserScheme,
    status: z.number(),
  });

  type ApiResponse = z.infer<typeof ApiResponseSchema>;

export async function getToken(): Promise<ApiResponse | undefined > {

    const token = cookies().get('token')

    console.log(token, "token")

    try {

        if(token != null) {

            const data: ApiResponse = await getInfos( token?.value);
            
            console.log(data)

            return data;
        }


        console.log("erro ao detectar token")

    } catch (error) {
        console.log("aqui")
        console.error("Error:", error);
    }
}