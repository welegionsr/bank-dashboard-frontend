import { destroyCookie } from "nookies";
import apiClient from "./api";

export const globalLogout = async () => {
    
    await apiClient.post('/auth/logout')
        .then(_response => {
            destroyCookie(null, 'isLoggedIn');
            console.log("user logged out successfully, redirecting to /login");
            window.location.replace('/login');
        })
        .catch(error => {
            console.error('Failed to logout:', error.response?.data?.message || error);

        });
};