'use server'

import getQuizResult from "@/auth/get-courses/get-quiz-result/route";

async function QuizResult(id: number) {
    try {
        const quiz = await getQuizResult(id);
        return quiz
    } catch (error) {
        console.error('Fail to get quiz', error)
    }
}

export default async function quizResultPage ({ params }: { params: { id: string } }) {

    const id  = parseInt(params.id, 10);
    const result = await QuizResult(id);

    return (
        <div className="flex flex-col w-full items-center min-h-screen">
            <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal uppercase">Resultado</h1>
            <div className="flex flex-col items-center mt-8 py-10 mb-16 bg-[#C6DDED] w-10/12 sm:w-[500px] rounded-lg">
                Sua pontuação no questionário foi: {result?.quizResult}
            </div>
        </div>
    )
}