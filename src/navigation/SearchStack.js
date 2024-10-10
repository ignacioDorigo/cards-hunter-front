import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { screen } from "../utils";

import { SearchScreen } from "../screens/Logged/Search";

export function SearchStack() {

  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName={screen.search.search}>
      <Stack.Screen name={screen.search.search} component={SearchScreen} />
    </Stack.Navigator>
  );
}
