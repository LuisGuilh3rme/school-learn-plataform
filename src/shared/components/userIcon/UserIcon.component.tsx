import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";

import { useAppSelector } from "../../../../hooks";
import { NavigationProps } from "../../../types/Shared.types";

export default function UserIcon(props: NavigationProps) {
  const userAvatar = useAppSelector((state) => state.avatar.value);

  return (
    <View style={styles.absoluteIcon}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(220, 220, 220)" : "#f0f0f0",
          },
          styles.icon,
        ]}
        onPress={() => {
          props.navigation.navigate("User");
        }}
      >
        {userAvatar && (
          <Image style={styles.avatar} source={{ uri: userAvatar }} />
        )}
        {!userAvatar && <Feather name="user" size={30} color="black" />}
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
  icon: {
    padding: 2,
    borderRadius: 25,
    marginBottom: "2%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
