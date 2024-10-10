import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Fichero con nombre de screens
import { screen } from "../utils";

// Componentes
import { ForgotPasswordScreen } from "../screens/Guest/ForgotPassword";
import { LoginScreen } from "../screens/Guest/Login";
import { RegisterScreen } from "../screens/Guest/Register";

export function GuestNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={screen.guest.login}>
      <Stack.Screen name={screen.guest.login} component={LoginScreen} />
      <Stack.Screen
        name={screen.guest.register}
        component={RegisterScreen}
        options={{ title: "Registro en CardsHunter" }}
      />
      <Stack.Screen
        name={screen.guest.forgotPassword}
        component={ForgotPasswordScreen}
        options={{ title: "Recupero de password" }}
      />
    </Stack.Navigator>
  );
}
