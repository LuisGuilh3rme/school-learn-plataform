import * as React from "react";
import { View } from "react-native";

import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ShareScreen({ navigation }: NavigationScreen<"Share">) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: "88%", marginTop: "7%" }} />
      <BottomBar navigation={navigation} />
    </View>
  );
}
