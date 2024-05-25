import * as React from "react";
import { View } from "react-native";

import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function MaterialsScreen({
  navigation,
}: NavigationScreen<"Materials">) {
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
      <BottomBar navigation={navigation} />
    </View>
  );
}
