import getTheCourse from "@/auth/get-courses/get-course/route";
import getQuizResult from "@/auth/get-courses/get-quiz-result/route";
import { Album, BadgeCheck, ClipboardList } from "lucide-react";
import Link from "next/link";


async function getCourse(id: number) {
    try {
        const course = await getTheCourse(id);
        return course
    } catch (error) {
        console.error('Fail to get the course', error)
    }
}

async function QuizResult(id: number) {
    try {
        const quiz = await getQuizResult(id);
        return quiz
    } catch (error) {
        console.error('Fail to get quiz', error)
    }
}


export default async function SingleCourseView({ params }: { params: { id: string } }) {

    const id = parseInt(params.id, 10);
    const course = await getCourse(id);
    const result = await QuizResult(id);

    return (
        <div className="bg-[#F2F7FB] w-full flex flex-col gap-8 pb-3 md:pb-12 items-center justify-center">
            <div className="w-3/4 flex flex-col justify-start gap-2">
                <h1 className="text-[#1C275F] text-2xl lg:text-3xl font-bunken font-normal">
                    cursos
                </h1>
                <h2 className="text-[#1C275F] text-lg lg:text-xl font-bunken font-normal">
                    {course?.course.product.title}
                </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 w-3/4">
                <div className="bg-[#C6DDED] w-full md:w-2/5 h-fit rounded-3xl flex flex-col gap-5 p-6 ">
                    <h1 className="text-[#1C275F] text-lg lg:text-xl font-bunken font-normal">VÍDEO AULAS</h1>
                    <div className="flex items-center">
                        <Link href={course?.course.link_playlist || "/"} target="_blank" className="flex flex-row gap-4 items-center rounded-2xl pr-2 cursor-default ">
                            <div className="bg-[#F2F7FB] flex items-center justify-center rounded-full w-7 h-7 lg:w-8 lg:h-8 cursor-pointer">
                                <Album className="text-[#1C275F] w-3" />
                            </div>
                            <span className="w-fit font-goldplay font-normal text-black text-sm md:text-md lg:text-xl hover:text-[#1C275F] cursor-pointer">acessar aula</span>
                        </Link>
                    </div>
                </div>
                <div className="bg-[#C6DDED] w-full md:w-[45%] rounded-3xl flex flex-col p-6 gap-5">
                    <h1 className="text-[#1C275F] text-lg lg:text-xl font-bunken font-normal uppercase">Questionário</h1>
                    <div className="flex flex-col gap-4">
                        <Link href={result?.isCompleted ? "#" : `/dashboard/courses/quiz/${id}`} className="flex flex-row gap-4 items-center rounded-2xl pr-2 cursor-default ">
                            <div className="bg-[#F2F7FB] flex items-center justify-center rounded-full w-7 h-7 lg:w-8 lg:h-8 cursor-pointer">
                                <ClipboardList className="text-[#1C275F] w-3" />
                            </div>
                            <span className={`w-fit font-goldplay font-normal text-black text-sm  lg:text-xl ${result?.isCompleted ? '' : 'hover:text-[#1C275F] cursor-pointer'}`}>teste de conhecimento</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link href={result?.isCompleted ? `/dashboard/courses/quiz-result/${id}` : "#"} className="flex flex-row gap-4 items-center rounded-2xl pr-2 cursor-default ">
                            <div className="bg-[#F2F7FB] flex items-center justify-center rounded-full w-7 h-7 lg:w-8 lg:h-8 cursor-pointer">
                                <BadgeCheck className="text-[#1C275F] w-3" />
                            </div>
                            <span className={`w-fit font-goldplay font-normal text-black text-sm md:text-md lg:text-xl ${result?.isCompleted ? 'hover:text-[#1C275F] cursor-pointer' : ''} `}>ver meu resultado</span>
                        </Link>
                    </div>
                    {
                        result?.isCompleted ?
                            <span className="text-green-600 text-sm md:text-lg">Questionário já foi respondido, visualize seu resultado</span>
                            :
                            <span className="text-red-600 text-sm md:text-lg">Questionário ainda não foi respondido ou não atingiu atingiu 60% dos acertos</span>
                    }
                </div>
            </div>
        </div>
    )
}