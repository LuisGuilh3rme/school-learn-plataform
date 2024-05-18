import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";

import { AppStackProps } from "../../../../types/Navigator.types";

type BottomBarButtonProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
  desiredRoute: keyof AppStackProps;
  currentRoute: keyof AppStackProps;
  defaultIcon: string;
  onPressIcon: string;
  vectorIcon: any;
};

export default function BottomBarButton(props: BottomBarButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(153, 255, 153)" : "#f0f0f0",
        },
        styles.wrapperCustom,
      ]}
      onPress={() => {
        props.navigation.navigate(props.desiredRoute);
      }}
    >
      <props.vectorIcon
        name={
          props.currentRoute === props.desiredRoute
            ? props.defaultIcon
            : props.onPressIcon
        }
        size={33}
        color="black"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 30,
    marginBottom: 5,
    padding: 1,
  },
});
