import { destroyCookie } from "nookies";
import apiClient from "./api";

export const globalLogout = async () => {
    
    await apiClient.post('/auth/logout')
        .then(_response => {
            const cookieOptions = {
                path: '/',
                domain: process.env.NODE_ENV === 'production' ? '.up.railway.app' : undefined
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