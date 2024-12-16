'use client'

import postAnswersQuiz from "@/auth/get-courses/get-quiz/post-quiz/postquiz";
import Link from "next/link";
import Modal from "../user-sistem/modal/modal";
import { useState } from "react";

type Questions = {
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

type QuizProps = {
    questions: Questions[] | undefined;
    id: number;
}

async function Quiz(id: number, answers: string[]) {
    try {
        const data = postAnswersQuiz(id, answers);
        return data
    } catch (error) {
        console.error('Fail to post', error)
    }
}

export default function QuizForm({ questions, id }: QuizProps) {
    const buttons = [{ text: "Voltar ao curso", href: `/dashboard/courses/${id}` }];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
    const [points, setPoints] = useState<number | null>(0);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userAnswers: string[] = [];

        questions?.forEach((_, index: number) => {
            const answer = formData.get(`options-${index}`);
            userAnswers.push(answer as string);
        });

        console.log(userAnswers)

        const result = await Quiz(id, userAnswers)
        setIsCompleted(result?.is_completed ?? null);
        setPoints(result?.points ?? null)
        console.log(result);

    };

    const acertos = points
    const modalTitle = isCompleted === null
        ? "Envie suas respostas"
        : isCompleted
            ? `Parabéns! Você acertou a quantidade necessária. Sua pontuação: ${acertos}`
            : `Você não atingiu a quantidade mínima necessária. Sua pontuação: ${acertos}`;

    return (
        <div className="flex justify-center items-center">
            {isModalOpen && (
                <Modal
                    title="Resultado do questionario"
                    paragraph={modalTitle}
                    buttons={buttons}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
            <form className="flex flex-col items-center w-10/12" onSubmit={handleSubmit}>
                {questions?.map((question, index) => (
                    <div key={index} className=" mb-10 flex flex-col w-11/12">
                        <h3 className="text-[#1C275F] font-bunken">{question.title}</h3>
                        <div className="flex flex-row justify-between">
                            <label className="flex items-center p-2 my-3 bg-white rounded border w-5/12 font-goldplay">
                                <input type="radio" name={`options-${index}`} value="option_a" className="mr-2" />
                                {question.option_a}
                            </label>
                            <label className="flex items-center p-2 my-3 bg-white rounded border w-5/12 font-goldplay">
                                <input type="radio" name={`options-${index}`} value="option_b" className="mr-2" />
                                {question.option_b}
                            </label>
                        </div>
                        <div className="flex flex-row justify-between">
                            <label className="flex items-center p-2 bg-white rounded border w-5/12 font-goldplay">
                                <input type="radio" name={`options-${index}`} value="option_c" className="mr-2" />
                                {question.option_c}
                            </label>
                            <label className="flex items-center p-2 bg-white rounded border w-5/12 font-goldplay">
                                <input type="radio" name={`options-${index}`} value="option_d" className="mr-2" />
                                {question.option_d}
                            </label>
                        </div>
                    </div>
                ))}
                <div className="flex flex-row gap-3 w-11/12 justify-end">
                    <Link href={`/dashboard/courses/${id}`} className="px-4 py-2 rounded-lg border border-[#1C275F] text-[#1C275F] hover:bg-[#f0f4ff] transition font-goldplay">
                        Sair
                    </Link>
                    <button type="submit" className="px-6 py-2 bg-[#1C275F] text-white rounded-lg hover:bg-[#111945] transition font-goldplay" onClick={() => setIsModalOpen(true)}>
                        Enviar
                    </button>

                </div>
            </form>
        </div>
    )
}