import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppSelector } from "../../../hooks";
import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { ThemedStyles } from "../../shared/styles/Themed.styles";
import { NavigationScreen } from "../../types/Navigator.types";

export default function HomeScreen({ navigation }: NavigationScreen<"Home">) {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);

  const iconColor = isDarkTheme ? "white" : "black";
  const buttonBackgroundColor = isDarkTheme ? "#333" : "#fff"; // Adjust button background color based on theme

  return (
    <ThemedView navigation={navigation}>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? isDarkTheme
                  ? "#555"
                  : "#ddd"
                : buttonBackgroundColor,
            },
          ]}
        >
          <Ionicons name="notifications-outline" size={80} color={iconColor} />
          <Text style={[styles.buttonText, ThemedStyles(isDarkTheme).text]}>
            Você não tem nenhuma nova notificação
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? isDarkTheme
                  ? "#555"
                  : "#ddd"
                : buttonBackgroundColor,
            },
          ]}
        >
          <MaterialCommunityIcons name="web" size={80} color={iconColor} />
          <Text style={[styles.buttonText, ThemedStyles(isDarkTheme).text]}>
            Entre no site do LiceuTQ
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? isDarkTheme
                  ? "#555"
                  : "#ddd"
                : buttonBackgroundColor,
            },
          ]}
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Ionicons name="chatbubbles-outline" size={80} color={iconColor} />
          <Text style={[styles.buttonText, ThemedStyles(isDarkTheme).text]}>
            Converse com outros alunos
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? isDarkTheme
                  ? "#555"
                  : "#ddd"
                : buttonBackgroundColor,
            },
          ]}
          onPress={() => {
            navigation.navigate("Share");
          }}
        >
          <MaterialCommunityIcons
            name="folder-edit-outline"
            size={80}
            color={iconColor}
          />
          <Text style={[styles.buttonText, ThemedStyles(isDarkTheme).text]}>
            Adicione novos arquivos
          </Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    width: "48%",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
