'use server'

import { redirect } from 'next/navigation';
import { cookies } from "next/headers"

export async function isLoggedIn () {
    const currentUser = cookies().has('token')
    
    if (currentUser){
        return 1
    } else {
        return 0
    }
}