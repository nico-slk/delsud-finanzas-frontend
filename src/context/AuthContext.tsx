import { AuthContext } from "@/hooks/useAuth";
import { AuthService } from '@/services/auth.service';
import React, { useState } from "react";

export type AuthContextType = {
  login: (email: string, password: string) => void;
  token: string | null;
  logout: () => void;
  register: (email: string, password: string, nombre: string, rol: string) => void;
  isAuthenticated: boolean;
};

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {

    await AuthService.login(email, password)
      .then((response) => {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
        setIsAuthenticated(true);
      });
  };

  const register = async (email: string, password: string, nombre: string, rol: string) => {
    const { data } = await AuthService.register(email, password, nombre, rol);
    await login(data.email, password);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, token, isAuthenticated, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
