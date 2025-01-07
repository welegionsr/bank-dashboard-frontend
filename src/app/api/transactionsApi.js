import apiClient from "@/utils/api";


export const fetchUserTransactions = async (email) => {
    const response = await apiClient.get(`/transactions/user/${email}`);
    
    return response.data.transactions; // Return only the transactions array
};

export const fetchMyTransactions = async () => {
    const response = await apiClient.get('/transactions/me');

    return response.data.transactions; // Return only the transactions array
};