import { StyleSheet, Text, Switch, Pressable, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { signOutAsync } from "../../services/Authentication.service";
import { toggle } from "../../shared/reducers/Theme.reducer";
import { ThemedStyles } from "../../shared/styles/Themed.styles";

export default function UserScreen() {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggle());
  };

  const signOutUserAsync = () => {
    signOutAsync();
  };

  return (
    <View style={[styles.container, ThemedStyles(isDarkTheme).view]}>
      <Pressable style={[styles.option]} onPress={toggleTheme}>
        <Text style={[styles.label, ThemedStyles(isDarkTheme).text]}>
          Trocar tema de fundo
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: "#333" }}
          thumbColor={isDarkTheme ? "#fff" : "#fff"}
        />
      </Pressable>
      <Pressable style={[styles.option]} onPress={signOutUserAsync}>
        <Text style={[styles.label, ThemedStyles(isDarkTheme).text]}>
          Sair da conta
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
