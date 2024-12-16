import axios, { AxiosResponse } from 'axios';
import { z } from "zod";

type InfoProps = {
    id: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    cpf: string | undefined;
    birth_date: string | undefined;
    status: number | undefined;
  };

  const UserScheme = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    cpf: z.string(),
    birth_date: z.string(),
  });

  const ApiResponseSchema = z.object({
    user: UserScheme,
    status: z.number(),
  });

  type ApiResponse = z.infer<typeof ApiResponseSchema>;

  const getInfos = async (token: string): Promise<ApiResponse> => {

    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const response: AxiosResponse<ApiResponse> = await route.get("/user");

        const parsedResponse = ApiResponseSchema.safeParse(response);

        const user = response.data.user
        const status = response.data.status
        console.log(parsedResponse.success);
        
        if (!parsedResponse.success) {
            return {user, status};
        } else {
            throw new Error('Token de autenticação inválido ou ausente');
        }
};

export default getInfos;