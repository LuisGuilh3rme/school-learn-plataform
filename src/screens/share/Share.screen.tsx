import * as React from "react";
import { View } from "react-native";

import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import UserIcon from "../../shared/components/userIcon/UserIcon.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ShareScreen({ navigation }: NavigationScreen<"Share">) {
  return (
    <View style={{ flex: 100 }}>
      <UserIcon navigation={navigation} />
      <View style={{ flex: 90 }} />
      <BottomBar navigation={navigation} />
    </View>
  );
}
