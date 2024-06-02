import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import { useAppSelector } from "../../../../../hooks";
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
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);

  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 0.2,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 250,
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
      style={[
        styles.buttonContainer,
        {
          backgroundColor: isDarkTheme ? "#333" : "#fff",
          opacity: opacityValue,
          width: 55,
          borderRadius: 30,
        },
      ]}
    >
      <props.vectorIcon
        name={
          props.currentRoute === props.desiredRoute
            ? props.defaultIcon
            : props.onPressIcon
        }
        size={28}
        color={isDarkTheme ? "#fff" : "#000"}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    padding: 8,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
