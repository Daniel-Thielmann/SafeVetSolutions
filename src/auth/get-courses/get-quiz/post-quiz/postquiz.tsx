'use server';

import axios from "axios";
import { cookies } from "next/headers";

type postSchema = {
    points: number,
    is_completed: boolean,
    status: number,
    message?: string
  }

const postAnswersQuiz = async (id: number, answers: string[]): Promise<postSchema> => {
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
            "/user/course/quiz/result",
            {
                "id": id,
                "responses": answers
            }
        );
        return response.data;
    } catch(err: any){
        
            return err.response ;
        
    }
}

export default postAnswersQuiz;