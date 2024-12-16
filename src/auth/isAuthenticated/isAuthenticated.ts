'use server';

import axios from "axios";
import { cookies } from "next/headers";

const isAuthenticated = async (): Promise<string> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        }
    });

    try{
        const response = await route.get("/isAuthenticated");
        return response.data.message;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return "Erro inesperado" ;
        }
    }
}

export default isAuthenticated;