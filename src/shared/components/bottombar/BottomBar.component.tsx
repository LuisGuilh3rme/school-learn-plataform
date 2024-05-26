import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import BottomBarButton from "./bottombarButton/BottomBarButton.component";
import { AppStackProps } from "../../../types/Navigator.types";
import { NavigationProps } from "../../../types/Shared.types";

export default function BottomBar(props: NavigationProps) {
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState<keyof AppStackProps>("Home");

  useEffect(() => {
    setCurrentRoute(route.name as keyof AppStackProps);
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBorder} />

      <View style={styles.bottomBarAlign}>
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
  topBorder: {
    height: 1,
    backgroundColor: "grey",
  },
  bottomBarAlign: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
