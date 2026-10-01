import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem("@CultivaTech:user");
        const storedToken = await AsyncStorage.getItem("@CultivaTech:token");

        if (storedUser && storedToken) {
          // Injeta o token recuperado em todas as chamadas futuras da API
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao recuperar a sessão:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function persistSession(user: User, token: string) {
    await AsyncStorage.setItem("@CultivaTech:user", JSON.stringify(user));
    await AsyncStorage.setItem("@CultivaTech:token", token);
    
    // Configura o cabeçalho de autorização para as próximas requisições
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  const signIn = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, token } = response.data;
    await persistSession(user, token);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Rota correta do seu backend para criação de usuário: POST /users
    const response = await api.post("/users", {
      name: normalizedName,
      email: normalizedEmail,
      password,
    });

    const { user, token } = response.data ?? {};

    // 2. Se a API de criação já devolver o token diretamente, salva e entra
    if (user && token) {
      await persistSession(user, token);
      return;
    }

    // 3. Caso contrário, faz o login automático em seguida
    await signIn(normalizedEmail, password);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@CultivaTech:user");
    await AsyncStorage.removeItem("@CultivaTech:token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}