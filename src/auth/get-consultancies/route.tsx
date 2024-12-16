'use server';
import axios from "axios";
import { cookies } from "next/headers";

interface Consultancy{
    id: number;
    product: {
      id: number;
      image: string;
      title: string;
      description: string;
      price: string;
    };
}


interface ConsultanciesResponse{
    consultancies: Consultancy[];
    totalPages: number;
    status: number;
}


const getConsultancies = async (page: number): Promise<ConsultanciesResponse> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        params:{
             page : page
        },
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        }
    });

    try{
        const response = await route.get("/user/purchases/consultancies");
        return response.data;
    } catch(err: any){
        if(err.response){
            return {consultancies: [], totalPages: 0, status: err.response.status};
        } else{
            return {consultancies: [], totalPages: 0, status: 500};
        }
    }
}

export default getConsultancies;