
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const token = cookies().get('token');
    
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const res = await fetch('https://sistema-safevet-hom.codejr.com.br/api/user/asa/quiz/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();
        console.log('Resposta enviada:', result);
        return new Response(JSON.stringify(result), { status: res.status });
    } catch (error) {
        console.error('Erro ao enviar respostas:', error);
        return new Response(JSON.stringify({ error: 'Erro ao enviar respostas' }), { status: 500 });
    }
}
