import axios from "axios";
import { cookies } from "next/headers";

type SingleProductSchema = {
    id: number,
    file: string
    product: {
        id: number,
        image: string,
        title: string,
        description: string,
        price: string,
        created_at: string,
        updated_at: string,
    },
};

  type SingleProductApiResponseSchema = {
    ebook: SingleProductSchema,
    message? : string,
    status: number,
  };

export default async function getEbooksPrivate(id: number){
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        }
    });

    try{
        const response = await route.get<SingleProductApiResponseSchema>(`/shop/ebooks/${id}`);
        return response.data;
    } catch(err: any){
        if(err.response){
            return {ebook: err , status: err.response.status};
        } else{
            return {ebook: err, status: 500};
        }
    }
}
