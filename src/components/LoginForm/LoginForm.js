import { Button, Icon, Input } from "@rneui/themed";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Alert, View } from "react-native";
import { initialValues, validationSchema } from "./LoginForm.data";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export function LoginForm() {
  // Usamos el context para cambiar la navegacion si el usuario esta correcto
  const { login } = useContext(AuthContext);
  const [ocultarPassword, setOcultarPassword] = useState(true);

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        const response = await axios.post(
          `http://192.168.1.14:8080/cardshunter/login?email=${formulario.email}&password=${formulario.password}`
        );
        Alert.alert("Exito", "Login exitoso");
        login(response.data);
      } catch (error) {
        Alert.alert("Error", error.response.data);
      }
    },
  });

  const mostrarOcultarPassword = () => {
    setOcultarPassword((prevState) => !prevState);
  };

  return (
    <View>
      <Input
        placeholder="Ingrese mail"
        errorMessage={formik.errors.email}
        autoCapitalize="none"
        onChangeText={(dato) => formik.setFieldValue("email", dato)}
        rightIcon={<Icon type="material-community" name="email" />}
      />
      <Input
        placeholder="Ingrese password"
        errorMessage={formik.errors.password}
        autoCapitalize="none"
        secureTextEntry={ocultarPassword}
        onChangeText={(dato) => formik.setFieldValue("password", dato)}
        rightIcon={
          <Icon
            type="material-community"
            name={ocultarPassword ? "eye-off-outline" : "eye-outline"}
            onPress={mostrarOcultarPassword}
          />
        }
      />
      <Button
        title={"Ingresar"}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
