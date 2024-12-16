'use server'

import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

interface UpdateResponse {
  message?: string;
  status: number;
}

const updateAPI = async (
  name: string,
  email: string,
  password: string | undefined,
  phone: string,
  cpf: string,
  birth_date: string
): Promise<UpdateResponse> => {
  const token = cookies().get("token")?.value; // Mova a obtenção do token para dentro da função
  if (!token) {
    return { message: "Token não encontrado.", status: 401 };
  }

  const route = axios.create({
    baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
    },
  });

  try {
    const data: Record<string, string> = { name, email, phone, cpf, birth_date };

    // Adicionar a senha apenas se ela for fornecida
    if (password) {
      data.password = password;
    }

    const response: AxiosResponse<UpdateResponse> = await route.put("/user", data);
    return { message: response.data.message, status: response.status };
  } catch (err: any) {
    if (err.response) {
      return { message: err.response.data.message, status: err.response.status };
    } else {
      return { message: "Unexpected error occurred.", status: 500 };
    }
  }
};

export default updateAPI;
