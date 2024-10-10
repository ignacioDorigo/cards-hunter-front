import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text } from "react-native";

// Import guest y logged stack
import { LoggedNavigation } from "./LoggedNavigation";
import { GuestNavigation } from "./GuestNavigation";

// Import del context
import { AuthContext } from "../context/AuthContext";

export function AppNavigation() {
  const { uuid } = useContext(AuthContext);
  console.log(uuid);

  return (
    <NavigationContainer>
        {uuid?<LoggedNavigation></LoggedNavigation>:<GuestNavigation></GuestNavigation>}
    </NavigationContainer>
  );
}
