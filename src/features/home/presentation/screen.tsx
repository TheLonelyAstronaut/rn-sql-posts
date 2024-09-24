import {
  Card,
  DefaultListSeparator,
  List,
  NavigationService,
  ScreenContainer,
} from "@/core";
import { Dimensions, Text, View } from "react-native";

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      {/* <Card>
        <Text onPress={() => NavigationService.instance.push('/(app)/add-post')}>Add Post</Text>
        <Text onPress={() => NavigationService.instance.push('/(app)/post')}>Post</Text>
      </Card> */}
      <View style={{ flex: 1, width: "100%" }}>
        <List
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          keyExtractor={(i) => i.toString()}
          renderItem={({ item }) => (
            <Card>
              <Text>{item}</Text>
            </Card>
          )}
          separator={DefaultListSeparator}
        />
      </View>
    </ScreenContainer>
  );
};
