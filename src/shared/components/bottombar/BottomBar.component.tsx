import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppStackProps } from "../../../types/Navigator.types";

type BottomBarProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
};

export default function BottomBar(props: BottomBarProps) {
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(route.name);
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "99%", height: 1, backgroundColor: "grey" }} />
      </View>
      <View style={styles.bottonBarAlign}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(153, 255, 153)" : "#f0f0f0",
            },
            styles.wrapperCustom,
          ]}
          onPress={() => {
            props.navigation.navigate("Chat");
          }}
        >
          <MaterialCommunityIcons
            name={currentRoute === "Chat" ? "message" : "message-outline"}
            size={33}
            color="black"
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(199, 203, 255)" : "#f0f0f0",
            },
            styles.wrapperCustom,
          ]}
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Ionicons
            name={currentRoute === "Home" ? "home" : "home-outline"}
            size={33}
            color="black"
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(255, 102, 102)" : "#f0f0f0", // Cor de fundo
            },
            styles.wrapperCustom,
          ]}
          onPress={() => {
            props.navigation.navigate("Share");
          }}
        >
          <FontAwesome
            name={currentRoute === "Share" ? "folder" : "folder-o"}
            size={33}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottonBarAlign: {
    width: "100%",
    height: "10%",
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: "2%",
  },
  wrapperCustom: {
    borderRadius: 30,
    marginBottom: 5,
    padding: 1,
  },
  iconPressed: {
    backgroundColor: "",
  },
});
