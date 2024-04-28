import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthenticationScreen from "./src/screens/authentication/AuthenticationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
