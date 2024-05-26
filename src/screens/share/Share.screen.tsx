import * as React from "react";
import { Text } from "react-native";

import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ShareScreen({ navigation }: NavigationScreen<"Share">) {
  return (
    <ThemedView navigation={navigation}>
      <Text>Share Screen</Text>
    </ThemedView>
  );
}
