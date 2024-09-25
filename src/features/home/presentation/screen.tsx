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
import { useCallback, useRef } from "react";
import { CommentBlock } from "./components/comment";
import { Comment } from "@/entities/comment";

export const HomeScreen = () => {
  const { isLoading, handleAddComment, feed, shallowFeed, loadNextPage } =
    useHomeScreenViewModel();

  const listRef = useRef<List<Comment>>(null);

  const header = useCallback(
    () => (isLoading ? null : <ListHeader onSubmit={handleAddComment} />),
    [handleAddComment, isLoading],
  );

  const onParentCommentPress = useCallback((id: string) => {
    listRef.current?.srollToItem(
      shallowFeed.current.comments.find((c) => c.id === id)!,
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <CommentBlock
        comment={item}
        onParentCommentPress={onParentCommentPress}
        onAddComment={handleAddComment}
      />
    ),
    [onParentCommentPress, handleAddComment],
  );

  return (
    <ScreenContainer>
      <View style={{ flex: 1, width: "100%" }}>
        <List
          ref={listRef}
          data={feed.comments}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          loading={isLoading}
          header={header}
          onEndReached={loadNextPage}
          separator={DefaultSeparator}
        />
      </View>
    </ScreenContainer>
  );
};
