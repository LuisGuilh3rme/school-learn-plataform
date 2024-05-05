import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppStackProps = {
  Authentication: undefined;
  SignUp: undefined;
};

type NavigationScreen<T extends keyof AppStackProps> = {
  navigation: NativeStackNavigationProp<AppStackProps, T>;
};

export { AppStackProps, NavigationScreen };
