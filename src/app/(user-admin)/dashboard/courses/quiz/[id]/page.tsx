'use server'

import postQuiz from "@/auth/get-courses/get-quiz/route";
import QuizForm from "@/components/courses/quiz-form";

async function Quiz(id: number) {
    try {
        const quiz = await postQuiz(id);
        return quiz
    } catch (error) {
        console.error('Fail to get quiz', error)
    }
}


export default async function quizPage ({ params }: { params: { id: string } }) {

    const id  = parseInt(params.id, 10);
    
    const quiz = await Quiz(id);

    return (
        <div className="flex flex-col w-full items-center min-h-screen">
            <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal uppercase">Questionário</h1>
            <div className="flex flex-col items-center mt-8 pt-10 mb-16 bg-[#C6DDED] w-10/12 xl:w-[1000px] rounded-lg py-4">
                <QuizForm questions={quiz?.questions} id={id} />
            </div>
        </div>
    )
}

