import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";

// Import guest y logged stack
import { LoggedNavigation } from "./LoggedNavigation";
import { GuestNavigation } from "./GuestNavigation";

// Import del context
import { AuthContext, AuthProvider } from "../context/AuthContext"

export function AppNavigation() {
  return (
    <NavigationContainer>
      <LoggedNavigation></LoggedNavigation>
    </NavigationContainer>
  );
}
