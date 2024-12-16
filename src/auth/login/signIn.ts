'use server'

import { cookies } from 'next/headers';
import login from '@/auth/login/route';

export async function signIn(email: string, password: string): Promise<number> {
  try {
    const { token, status } = await login(email, password);

    if (status === 200) {
      cookies().set('token', token);
    }

    return status;
  } catch (error) {
    console.error("Error during signIn:", error);
    return 0;
  }
}
