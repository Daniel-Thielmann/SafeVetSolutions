'use server';
import axios from "axios";
import { cookies } from "next/headers";

interface QuestionaryResponse {
    quiz: {
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
    };
    questions: {
        id: number;
        orientation: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
        deleted_at: string | null;
        topic_id: number;
        created_at: string;
        updated_at: string;
    }[];
    status: number;
}
export default async function getQuestionary(): Promise<QuestionaryResponse> {
    const token = cookies().get('token');
    if (!token) {
        throw new Error("Token não encontrado");
    }
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.value}`,
        },
    });

    try {
        const response = await route.get<QuestionaryResponse>("user/asa/quiz");
        return response.data;
    } catch (err: any) {
        if (err.response) {
           return {
                quiz: { id: 0, title: "", created_at: "", updated_at: "" },
                questions: [],
                status: err.response.status,
            };
        } else {
            return {
                quiz: { id: 0, title: "", created_at: "", updated_at: "" },
                questions: [],
                status: 500,
            };
        }
    }
};