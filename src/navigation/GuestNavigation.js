import React from "react";

import { ForgotPasswordScreen } from "../screens/Guest/ForgotPassword";
import { LoginScreen } from "../screens/Guest/Login";
import { RegisterScreen } from "../screens/Guest/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function GuestNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Recuperar Password" component={ForgotPasswordScreen}/>
    </Stack.Navigator>
  );
}
