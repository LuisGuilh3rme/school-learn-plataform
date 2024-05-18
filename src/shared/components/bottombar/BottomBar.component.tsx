import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import BottomBarButton from "./bottombarButton/BottomBarButton.component";
import { AppStackProps } from "../../../types/Navigator.types";

type BottomBarProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
};

export default function BottomBar(props: BottomBarProps) {
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState<keyof AppStackProps>("Home");

  useEffect(() => {
    setCurrentRoute(route.name as keyof AppStackProps);
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "99%", height: 1, backgroundColor: "grey" }} />
      </View>
      <View style={styles.bottonBarAlign}>
        <BottomBarButton
          currentRoute={currentRoute}
          desiredRoute="Chat"
          defaultIcon="message"
          onPressIcon="message-outline"
          navigation={props.navigation}
          vectorIcon={MaterialCommunityIcons}
        />

        <BottomBarButton
          currentRoute={currentRoute}
          desiredRoute="Home"
          defaultIcon="home"
          onPressIcon="home-outline"
          navigation={props.navigation}
          vectorIcon={Ionicons}
        />

        <BottomBarButton
          currentRoute={currentRoute}
          desiredRoute="Share"
          defaultIcon="folder"
          onPressIcon="folder-o"
          navigation={props.navigation}
          vectorIcon={FontAwesome}
        />
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
});
