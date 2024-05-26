import { Text } from "react-native";

import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function HomeScreen({ navigation }: NavigationScreen<"Home">) {
  return (
    <ThemedView navigation={navigation}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
        explicabo. Mollitia dolorum hic voluptatem! Excepturi eveniet fugiat,
        quaerat ab iusto recusandae numquam cupiditate voluptatibus, maxime,
        fugit facere earum quas ea.
      </Text>
    </ThemedView>
  );
}
