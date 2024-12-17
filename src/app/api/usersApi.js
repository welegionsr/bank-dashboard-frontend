import apiClient from "@/utils/api";


export const fetchContacts = async (userId, token) => {
    try
    {
        const response = await apiClient.get(`/users/${userId}/contacts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    
        return response.data.contacts; // Return only the contacts array
    }
    catch(error)
    {
        throw new Error(`Failed to fetch contacts: ${error.response?.data?.message || error.message}`);    
    }
};

export const deleteContact = async (userId, contactId, token) => {
    try
    {
        const response = await apiClient.delete(`/users/${userId}/contacts/${contactId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    
        return response.data;
    }
    catch(error)
    {
        throw new Error(`Failed to delete contact: ${error.response?.data?.message || error.message}`);    
    }
};