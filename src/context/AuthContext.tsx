import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Reidratação do token do localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (savedToken) {
            setToken(savedToken);
            api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
        }
        setLoading(false);
    }, []);

    const login = useCallback((newToken: string) => {
        setToken(newToken);
        localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        delete api.defaults.headers.common.Authorization;
        if (typeof window !== 'undefined') {
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        token,
        isAuthenticated: Boolean(token),
        loading,
        login,
        logout,
    }), [token, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
    }
    return ctx;
}


