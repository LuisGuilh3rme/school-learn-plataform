import * as React from "react";
import { View, Text } from "react-native";

import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ChatScreen({ navigation }: NavigationScreen<"Chat">) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "5%",
          backgroundColor: "rgb(173, 217, 216)",
          padding: "1%",
        }}
      >
        <Text style={{ color: "rgb(18,84,136)", textAlign: "center" }} />
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}
