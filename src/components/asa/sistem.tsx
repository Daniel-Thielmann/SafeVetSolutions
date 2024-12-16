import React from 'react';

type Response = {
    response: string | string[]
}


export default function AsaSistemCard({ response }: Response) {

    const formatDate = (dateString: string) => {
        const datePart = dateString.substring(0, 10); // "2024-10-02"
        const [year, month, day] = datePart.split('-'); // Separar ano, mês e dia
        return `${day}/${month}/${year}`; // Retornar no formato "02-10-2024"
    };

    return (
        <div className="flex flex-col w-full text-[#1C275F] mb-8 md:text-xl lg:text-2xl">
            <div className="my-8">
                <h1 className="font-bunken">Diagnosticos anteriores</h1>
            </div>
            <div className="font-goldplay space-y-6">
                {Array.isArray(response) ? (
                    response.map((tries, index) => (
                        <div key={index} className="flex justify-between">
                            <h1>Tentativa {index+1}</h1>
                            <h1>{formatDate(tries)}</h1>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <h1>{response}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
