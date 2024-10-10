import { Button, Icon } from "@rneui/base";
import { Input, Overlay } from "@rneui/themed";
import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./ChangeNameForm.styles.js";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeNameForm.data.js";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

export function ChangeNameForm(props) {
  const { uuid } = useContext(AuthContext);
  const { visible, ocultarModal,refrescarScreen } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formulario) => {
      try {
        const response = await axios.put(
          `http://192.168.1.14:8080/cardshunter/changeName?uuid=${uuid}&name=${formulario.name}`
        );
        refrescarScreen();
        Alert.alert("Exito", response.data);
        ocultarModal();
      } catch (error) {
        Alert.alert("Error", error.response.data);
      }
    },
  });

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onBackdropPress={ocultarModal}
    >
      <View style={styles.viewForm}>
        <Text>ChangeNameForm</Text>
        <Input
          errorMessage={formik.errors.name}
          onChangeText={(dato) => formik.setFieldValue("name", dato)}
          autoCapitalize="none"
          placeholder="Ingrese su nuevo nombre"
          rightIcon={<Icon type="material-community" name="pencil"></Icon>}
        />
        <Button
          title={"Confirmar"}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </Overlay>
  );
}
