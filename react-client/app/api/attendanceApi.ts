import apiClient from './apiConfig';
import type { ApiResponse } from './ApiResponse';

export interface AttendanceRecord {
    _id: string;
    user: string | { _id: string; name: string; email: string };
    date: string;
    checkIn: string;
    checkOut?: string;
    status: 'Present' | 'Absent' | 'Late' | 'Half-Day';
}

const getAuthConfig = (cookieHeader?: string) => {
    return cookieHeader ? { headers: { Cookie: cookieHeader } } : {};
};

export const attendanceApi = {
    checkIn: async (cookieHeader?: string) => {
        return await apiClient.post<ApiResponse<AttendanceRecord>>('/attendance/checkin', {}, getAuthConfig(cookieHeader))
    },
    getMyLogs: async (cookieHeader?: string) => {
        return await apiClient.get<ApiResponse<AttendanceRecord[]>>('/attendance/my-logs', getAuthConfig(cookieHeader))
    },
    getAdminLogs: async (cookieHeader?: string) => {
        return await apiClient.get<ApiResponse<AttendanceRecord[]>>('/attendance/admin/all-logs', getAuthConfig(cookieHeader))
    },
};