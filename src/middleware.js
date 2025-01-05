import { NextResponse } from 'next/server';
import apiClient from '@/utils/api';

export async function middleware(req) {
    const url = req.nextUrl.clone();
    const isValid = req.cookies.get('session_valid')?.value === 'true';
    
    console.log("[Middleware] ", "session_valid: ", req.cookies.get('session_valid'));
    console.log("[Middleware] ", "IsValid: ", isValid);


    if (url.pathname === '/login' || url.pathname === '/register') {
        if (isValid) {
            console.log("[Middleware] ", "Session valid. Redirecting to /dashboard.");
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
    }

    if (isValid) {
        console.log("[Middleware] ", "Session valid. Allowing access.");
        return NextResponse.next();
    }

    try {
        const response = await apiClient.get('/auth/session', {
            headers: { 'Cookie': req.headers.get('cookie') },
        });

        if (response.status === 200 && response.data.isValid) {
            console.log("[Middleware] ", "Session valid. Setting validation cookie.");
            const res = NextResponse.next();
            res.cookies.set('session_valid', 'true', { maxAge: 300, httpOnly: true });
            return res;
        }
    } catch (error) {
        console.log("[Middleware] ", "Session invalid. Redirecting to /login.");
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: ['/login', '/register', '/admin/:path*', '/dashboard/:path*'],
};