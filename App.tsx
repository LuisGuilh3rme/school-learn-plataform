import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { auth } from "./firebase";
import AuthenticationScreen from "./src/screens/authentication/Authentication.screen";
import RecoveryScreen from "./src/screens/authentication/password_recovery/Recovery.screen";
import SignUpScreen from "./src/screens/authentication/signup/SignUp.screen";
import HomeScreen from "./src/screens/home/Home.screen";
import MaterialsScreen from "./src/screens/materials/Materials.screen";
import UserScreen from "./src/screens/user/User.screen";
import Loading from "./src/shared/components/loading/Loading.component";
import { AppStackProps } from "./src/types/Navigator.types";
import { store } from "./store";

const Stack = createNativeStackNavigator<AppStackProps>();

const persistor = persistStore(store);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage] = useState("Carregando");
  const [user, setUser] = useState();

  const onAuthChanged = (user: any) => {
    setUser(user);

    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthChanged);
    return subscriber;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {isLoading && <Loading loadingContent={loadingMessage} />}
        <NavigationContainer>
          {!user && (
            <Stack.Navigator
              initialRouteName="Authentication"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Authentication"
                component={AuthenticationScreen}
              />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Recovery" component={RecoveryScreen} />
            </Stack.Navigator>
          )}
          {user && (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                animation: "none",
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Materials" component={MaterialsScreen} />
              <Stack.Screen name="User" component={UserScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
