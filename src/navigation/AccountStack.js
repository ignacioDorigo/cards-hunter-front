import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Fichero de Screens
import { screen } from "../utils";

// Components
import { AccountScreen } from "../screens/Logged/Account";

export function AccountStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={screen.account.account}>
      <Stack.Screen name={screen.account.account} component={AccountScreen} />
    </Stack.Navigator>
  );
}
