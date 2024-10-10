import React from "react";
import { View, Text } from "react-native";
import { styles } from "./LoginScreen.styles";

import { LoginForm } from "../../../components/LoginForm";
import { useNavigation } from "@react-navigation/native";

// Fichero con nombre de screens
import { screen } from "../../../utils";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.guest.register);
  };

  const goToForgotPassword = () => {
    navigation.navigate(screen.guest.forgotPassword);
  };
  return (
    <View>
      {/* Logo */}
      <View></View>

      {/* Formulario para loguearse */}
      <LoginForm></LoginForm>

      {/* Irse para la Screen de recuperarPassword */}
      <Text onPress={goToForgotPassword}>¿Has olvidado tu contraseña?</Text>

      {/* Irse para la Screen de register */}
      <Text>
        ¿Todavía no te has registrado?
        <Text onPress={goToRegister}>Click aquí</Text>
      </Text>
    </View>
  );
}
