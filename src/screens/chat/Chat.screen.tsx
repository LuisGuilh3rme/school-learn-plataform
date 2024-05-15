import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View } from "react-native";

import SideBar from "../../shared/components/sidebar/sidebar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ChatScreen({ navigation }: NavigationScreen<"Chat">) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "88%",
          marginTop: "7%",
          backgroundColor: "rgb(153, 255, 153)",
        }}
      />
      <SideBar navigation={navigation} />
    </View>
  );
}
