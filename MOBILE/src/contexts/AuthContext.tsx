import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem('@CultivaTech:user');
      const storedToken = await AsyncStorage.getItem('@CultivaTech:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;

    await AsyncStorage.setItem('@CultivaTech:user', JSON.stringify(user));
    await AsyncStorage.setItem('@CultivaTech:token', token);

    setUser(user);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@CultivaTech:user');
    await AsyncStorage.removeItem('@CultivaTech:token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}