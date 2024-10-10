import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./ChangeSurnameForm.styles";
import { initialValues, validationSchema } from "./ChangeSurnameForm.data";
import { Icon, Input, Overlay } from "@rneui/themed";
import { Button } from "@rneui/base";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import axios from "axios";

export function ChangeSurnameForm(props) {
  const { visible, refrescarScreen, ocultarModal } = props;
  const { uuid } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        const response = await axios.put(
          `http://192.168.1.14:8080/cardshunter/changeSurname?uuid=${uuid}&surname=${formulario.surname}`
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
      visible={visible}
      onBackdropPress={ocultarModal}
      overlayStyle={styles.overlay}
    >
      <Text>ChangeSurnameForm</Text>
      <Input
        autoCapitalize="none"
        placeholder="Ingrese nuevo apellido"
        errorMessage={formik.errors.surname}
        onChangeText={(dato) => formik.setFieldValue("surname", dato)}
        rightIcon={
          <Icon
            type="material-community"
            name="card-account-details-outline"
            color={"#C1C1C1"}
          ></Icon>
        }
      ></Input>
      <Button
        title={"Confirmar"}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </Overlay>
  );
}
