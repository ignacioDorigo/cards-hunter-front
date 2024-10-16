import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import { styles } from "./AccountScreen.styles";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

// Forms
import { ChangeNameForm } from "../../../../components/ChangeNameForm";
import { ChangeSurnameForm } from "../../../../components/ChangeSurnameForm";
import { ChangeEmailForm } from "../../../../components/ChangeEmailForm/ChangeEmailForm";
import { ChangePasswordForm } from "../../../../components/ChangePasswordForm/ChangePasswordForm";

export function AccountScreen() {
  const [perfil, setPerfil] = useState(null);
  const [reload, setReload] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);


  const [modalEmail, setModalEmail] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalNombre, setModalNombre] = useState(false);
  const [modalApellido, setModalApellido] = useState(false);

  const mostrarOcultarModalNombre = () => {
    setModalNombre((prevState) => !prevState);
  };
  const mostrarOcultarModalPassword = () => {
    setModalPassword((prevState) => !prevState);
  };
  const mostrarOcultarModalApellido = () => {
    setModalApellido((prevState) => !prevState);
  };

  const mostrarOcultarModalEmail = () => {
    setModalEmail((prevState) => !prevState);
  };

  const refrescarScreen = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    buscarPerfil();
  }, [reload]);

  const buscarPerfil = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.14:8080/cardshunter/profile?uuid=${uuid}`
      );
      setPerfil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const opcionesUser = [
    {
      title: "Cambiar Email",
      rightIcon: "at",
      funcion: () => {
        setModalEmail(true);
      },
    },
    {
      title: "Cambiar Password",
      rightIcon: "lock-outline",
      funcion: () => {
        setModalPassword(true);
      },
    },
    {
      title: "Cambiar Nombre",
      rightIcon: "card-account-details-outline",
      funcion: () => {
        setModalNombre(true);
      },
    },
    {
      title: "Cambiar Apellido",
      rightIcon: "card-account-details-outline",
      funcion: () => {
        setModalApellido(true);
      },
    },
  ];
  // Uso del contexto
  const { uuid, logout } = useContext(AuthContext);

  const changeAvatar = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!photo.canceled) {
      const uri = photo.assets[0].uri;
      const imagen = await fetch(uri);
      const imagenBlob = await imagen.blob();

      let formData = new FormData();
      formData.append("uuid", uuid); // Asegúrate de pasar el uuid correcto
      formData.append("imagen", {
        uri: uri,
        type: "image/jpeg", // Cambia según el tipo de imagen
        name: "avatar.jpg", // Nombre del archivo
      });
      try {
        const response = await axios.post(
          "http://192.168.1.14:8080/api/avatars/uploadAvatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Alert.alert("Exito", response.data);
      } catch (error) {
        Alert.alert("Error", error);
      }
    } else {
      console.log("Operacion cancelada");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Avatar
          rounded
          containerStyle={styles.avatarContainer}
          size={"large"}
          icon={{ type: "material", name: "person", color: "#FFF" }}
        
        >
          <Avatar.Accessory size={24} color="#240046" onPress={changeAvatar} />
        </Avatar>

        <View style={styles.viewDatos}>
          <Text style={styles.viewNombre}>
            {perfil?.name} {perfil?.surname}
          </Text>
          <Text>{perfil?.email}</Text>
        </View>
      </View>

      <View style={styles.viewOpciones}>
        {opcionesUser.map((opcion, index) => (
          <TouchableOpacity key={index} onPress={opcion.funcion}>
            <ListItem containerStyle={styles.listItemContainer}>
              <Icon
                type="material-community"
                name="chevron-right"
                color={"#C1C1C1"}
              />
              <ListItem.Content>
                <ListItem.Title>{opcion.title}</ListItem.Title>
              </ListItem.Content>
              <Icon
                containerStyle={{ alignContent: "flex-start" }}
                type="material-community"
                name={opcion.rightIcon}
                color={"#C1C1C1"}
              />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title={"Cerrar Sesión"}
        onPress={logout}
        containerStyle={styles.btnContainer}
      />

      {/* Email */}
      <ChangeEmailForm
        visible={modalEmail}
        ocultarModal={mostrarOcultarModalEmail}
        refrescarScreen={refrescarScreen}
      ></ChangeEmailForm>

      {/* Password */}
      <ChangePasswordForm
        visible={modalPassword}
        ocultarModal={mostrarOcultarModalPassword}
        refrescarScreen={refrescarScreen}
      ></ChangePasswordForm>

      {/* Nombre */}
      <ChangeNameForm
        visible={modalNombre}
        ocultarModal={mostrarOcultarModalNombre}
        refrescarScreen={refrescarScreen}
      ></ChangeNameForm>

      {/* Apelldio  */}
      <ChangeSurnameForm
        visible={modalApellido}
        ocultarModal={mostrarOcultarModalApellido}
        refrescarScreen={refrescarScreen}
      ></ChangeSurnameForm>
    </View>
  );
}
