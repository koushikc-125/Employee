import apiClient from './apiConfig';

const getAuthConfig = (cookieHeader?: string) => {
    return cookieHeader ? { headers: { Cookie: cookieHeader } } : {};
};

export const leaveApi = {
    apply: async (leaveData: any, cookieHeader?: string) => {
        (await apiClient.post('/leaves/apply', leaveData, getAuthConfig(cookieHeader))).data
    },
    getMyLeaves: async (cookieHeader?: string) => {
        (await apiClient.get('/leaves/my-requests', getAuthConfig(cookieHeader))).data
    },
    updateStatus: async (reviewData: { leaveId: string; status: string }, cookieHeader?: string) => {
        (await apiClient.patch('/leaves/admin/review', reviewData, getAuthConfig(cookieHeader))).data
    },
};