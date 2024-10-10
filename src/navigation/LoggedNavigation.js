import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Fichero con nombre de screens
import { screen } from "../utils";

// Stacks
import { CollectionStack } from "./CollectionStack";
import { FavoritesStack } from "./FavoritesStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";
import { Icon } from "@rneui/themed";

export function LoggedNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={screen.account.accountTab}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#7B2CBF",
        tabBarInactiveTintColor: "#8a817c",
        tabBarIcon: ({ focused, color, size }) =>
          elegirIconoTab(route, color, size, focused),
      })}
    >
      <Tab.Screen
        name={screen.collection.collectionTab}
        component={CollectionStack}
        options={{ title: "Coleccion" }}
      />
      <Tab.Screen
        name={screen.favorites.favoritesTab}
        component={FavoritesStack}
        options={{ title: "Favoritos" }}
      />
      <Tab.Screen
        name={screen.search.searchTab}
        component={SearchStack}
        options={{ title: "Buscar" }}
      />
      <Tab.Screen
        name={screen.account.accountTab}
        component={AccountStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function elegirIconoTab(route, color, size, focused) {
  let nombreIcono = "";
  let tamanioIcono = size;
  if (route.name === screen.collection.collectionTab) {
    nombreIcono = focused ? "cards" : "cards-outline";
    tamanioIcono = focused ? tamanioIcono + 4 : 26;
  }
  if (route.name === screen.favorites.favoritesTab) {
    nombreIcono = focused ? "heart" : "heart-outline";
    tamanioIcono = focused ? tamanioIcono + 4 : 26;
  }
  if (route.name === screen.search.searchTab) {
    nombreIcono = focused ? "magnify" : "magnify";
    tamanioIcono = focused ? tamanioIcono + 4 : 26;
  }
  if (route.name === screen.account.accountTab) {
    nombreIcono = focused ? "account" : "account-outline";
    tamanioIcono = focused ? tamanioIcono + 4 : 26;
  }

  return (
    <Icon
      type="material-community"
      name={nombreIcono}
      color={color}
      size={tamanioIcono}
    />
  );
}
