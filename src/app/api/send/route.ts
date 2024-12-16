import { FormValue } from '@/schema/form';
import { SafeVetWelcomeEmail } from '../../../components/resend/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request): Promise<Response> {
    try {
        const body: FormValue = await request.json()
        const { data, error } = await resend.emails.send({
            from: 'SafeVet <onboarding@resend.dev>',
            to: ['taynara.ferraz@estudante.ufjf.br'],
            subject: 'SafeVet Solutions',
            react: SafeVetWelcomeEmail({ userFirstname: body.name, userEmail: body.email }) as React.ReactElement,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ data }, { status: 200 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
