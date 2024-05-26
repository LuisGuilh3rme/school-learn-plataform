import { StyleSheet, View } from "react-native";

import { useAppSelector } from "../../../../hooks";
import { ThemedViewProps } from "../../../types/Shared.types";
import { ThemedStyles } from "../../styles/Themed.styles";
import BottomBar from "../bottombar/BottomBar.component";
import UserIcon from "../userIcon/UserIcon.component";

export default function ThemedView(props: ThemedViewProps) {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);

  return (
    <View
      style={[ThemedStyles(isDarkTheme).view, props.styles, styles.container]}
    >
      <UserIcon navigation={props.navigation} />
      <View style={styles.content}>{props.children}</View>
      <BottomBar navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  content: {
    flex: 9,
  },
});
