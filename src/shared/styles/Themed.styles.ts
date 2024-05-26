import { StyleSheet } from "react-native";

const ThemedStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    view: {
      backgroundColor: isDarkTheme ? "#101820" : "#e5eaf5",
    },
    text: {
      color: isDarkTheme ? "#bdc3c7" : "#333333",
    },
  });

export { ThemedStyles };
