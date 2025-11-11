// contexts/userContext.tsx
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
  loading: boolean;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
        try {
          const response = await api.get('/user/me');
          if (response.success) {
            setUser(response.data.user);
          } else {
            // si no se puede la request es porque es invalido 
            logout();
          }
        } catch (error) {
          //console.error('Error verificando token:', error);
          logout();
        }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('familyId');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);