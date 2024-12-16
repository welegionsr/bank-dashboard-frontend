import apiClient from "@/utils/api";


export const fetchContacts = async (userEmail, token) => {
    const response = await apiClient.get(`/users/${userEmail}/contacts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data.contacts; // Return only the contacts array
};