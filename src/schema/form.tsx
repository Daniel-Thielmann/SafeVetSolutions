import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(3, {
        message: "Nome deve ter pelo menos 3 caracteres."
    }),
    email: z.string().email({
        message: "Por favor insira um email válido."
    }),
    message: z.string().min(3, {
        message: "Mensagem deve ter pelo menos 3 caracteres."
    })
})

export type FormValue = z.infer<typeof formSchema>