'use server';

import axios from "axios";
import { cookies } from "next/headers";


const getTries = async (): Promise<string | string[]> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        },
    });

    try{
        const response = await route.get("/user/asa/quiz/tries");
        if (response.data.status === 200)
            return response.data.dates;
        else if (response.data.status === 401)
            return "Token de autenticação inválido ou expirado"
        else if (response.data.status === 404)
            return "O diagnóstico ainda não foi respondido."
        else
            return "Erro inesperado"
    } catch(err: any){
        if (err.response) {
            return "Erro ao fazer a requisição";
        } else {
            return [];
        }
    }
}

export default getTries;