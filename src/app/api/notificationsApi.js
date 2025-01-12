import apiClient from "@/utils/api";

// fetch current user's unread notifications
export const fetchMyUnreadNotifications = async () => {
    try {
        const response = await apiClient.get('/notifications/unread');
    
        return response.data; // Return only the notifications array
    }
    catch (error) {
        throw new Error(`Failed to fetch current user unread notifications: ${error.response?.data?.message || error.message}`);
    }
};

// fetch ALL of current user's notifications (either read or not)
export const fetchMyNotifications = async () => {
    try {
        const response = await apiClient.get('/notifications');

        return response.data; // Return only the notifications array
    }
    catch (error) {
        throw new Error(`Failed to fetch current user notifications: ${error.response?.data?.message || error.message}`);
    }
};

export const setNotificationAsRead = async (id) => {
    try {
        const response = await apiClient.patch(`/notifications/${id}/read`);
    
        return response.data; // Return the response body
    }
    catch (error) {
        throw new Error(`Failed to update notification read status: ${error.response?.data?.message || error.message}`);
    }
};