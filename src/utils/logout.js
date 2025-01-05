import apiClient from "./api";

export const globalLogout = async () => {
    
    try {
        await apiClient.post('/auth/logout');
        window.location.replace('/login');
    }
    catch(error){
        console.error('Failed to logout:', error.response?.data?.message || error);
    }
};