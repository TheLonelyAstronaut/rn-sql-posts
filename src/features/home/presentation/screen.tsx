import {
  Card,
  DefaultSeparator,
  List,
  NavigationService,
  ScreenContainer,
  Text,
} from "@/core";
import { Dimensions, View } from "react-native";
import { useHomeScreenViewModel } from "./view-model";
import { AddComment } from "./components/add-comment";
import { ListHeader } from "./components/list-header";
import { useCallback } from "react";

export const HomeScreen = () => {
  const { isLoading, handleAddTopThread, feed } = useHomeScreenViewModel();

  const header = useCallback(
    () => (isLoading ? null : <ListHeader onSubmit={handleAddTopThread} />),
    [handleAddTopThread, isLoading],
  );

  return (
    <ScreenContainer>
      <View style={{ flex: 1, width: "100%" }}>
        <List
          data={feed.comments}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <Card>
              <Text>{item.content}</Text>
            </Card>
          )}
          loading={isLoading}
          header={header}
          separator={DefaultSeparator}
        />
      </View>
    </ScreenContainer>
  );
};
