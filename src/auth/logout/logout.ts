'use server'

import type { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function Logout () {

    const currentUser = cookies().has('token')
    
    if (currentUser) {
        cookies().delete('token')
        console.log('Cookie deleted');
    } else {
        console.log('Cookie not found');
    }
    
}