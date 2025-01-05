import apiClient from "@/utils/api";


export const fetchContacts = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}/contacts`, {
            withCredentials: true,
        });

        return response.data.contacts; // Return only the contacts array
    }
    catch (error) {
        throw new Error(`Failed to fetch contacts: ${error.response?.data?.message || error.message}`);
    }
};

export const deleteContact = async (userId, contactId) => {
    try
    {
        const response = await apiClient.delete(`/users/${userId}/contacts/${contactId}`, {
            withCredentials: true,
        });
    
        return response.data;
    }
    catch(error)
    {
        throw new Error(`Failed to delete contact: ${error.response?.data?.message || error.message}`);    
    }
};

export const fetchUsers = async () => {
    try
    {
        const response = await apiClient.get('/users', {
            withCredentials: true,
        });
    
        return response.data; // Return only the users array
    }
    catch(error)
    {
        throw new Error(`Failed to fetch users: ${error.response?.data?.message || error.message}`);    
    }
};