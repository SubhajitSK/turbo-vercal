import axios from 'axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const useLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('/api/login', credentials);
    return response.data;
}