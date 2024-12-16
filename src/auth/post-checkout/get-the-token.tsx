'use server'

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function getTheToken(): Promise< RequestCookie | undefined > {

    const token = cookies().get('token')

    console.log(token, "token")

    try {

        if(token != null) {
            return token;
        }

        console.log("erro ao detectar token")

    } catch (error) {
        console.error("Error:", error);
    }
}