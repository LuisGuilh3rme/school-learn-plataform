import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthenticationScreen from "./src/screens/authentication/Authentication.screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
