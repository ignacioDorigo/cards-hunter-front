import React from "react";
import { View, Text } from "react-native";

// IMPORTAR NAVEGACION DE LA APP
import { AppNavigation } from "./src/navigation/AppNavigation";

// Importarcion de contexto
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}