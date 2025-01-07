import { NextResponse } from 'next/server';
import apiClient from '@/utils/api';

export async function middleware(req) {
    const url = req.nextUrl.clone();
    const isValid = req.cookies.get('session_valid')?.value === 'true';
    const userRole = req.cookies.get('session_role')?.value;
    const canAccessVerify = req.cookies.get('verify_access')?.value === 'true';

    console.log("[Middleware]", "session_valid: ", req.cookies.get('session_valid'));
    console.log("[Middleware]", "IsValid: ", isValid);
    console.log("[Middleware]", "UserRole: ", userRole);

    if (url.pathname === '/verify') {
        if (!canAccessVerify) {
            // Redirect to dashboard if logged in, otherwise to login
            return NextResponse.redirect(new URL(isValid ? '/dashboard' : '/login', req.url));
        }
        return NextResponse.next(); // Allow access to /verify
    }

    if (url.pathname === '/login' || url.pathname === '/register') {
        if (isValid) {
            console.log("[Middleware]", "Session valid. Redirecting to /dashboard.");
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
    }

    if (isValid) {

        // Check if accessing an admin route and if the user has the 'admin' role
        if (url.pathname.startsWith('/admin') && userRole !== 'admin') {
            console.log("[Middleware]", "User does not have admin privileges. Redirecting to /dashboard.");
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        console.log("[Middleware]", "Session valid. Allowing access.");
        return NextResponse.next();
    }

    try {
        console.log("[Middleware]", "Checking session validity with the server...");
        const response = await apiClient.get('/auth/session', {
            headers: { 'Cookie': req.headers.get('cookie') },
        });

        if (response.status === 200 && response.data.isValid) {
            console.log("[Middleware]", "Session valid. Setting validation cookie.");
            const res = NextResponse.next();
            res.cookies.set('session_valid', 'true', { maxAge: 300, httpOnly: true, sameSite: 'none', partitioned: true });
            res.cookies.set('session_role', response.data.role, { maxAge: 300, httpOnly: true, sameSite: 'none', partitioned: true });
            
            // Check if accessing an admin route and if the user has the 'admin' role
            if (url.pathname.startsWith('/admin') && response.data.role !== 'admin') {
                console.log("[Middleware]", "User does not have admin privileges. Redirecting to /dashboard.");
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
            
            return res;
        }
    } catch (error) {
        console.log("[Middleware]", "Session invalid. Redirecting to /login.");
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: ['/login', '/register', '/verify', '/admin/:path*', '/dashboard/:path*'],
};