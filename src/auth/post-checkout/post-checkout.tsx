import axios, { AxiosResponse } from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { post } from "node_modules/axios/index.cjs";
import { z } from "zod";

const ApiResponseSchema = z.object({
    message: z.string(),
    status: z.number(),
    code: z.string()
  });

type ApiResponse = z.infer<typeof ApiResponseSchema>;

const postCheckout = async (total_price: number, products_id: number[], token: RequestCookie):Promise<ApiResponse> => {

  const status = 0;
  const code = "0";
  const message = "Erro inesperado!"

    try {

      const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });


      const response: AxiosResponse = await route.post(
        "/checkout", { total_price, products_id }
      );

      const data = response.data

      console.log(data)

      if (data.status === 200) {
        return data
      } else {
        return { status, code, message }
      }
    } catch (error) {
      throw new Error(`Unexpected error`);
    }
}

export default postCheckout;