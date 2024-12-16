'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import CompanyCard from '@/components/asa/company';
import getQuestionary from '@/auth/api-asa/route';
import { storeAnswersOnServer } from '@/utils/Answers';


type ApiResponseSchema = {
    quiz: {
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
    };
    questions: {
        id: number;
        title: string;
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
};

async function fetchQuiz(): Promise<ApiResponseSchema | null> {
    try {
        const response = await getQuestionary();

        if (!response || typeof response !== 'object' || !('questions' in response)) {
            console.error("Failed to fetch data");
            return null;
        }

        return response as ApiResponseSchema;
    } catch (e) {
        console.error("Failed to fetch data", e);
        return null;
    }
}

async function getLocalStorage() {

    const company: string[] = ([]);
    if (typeof window !== "undefined") {
    const response1 = window.localStorage.getItem('companyName1')
    const response2 = window.localStorage.getItem('companyName2')
    const response3 = window.localStorage.getItem('companyName3')
    if (response1 && response2 && response3) {
        company.push(response1);
        company.push(response2);
        company.push(response3);
    }}
    
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(company)
    }, 1000)
  )

}

export default function DiagnosisPage() {
    const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(true);
    const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
    const [isSendOpen, setIsSendOpen] = useState<boolean>(false);
    const [allAnswered, setAllAnswered] = useState(false);

    const handleCompanyClick = () => {
        setIsCompanyOpen(true);
        setIsQuizOpen(false);
        setIsSendOpen(false);
    }

    const handleQuizClick = () => {
        setIsCompanyOpen(false);
        setIsQuizOpen(true);
        setIsSendOpen(false);
    }

    const handleSendClick = () => {
        setIsCompanyOpen(false);
        setIsQuizOpen(false);
        setIsSendOpen(true);
    }

    const [data, setData] = useState<ApiResponseSchema | null>(null);
    const [responses, setResponses] = useState<string[]>([]);

    useEffect(() => {
        async function loadQuiz() {
            const quizData = await fetchQuiz();
            if (quizData) {
                setData(quizData);
                setResponses(Array(quizData.questions.length).fill(''));
            }
        }

        loadQuiz();
    }, []);

    const handleAnswerSelection = (questionIndex: number, answer: string) => {
        const newResponses = [...responses];
        newResponses[questionIndex] = answer;
        setResponses(newResponses);
    };

    const handleSubmit = async () => {
        const company = await getLocalStorage();
        if(Array.isArray(company) && company.length > 0){
            await storeAnswersOnServer(responses, company);
        }
        localStorage.clear();
        window.location.href = '/dashboard/asa';
    };

    const handleOut = async () =>{
        window.localStorage.clear();
    }

    useEffect(()=>{
        setAllAnswered(responses.every(response => response !== '') && window.localStorage.getItem('companyName1') !== '' && window.localStorage.getItem('companyName2') !== '' && window.localStorage.getItem('companyName3') !== '')
    })
    

    if (!data) {
        return <h1 className="flex justify-center items-center text-2xl">Carregando questionário...</h1>;
    }


    return (
        <main className="bg-[#F2F7FB] min-h-screen flex justify-center w-full">
            <div className='flex flex-col gap-12 w-4/5 md:w-3/4 mb-5 md:mb-0'>
                <h1 className="text-[#1C275F] text-3xl lg:text-4xl font-bunken">
                    Diagnóstico Institucional
                </h1>
                <div className="flex text-[#1C275F] w-full items-center justify-center md:items-start md:gap-6 flex-col md:flex-row ">
                    <div className="h-[390px]  flex flex-col justify-between items-center py-10 space-y-6 gap-16 bg-[#C6DDED] md:w-1/4 w-10/12 font-bunken rounded-xl">
                        <div className='w-full flex items-center justify-center gap-4 flex-col'>
                            <button onClick={handleCompanyClick}>
                                <h1 className='text-lg md:text-sm lg:text-lg'>Empresa</h1>
                            </button>
                            <button onClick={handleQuizClick}>
                                <h1 className='text-lg md:text-sm lg:text-lg'>Questionário</h1>
                            </button>
                            <button onClick={handleSendClick}>
                                <h1 className='text-lg md:text-sm lg:text-lg'>Enviar</h1>
                            </button>
                        </div>
                        <div className="">
                            <Link href='/dashboard/asa'>
                                <button className="flex items-center justify-center" onClick={handleOut}>
                                    <img src="/assets/logout.png" className="mr-2 mt-1" alt="Logout" />
                                    <h1 className='text-lg md:text-sm'>Sair</h1>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className=" pt-10 md:pt-0 flex items-center justify-center w-full md:w-3/4">
                        {isCompanyOpen && <CompanyCard />}
                        {isQuizOpen &&
                            <Suspense fallback={<p>Carregando...</p>}>
                                {data.status === 200 ? (
                                    <div className="md:ml-16 space-y-8 mb-16">
                                        <h1 className="font-bunken text-lg">Questionário</h1>
                                        <div className="flex flex-col gap-10 text-sm md:text-md lg:text-xl xl:text-2xl">
                                            {data.questions.map((question, index) => (
                                                <div key={question.id}>
                                                    <h2 className="font-goldplay ml-4 mb-1">{question.title}</h2>
                                                    <div className="bg-[#F2F7FB] rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {[question.option_a, question.option_b, question.option_c, question.option_d].map((option, optionIndex) => (
                                                            <label key={optionIndex} className="flex items-center p-2 bg-[#E4EFF6] border border-blue-300 px-10 gap-2 rounded-sm">
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${index}`}
                                                                    value={option}
                                                                    className="form-radio h-3 w-3 text-blue-500 mr-2"
                                                                    onChange={() => handleAnswerSelection(index, option)}
                                                                    checked={responses[index] === option}
                                                                />
                                                                <span>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Erro ao carregar os dados.</p>
                                )}
                            </Suspense>
                        }
                        {isSendOpen &&
                            <div className="md:ml-16 w-3/4 md:w-4/6 flex  flex-col items-center justify-center space-y-8 md:space-y-12 text-md lg:text-xl xl:text-2xl">
                                <h1 className="font-bunken text-center md:text-start w-full">Envio</h1>
                                <div className="flex flex-col w-full gap-3 items-center md:items-start md:justify-start">
                                    <h1 className="font-goldplay md:ml-1 text-center">Enviar Questionário?</h1>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!allAnswered}
                                        className={`flex items-center text-white justify-center p-2 border   px-12 md:px-24 ${allAnswered ? 'bg-[#1C275F] hover:bg-[#233075]' : 'bg-[#485597]/95'}`}
                                    >
                                        <span>Enviar</span>
                                    </button>

                                    {
                                        !allAnswered ?
                                        <span className=" mt-6 text-red-600 text-md md:text-xl">Algum campo do questionário não está preenchido. Para enivá-lo, é necessário completar todas as informações.</span>
                                        :
                                        <p></p>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </main>
    );
}
