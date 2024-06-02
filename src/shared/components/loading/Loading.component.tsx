import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import { LoadingProps } from "../../../types/Shared.types";

export default function Loading(props: LoadingProps) {
  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.indicatorText}>{props.loadingContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "white",
  },
});
