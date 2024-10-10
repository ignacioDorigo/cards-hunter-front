import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [uuid, setUuid] = useState(null);

  // Función para guardar el uuid en AsyncStorage
  const storeUuid = async (uuid) => {
    try {
      await AsyncStorage.setItem("@user_uuid", uuid);
      setUuid(uuid);
    } catch (e) {
      console.error("Error storing uuid in AsyncStorage:", e);
    }
  };

  // Función para eliminar el uuid de AsyncStorage
  const removeUuid = async () => {
    try {
      await AsyncStorage.removeItem("@user_uuid");
      setUuid(null);
    } catch (e) {
      console.error("Error removing uuid from AsyncStorage:", e);
    }
  };

  // Recuperar el uuid de AsyncStorage cuando se monta el componente
  useEffect(() => {
    const loadUuid = async () => {
      try {
        const storedUuid = await AsyncStorage.getItem("@user_uuid");
        if (storedUuid) {
          setUuid(storedUuid);
        }
      } catch (e) {
        console.error("Error loading uuid from AsyncStorage:", e);
      }
    };

    loadUuid();
  }, []);

  // Función para iniciar sesión y guardar el uuid
  const login = (uuid) => {
    storeUuid(uuid);
  };

  // Función para cerrar sesión y eliminar el uuid
  const logout = () => {
    removeUuid();
  };

  return (
    <AuthContext.Provider value={{ uuid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
