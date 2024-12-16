import type { NextRequest } from "next/server";
import { NextResponse } from 'next/server';

export function middleware (request: NextRequest) {

    const currentUser = request.cookies.get('token')?.value

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    } 
}

export const config = {
    matcher: ['/dashboard/:path*'],
  }