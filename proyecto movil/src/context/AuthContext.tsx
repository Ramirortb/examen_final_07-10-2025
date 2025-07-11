import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Usuario {
  nombre: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem("usuario");
        if (usuarioGuardado) {
          setUsuario(JSON.parse(usuarioGuardado));
        }
      } catch (error) {
        console.error("Error al cargar usuario desde AsyncStorage:", error);
      }
    };

    cargarUsuario();
  }, []);

  const login = async (usuario: Usuario) => {
    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
      setUsuario(usuario);
    } catch (error) {
      console.error("Error al guardar usuario en AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
