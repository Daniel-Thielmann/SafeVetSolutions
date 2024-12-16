'use server';
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface Courses{
    id: number;
    link_playlist: string;
    quiz_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    product: {
      id: number;
      title: string;
      image: string;
      description: string;
      price: string;
      productable_type: string;
      productable_id: number;
      created_at: string;
      updated_at: string;
    };
}


interface EbooksResponse{
    courses: Courses[];
    totalPages: number;
    status: number;
}


const getCourses = async (currentPage: number): Promise<EbooksResponse> => {
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
        const response = await route.get("/user/purchases/courses");
        return response.data;
    } catch(err: any){
        if(err.response){
            return {courses: [], totalPages: 0, status: err.response.status};
        } else{
            return {courses: [], totalPages: 0, status: 500};
        }
    }
}

export default getCourses;