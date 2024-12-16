'use server';
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";



interface ApiResponse{
    dashboard: {
        asa: boolean;
        courses: boolean;
        consultancies: boolean;
        manuals: boolean;
        ebooks: boolean;
        certificates: boolean;
        purchases: boolean,
    };
    status: number;
}


const getItems = async (): Promise<ApiResponse> => {
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
        const response = await route.get("/user/purchases");
        return response.data;
    } catch(err: any){
        if(err.response){
            return {dashboard: err , status: err.response.status};
        } else{
            return {dashboard: err, status: 500};
        }
    }
}

export default getItems;