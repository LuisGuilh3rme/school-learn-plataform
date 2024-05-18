import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

import SideBar from "../../shared/components/sidebar/sidebar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function HomeScreen({ navigation }: NavigationScreen<"Home">) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "10%",
          height: "6%",
          marginStart: "90%",
          marginTop: "7%",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(220, 220, 220)" : "#f0f0f0",
            },
            styles.onpress,
          ]}
        >
          <Feather style={{ margin: 5 }} name="user" size={26} color="black" />
        </Pressable>
      </View>

      <View
        style={{ width: "98%", height: "82%", marginTop: 5, marginLeft: 5 }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          explicabo. Mollitia dolorum hic voluptatem! Excepturi eveniet fugiat,
          quaerat ab iusto recusandae numquam cupiditate voluptatibus, maxime,
          fugit facere earum quas ea.
        </Text>
      </View>
      <SideBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  onpress: {
    borderRadius: 8,
    marginBottom: "2%",
  },
});
