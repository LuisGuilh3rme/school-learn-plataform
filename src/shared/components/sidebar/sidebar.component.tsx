import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppStackProps } from "../../../types/Navigator.types";

type SidebarProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
};

export default function SideBar(props: SidebarProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(route.name);
  }, [route]);

  const isCurrentRoute = (routeName: string) => {
    return currentRoute === routeName;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "99%", height: 1, backgroundColor: "grey" }} />
      </View>
      <View
        style={{
          width: "100%",
          height: "10%",
          flex: 1,
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: "2%",
        }}
      >
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
            props.navigation.navigate("Home", { username: "" });
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
  wrapperCustom: {
    borderRadius: 30,
    marginBottom: 5,
    padding: 1,
  },
});
