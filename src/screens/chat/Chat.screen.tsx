import * as React from "react";
import { Text } from "react-native";

import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ChatScreen({ navigation }: NavigationScreen<"Chat">) {
  return (
    <ThemedView navigation={navigation}>
      <Text>Chat Screen</Text>
    </ThemedView>
  );
}
