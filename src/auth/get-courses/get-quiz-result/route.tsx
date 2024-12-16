'use server';

import axios from "axios";
import { cookies } from "next/headers";

type QuizResponse = {
    quizResult: number,
    status: number,
    isCompleted: number,
}

const getQuizResult = async (id: number): Promise<QuizResponse> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        },
        params: {
            id: id,
        }
    });

    try{
        const response = await route.get("/user/course/quiz/result");
        return response.data;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return {
                quizResult: 1000,
                status: 500,
                isCompleted: 1000
            } ;
        }
    }
}

export default getQuizResult;