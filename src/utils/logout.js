import { destroyCookie } from "nookies";
import apiClient from "./api";

const isProduction = process.env.NODE_ENV === 'production';

export const globalLogout = async () => {
    
    await apiClient.post('/auth/logout')
        .then(_response => {
            const cookieOptions = {
                sameSite: isProduction ? 'None' : 'Lax',
                secure: isProduction,
                path: '/',
                ...(isProduction && { partitioned: true }),
                ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
            };

            destroyCookie(null, 'isLoggedIn');
            destroyCookie(null, 'token', cookieOptions);
            destroyCookie(null, 'userId', cookieOptions);
            destroyCookie(null, 'role', cookieOptions);
            destroyCookie(null, 'session_valid', cookieOptions);

            console.log("[Logout] User logged out successfully, redirecting to /login");
            
            window.location.replace('/login');
        })
        .catch(error => {
            console.error('[Logout] Failed to logout:', error.response?.data?.message || error);
        });
};