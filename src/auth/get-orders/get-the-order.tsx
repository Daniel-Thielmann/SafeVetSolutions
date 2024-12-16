'use server';

import axios from "axios";
import { cookies } from "next/headers";

interface Order{
    id: number;
    total_price: string;
    code: string;
    sold: number;
    active: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    sqid: string;
}

type Product = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: string;
    productable_type: string;
    productable_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
        order_id: number,
        products_id: number,
    }
}

interface OrderResponse{
    order: Order;
    products: Product[];
    status: number;
}

const getTheOrder = async (id: number): Promise<OrderResponse> => {
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
        const response = await route.get(`/user/orders/${id}`);
        return response.data;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return {
                order: {
                    id: 0,
                    total_price: "0",
                    code: "0",
                    sold: 0,
                    active: 0,
                    user_id: 0,
                    created_at: "0",
                    updated_at: "0",
                    sqid: "0",
                },
                products: [],
                status: 500,
            } ;
        }
    }
}

export default getTheOrder;