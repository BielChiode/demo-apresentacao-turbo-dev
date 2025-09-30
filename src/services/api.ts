import axios, { AxiosError } from 'axios';

// Cria instância com baseURL a partir do Vite
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string | undefined,
    withCredentials: false,
});

function clearUserSessionAndRedirect(): void {
    try {
        // Remoção dos itens comuns de sessão; ajuste conforme sua app
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        sessionStorage.clear();
    } finally {
        if (typeof window !== 'undefined') {
            const loginPath = '/login';
            if (window.location.pathname !== loginPath) {
                window.location.href = loginPath;
            }
        }
    }
}

// Interceptor de resposta para capturar 401
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
            clearUserSessionAndRedirect();
        }
        return Promise.reject(error);
    }
);

export default api;


