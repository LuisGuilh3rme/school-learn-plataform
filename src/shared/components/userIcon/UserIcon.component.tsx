import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Pressable, View } from "react-native";

import { NavigationProps } from "../../../types/Shared.types";

export default function UserIcon(props: NavigationProps) {
  return (
    <View style={styles.absoluteIcon}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(220, 220, 220)" : "#f0f0f0",
          },
          styles.onpress,
        ]}
        onPress={() => {
          props.navigation.navigate("User");
        }}
      >
        <Feather name="user" size={30} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteIcon: {
    zIndex: 100,
    position: "absolute",
    top: 50,
    right: 20,
  },
  onpress: {
    padding: 10,
    borderRadius: 20,
    marginBottom: "2%",
  },
});
