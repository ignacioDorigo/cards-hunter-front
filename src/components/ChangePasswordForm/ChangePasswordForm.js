import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Icon, Overlay, Input } from "@rneui/themed";
import { styles } from "../ChangeEmailForm/ChangeEmailForm.styles";
import { AuthContext } from "../../context/AuthContext";

export function ChangePasswordForm(props) {
  const { uuid } = useContext(AuthContext);
  const { visible, ocultarModal, refrescarScreen } = props;
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        console.log(formulario);

        const response = await axios.put(
          `http://192.168.1.14:8080/cardshunter/changePassword?uuid=${uuid}&original=${formulario.original}&nueva1=${formulario.nueva1}&nueva2=${formulario.nueva2}`
        );
        Alert.alert("Exito", response?.data);
        refrescarScreen();
      } catch (error) {
        Alert.alert("Error", error?.response?.data);
      } finally {
        ocultarModal();
      }
    },
  });
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={ocultarModal}
      overlayStyle={styles.overlay}
    >
      <Text>ChangePasswordForm</Text>

      {/* Actual */}
      <Input
        errorMessage={formik.errors.original}
        autoCapitalize="none"
        onChangeText={(dato) => formik.setFieldValue("original", dato)}
        placeholder="Ingrese contrasena actual"
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            color={"#C1C1C1"}
          ></Icon>
        }
      />

      {/* Nueva1 */}
      <Input
        errorMessage={formik.errors.nueva1}
        autoCapitalize="none"
        onChangeText={(dato) => formik.setFieldValue("nueva1", dato)}
        placeholder="Ingrese contrasena nueva"
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            color={"#C1C1C1"}
          ></Icon>
        }
      />

      {/* Nueva 2 */}
      <Input
        errorMessage={formik.errors.nueva2}
        autoCapitalize="none"
        onChangeText={(dato) => formik.setFieldValue("nueva2", dato)}
        placeholder="Repita la contraseña nueva"
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            color={"#C1C1C1"}
          ></Icon>
        }
      />
      <Button
        title={"Confirmar"}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </Overlay>
  );
}
