import { NextResponse } from 'next/server';
import apiClient from '@/utils/api';

const isProduction = process.env.NODE_ENV === 'production';

const retrySessionCheck = async (req, retries = 3, delay = 100) => {
    const cookies = req.headers.get('cookie') || '';
    console.log(`[Middleware] Forwarding cookies: ${cookies}`);
    
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`[Middleware] Attempt ${i + 1} to validate session...`);
            const response = await apiClient.get('/auth/session', {
                headers: {
                    'Cookie': cookies, // Forward all cookies from the request
                }
            });

            if (response.status === 200 && response.data.isValid) {
                return response.data; // Return session data if valid
            }
        } catch (error) {
            console.error(`[Middleware] Attempt ${i + 1} failed:`, error.message || error);
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    return null; // If all retries fail, return null
};

export async function middleware(req) {
    const url = req.nextUrl.clone();

    console.log("[Middleware] Checks before redirect to: ", url.pathname);
    console.log("[Middleware] Incoming cookies:", req.headers.get('cookie'));

    const token = req.cookies.get('token')?.value;
    const isValid = req.cookies.get('session_valid')?.value === 'true' && token;
    const userRole = req.cookies.get('role')?.value;
    const canAccessVerify = req.cookies.get('verify_access')?.value === 'true';

    console.log("[Middleware]", "Token: ", token);
    console.log("[Middleware]", "session_valid: ", req.cookies.get('session_valid')?.value);
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
        let isValid = req.cookies.get('session_valid')?.value === 'true';
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

    // If session validity is unknown, try validating with the server
    const sessionData = await retrySessionCheck(req);
    if (sessionData) {
        console.log("[Middleware]", "Session valid after retry. Setting validation cookie.");
        const res = NextResponse.next();
        res.cookies.set('session_valid', 
                        'true', 
                        {   maxAge: 300, 
                            httpOnly: true, 
                            secure: isProduction, 
                            sameSite: isProduction ? 'None' : 'Lax', 
                            ...(isProduction && { partitioned: true }),
                            path: '/',
                            ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
                        });

        if (url.pathname.startsWith('/admin') && sessionData.role !== 'admin') {
            console.log("[Middleware]", "User does not have admin privileges. Redirecting to /dashboard.");
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return res;
    }

    console.log("[Middleware]", "Session invalid after retries. Redirecting to /login.");
    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: ['/login', '/register', '/verify', '/admin/:path*', '/dashboard/:path*'],
};