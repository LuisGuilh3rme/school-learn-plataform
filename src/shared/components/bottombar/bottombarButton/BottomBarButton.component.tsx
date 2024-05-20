import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

import { AppStackProps } from "../../../../types/Navigator.types";

type BottomBarButtonProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
  desiredRoute: keyof AppStackProps;
  currentRoute: keyof AppStackProps;
  defaultIcon: string;
  onPressIcon: string;
  vectorIcon: any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BottomBarButton(props: BottomBarButtonProps) {
  const opacityValue = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 0.2,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    props.navigation.navigate(props.desiredRoute);
  };

  return (
    <AnimatedPressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={handlePress}
      style={{
        opacity: opacityValue,
        backgroundColor:
          props.currentRoute === props.desiredRoute ? "#CED1D7" : "#f0f0f0",
        borderRadius: 30,
        marginBottom: 5,
        padding: 8,
      }}
    >
      <props.vectorIcon
        name={
          props.currentRoute === props.desiredRoute
            ? props.defaultIcon
            : props.onPressIcon
        }
        size={28}
        color="black"
      />
    </AnimatedPressable>
  );
}
