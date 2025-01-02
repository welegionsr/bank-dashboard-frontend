import apiClient from "@/utils/api";


export const fetchUserTransactions = async (email, token) => {
    const response = await apiClient.get(`/transactions/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
    return response.data.transactions; // Return only the transactions array
};

export const fetchMyTransactions = async (token) => {
    const response = await apiClient.get('/transactions/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data.transactions; // Return only the transactions array
};