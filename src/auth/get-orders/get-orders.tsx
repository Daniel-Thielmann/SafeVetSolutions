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


interface OrdersResponse{
    orders: Order[];
    totalPages: number;
    status: number;
}

const getUserOrders = async (currentPage: number): Promise<OrdersResponse> => {
    const token= cookies().get('token');
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        params: {
            page: currentPage,
        },
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`
        }
    });

    try{
        const response = await route.get("/user/orders");
        return response.data;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return {
                orders: [],
                totalPages: 1,
                status: 500,
            } ;
        }
    }
}

export default getUserOrders;