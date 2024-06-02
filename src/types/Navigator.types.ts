import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppStackProps = {
  Authentication: undefined;
  SignUp: undefined;
  Home: undefined;

  Materials: undefined;
  Recovery: undefined;
  User: undefined;
};

type NavigationScreen<T extends keyof AppStackProps> = {
  navigation: NativeStackNavigationProp<AppStackProps, T>;
  route: RouteProp<AppStackProps, T>;
};

export { AppStackProps, NavigationScreen };
