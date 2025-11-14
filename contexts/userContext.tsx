"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

interface User {
  idUser: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // VALIDAR SESIÓN
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await api.get('/user/me');
        if (response.success) {
          setUser(response.data.user);
          setToken(localStorage.getItem("token")); // <--- Guarda token si existe
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // LOGIN
  const login = (userData: User, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("token", newToken); // <--- Guardar token persistente
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("familyId");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);