import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Fichero con nombre de screens
import { screen } from "../utils";

// Stacks
import { CollectionStack } from "./CollectionStack";
import { FavoritesStack } from "./FavoritesStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";

export function LoggedNavigation() {
    
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={screen.collection.collectionTab}
      screenOptions={{ headerShown: false }}
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
