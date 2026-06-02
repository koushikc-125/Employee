import apiClient from './apiConfig';

const getAuthConfig = (cookieHeader?: string) => {
  return cookieHeader ? { headers: { Cookie: cookieHeader } } : {};
};

export const authApi = {
  register: async (name: string, email: string, password: string,) => {
    return  await apiClient.post('/user/register', { name, email, password });
  },

  login: async (email: string, password: string) => {
    return await apiClient.post('/user/login', { email, password });
  },

  getUserProfile: async (cookieHeader?: string) => {
    return await apiClient.get('/user/me', getAuthConfig(cookieHeader));
  },

  logout: async () => {
    const response = await apiClient.post('/user/logout');
    return response.data;
  },

  findUser: async (email: string) => {
    return  await apiClient.post('/user/checkUser', { email });
  }
};
