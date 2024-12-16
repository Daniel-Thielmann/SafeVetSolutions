
export async function storeAnswersOnServer(responses: string[], company: string[]) {
    console.log(company)
    const body = JSON.stringify({responses, company});
    console.log("body:", body);
    try {
        const res = await fetch('/api/send-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
        
        const result = await res.json();
        console.log('Resposta armazenada no servidor:', result);
        return result;
    } catch (error) {
        console.error('Erro ao armazenar respostas:', error);
        return null;
    }
}
