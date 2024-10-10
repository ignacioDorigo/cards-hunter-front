import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Fichero de Screens
import {screen} from '../utils'

// Componentes
import {FavoritesScreen} from '../screens/Logged/Favorites'

export  function FavoritesStack() {

    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator initialRouteName={screen.favorites.favorites}>
       <Stack.Screen name={screen.favorites.favorites} component={FavoritesScreen} options={{title:'Favoritos'}}/>
      </Stack.Navigator>
    );
}