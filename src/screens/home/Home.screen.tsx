import { StyleSheet, Text, View } from "react-native";

import { NavigationScreen } from "../../types/Navigator.types";

export default function HomeScreen({
  navigation,
  route,
}: NavigationScreen<"Home">) {
  return (
    <View style={[styles.center, { flex: 1 }]}>
      <Text>{route.params.username} </Text>
      <Text>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
