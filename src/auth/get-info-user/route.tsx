'use server';

import axios from "axios";
import { cookies } from "next/headers";

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

const getUser = async (): Promise<UserSchema> => {
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
        const response = await route.get("/user");
        return response.data;
    } catch(err: any){
        
            return err.response ;
        
    }
}

export default getUser;