import axios from "axios";
import { cookies } from "next/headers";

type SingleProductSchema = {
    id: number,
    file: string,
    product: {
        id: number,
        image: string,
        title: string,
        description: string | undefined,
        price: string,
        created_at: string,
        updated_at: string,
    },
};

type SingleProductApiResponseSchema = {
    manual: SingleProductSchema,
    status: number,
};

export default async  function getManualPrivate(id: number){
    const token = cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        }
    });

    try {
        const response = await route.get<SingleProductApiResponseSchema>(`/api/shop/manuals/${id}`);
        return response.data;
    } catch (err: any) {
        console.log("entrou aqui")
        if (err.response) {
            console.log(err.response.status)
            return { manual: err, status: err.response.status };
        } else {
            return { manual: err, status: 500 };
        }
    }
}

//export default getManualPrivate;
