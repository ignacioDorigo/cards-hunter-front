import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'


// Fichero de screens
import {screen} from '../utils'

// Componentes
import {CollectionScreen} from '../screens/Logged/Collection'

export function CollectionStack() {

    const Stack = createNativeStackNavigator();
    
    return (
      <Stack.Navigator initialRouteName={screen.collection.collection}>
       <Stack.Screen name={screen.collection.collection} component={CollectionScreen}/>
      </Stack.Navigator>
    );
}