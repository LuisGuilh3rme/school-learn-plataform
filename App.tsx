import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthenticationScreen from "./src/screens/authentication/Authentication.screen";
import SignUpScreen from "./src/screens/authentication/signup/SignUp.screen";
import { AppStackProps } from "./src/types/Navigator.types";

const Stack = createNativeStackNavigator<AppStackProps>();

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
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
