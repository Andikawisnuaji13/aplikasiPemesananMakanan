import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeKasir from './src/screen/home';
import HomeAdmin from './src/screen/homeAdmin';
import Menu from './src/screen/Menu';
const Stack = createNativeStackNavigator();

function App (){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' 
      screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeKasir}/>
        <Stack.Screen name="homeAdmin" component={HomeAdmin}/>
        <Stack.Screen name="Menu" component={Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;