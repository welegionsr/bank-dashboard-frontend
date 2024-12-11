import apiClient from "@/utils/api";


export const fetchTransactions = async (email, token) => {
    const response = await apiClient.get(`/transactions/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data.transactions; // Return only the transactions array
};