'use server';

import axios from "axios";
import { cookies } from "next/headers";

interface Quiz{
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

interface Questions {
    id: number;
    title: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    quiz_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}


interface QuizResponse{
    quiz: Quiz;
    questions: Questions[];
    id: number;
    status: number;
}

const postQuiz = async (id: number): Promise<QuizResponse> => {
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
        const response = await route.post(
            "/user/course/quiz",
            {
                "id": id
            }
        );
        return response.data;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return {
                quiz: {
                    id: 0,
                    title: '',
                    created_at: '',
                    updated_at: '',
                    deleted_at: '',
                },
                questions: [],
                id: 0,
                status: 500,
            } ;
        }
    }
}

export default postQuiz;