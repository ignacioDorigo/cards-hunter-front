import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./ChangeEmailForm.styles";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Icon, Input, Overlay } from "@rneui/themed";

export function ChangeEmailForm(props) {
  const { visible, ocultarModal, refrescarScreen } = props;
  const { uuid } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formulario) => {
      try {
        const response = await axios.put(`http://192.168.1.14:8080/cardshunter/changeEmail?uuid=${uuid}&email=${formulario.email}`);
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
      <Text>ChangeEmailForm</Text>
      <Input
        placeholder="Ingrese nuevo email"
        autoCapitalize="none"
        errorMessage={formik.errors.email}
        onChangeText={(dato) => formik.setFieldValue("email", dato)}
        rightIcon={
          <Icon type="material-community" name="at" color={"#C1C1C1"}></Icon>
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
