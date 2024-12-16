'use server';
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface Manual{
    id: number;
    file: string
    product: {
      id: number;
      image: string;
      title: string;
      description: string;
      price: string;
    };
}


interface ManualResponse{
    manuals: Manual[];
    totalPages: number;
    status: number;
}


const getManuals = async (currentPage: number): Promise<ManualResponse> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        params: {
            page: currentPage,
        },
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        },
    });

    try{
        const response = await route.get("/user/purchases/manuals");
        console.log("response", response.data)
        return response.data;
    } catch(err: any){
        if(err.response){
            return {manuals: [], totalPages: 0, status: err.response.status};
        } else{
            return {manuals: [], totalPages: 0, status: 500};
        }
    }
}

export default getManuals;