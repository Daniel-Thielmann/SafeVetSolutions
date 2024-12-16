'use server';

import axios from "axios";
import { cookies } from "next/headers";

interface Course{
    id: number;
    link_playlist: "",
    quiz_id: number;
    created_at: "",
    updated_at: "",
    deleted_at: "",
    product: {
      id: number;
      title: "",
      image: "",
      description: "",
      price: "",
      productable_type: "",
      productable_id: number;
      created_at: "",
      updated_at: "",
    };
}

interface CourseResponse{
    course: Course;
    status: number;
}

const getTheCourse = async (id: number): Promise<CourseResponse> => {
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
        const response = await route.get(`/shop/courses/${id}`);
        return response.data;
    } catch(err: any){
        if(err.response){
            return {
                course: {
                    id: 0,
                    link_playlist: "",
                    quiz_id: 0,
                    created_at: "",
                    updated_at: "",
                    deleted_at: "",
                    product: {
                        id: 0,
                        title: "",
                        image: "",
                        description: "",
                        price: "",
                        productable_type: "",
                        productable_id: 0,
                        created_at: "",
                        updated_at: "",
                    },
                },
                status: err.response.status
            };
        } else{
            return {
                course: {
                    id: 0,
                    link_playlist: "",
                    quiz_id: 0,
                    created_at: "",
                    updated_at: "",
                    deleted_at: "",
                    product: {
                        id: 0,
                        title: "",
                        image: "",
                        description: "",
                        price: "",
                        productable_type: "",
                        productable_id: 0,
                        created_at: "",
                        updated_at: "",
                    },
                },
                status: 500
            };
        }
    }
}

export default getTheCourse;