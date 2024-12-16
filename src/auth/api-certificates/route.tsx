'use server';
import axios from "axios";
import { cookies } from "next/headers";


interface Certificate{
    id: number;
    title: string;
    file: string;
    course_id: number;
    adm_id: number,
    user_id: number,
    created_at: string,
    updated_at: string
}

interface ApiResponse{
    certificates: Certificate[];
    status: number;
    totalPages: number
}


const getCertificate = async ( currentPage : number): Promise<ApiResponse> => {
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
        }
    });

    try{
        const response = await route.get("/user/certificates");
        return response.data;
    } catch(err: any){
        if(err.response){
            return {certificates: err , totalPages: err, status: err.response.status};
        } else{
            return {certificates: err, totalPages: err, status: 500};
        }
    }
}

export default getCertificate;