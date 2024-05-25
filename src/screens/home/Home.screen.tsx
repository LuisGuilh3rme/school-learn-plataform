import { StyleSheet, Text, View } from "react-native";

import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import UserIcon from "../../shared/components/userIcon/UserIcon.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function HomeScreen({ navigation }: NavigationScreen<"Home">) {
  return (
    <View style={{ flex: 100 }}>
      <UserIcon navigation={navigation} />
      <View style={{ flex: 90 }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          explicabo. Mollitia dolorum hic voluptatem! Excepturi eveniet fugiat,
          quaerat ab iusto recusandae numquam cupiditate voluptatibus, maxime,
          fugit facere earum quas ea.
        </Text>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}
