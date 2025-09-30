import api from './api';

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    // Campos adicionais podem ser retornados pela API (ex.: usuário, expiração, etc.)
    // Adicione-os aqui conforme necessário.
};

export async function authenticate(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/authenticate', payload);
    return data;
}


