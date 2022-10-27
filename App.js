
import React from 'react';
import { Map } from './components/Map';
import { Places } from './components/Places';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'azure',
            headerStyle: { backgroundColor: 'black' },
          }}>
          <Stack.Screen component={Places} name="Places" />
          <Stack.Screen component={Map} name="Map" />
        </Stack.Navigator>
      </NavigationContainer>
     </SafeAreaProvider>
  );
}