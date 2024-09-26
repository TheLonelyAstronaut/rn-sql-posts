import { Card, DefaultSeparator, Text, useLocale, useTheme } from "@/core";
import { Comment } from "@/entities/comment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Avatar } from "./avatar";
import { AddComment } from "./add-comment";
import { User } from "@/entities/user";
import { MaterialIcons } from "@expo/vector-icons";
import R, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useDerivedValue,
} from "react-native-reanimated";

type CommentProps = {
  comment: Comment;
  onParentCommentPress: (id: string) => void;
  onAddComment: (text: string, user: User, parent: string) => void;
};

const SHIFT = 16;
const MAX_SHIFT = Dimensions.get("window").width / 3;

const format = (num: number) => (num < 10 ? "0" + num : num);

export const CommentBlock = ({
  comment,
  onParentCommentPress,
  onAddComment,
}: CommentProps) => {
  const [isOpened, _setOpened] = useState(false);
  const sharedHeight = useSharedValue(0);

  const setOpened = useCallback((value: boolean, skipAnimation = false) => {
    if (value) {
      _setOpened(value);
      sharedHeight.value = withTiming(190, { duration: 200 });
    } else {
      sharedHeight.value = withTiming(
        0,
        { duration: skipAnimation ? 0 : 200 },
        (finished) => {
          if (finished) {
            runOnJS(_setOpened)(value);
            //_setOpened(value);
          }
        },
      );
    }
  }, []);

  const opacity = useDerivedValue(() => {
    return sharedHeight.value / 190;
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: sharedHeight.value,
      opacity: opacity.value,
    };
  });

  const { locales, currentLocale } = useLocale();
  const { themes, currentTheme } = useTheme();

  const margin = useMemo(() => {
    const shift = (comment.id.match(/\./g) ?? []).length * SHIFT;

    if (shift > MAX_SHIFT) return MAX_SHIFT;
    return shift;
  }, [comment]);

  const date = useMemo(() => {
    const _date = new Date(comment.date);
    const day = _date.getDate();
    const month = _date.getMonth() + 1;
    const hours = _date.getHours();
    const minutes = _date.getMinutes();

    return `${format(day)}/${format(month)} ${format(hours)}:${format(minutes)}`;
  }, [comment]);

  const replyId = useMemo(() => {
    const l = comment.id.lastIndexOf(".");

    if (l === -1) return null;
    return comment.id.substring(0, l);
  }, [comment]);

  const _onAddComment = useCallback(
    (text: string, user: User) => {
      onAddComment(text, user, comment.id);
      setOpened(false);
    },
    [onAddComment, comment],
  );

  const _onParentCommentPress = useCallback(() => {
    onParentCommentPress(replyId!);
  }, [replyId, onParentCommentPress]);

  useEffect(() => {
    setOpened(false, true);
  }, [comment.id]);

  return (
    <View style={{ marginLeft: margin }}>
      <Card>
        <View style={styles.metadataContainer}>
          <Avatar url={comment.author.avatar} />
          <DefaultSeparator />
          <View style={styles.infoContainer}>
            <View style={styles.metadataContainer}>
              <Text color="secondary">{comment.author.username}</Text>
              {!!replyId && (
                <Text
                  size="small"
                  color="secondary"
                  onPress={_onParentCommentPress}
                >
                  {locales[currentLocale].buttons.replyFor}
                  <Text size="small" color="primary">
                    {replyId}
                  </Text>
                </Text>
              )}
            </View>
            <DefaultSeparator />
            <Text>{comment.content}</Text>
            <DefaultSeparator />
            <View style={styles.metadataContainer}>
              <Text size="small" color="secondary">
                {date}
              </Text>
              <Pressable
                onPress={() => setOpened(!isOpened)}
                style={styles.replyContainer}
              >
                <MaterialIcons
                  name="reply"
                  size={14}
                  color={themes[currentTheme].text.primary}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
      {!!isOpened && (
        <R.View style={animatedStyles}>
          <DefaultSeparator />
          <AddComment
            onSubmit={_onAddComment}
            replyFor={comment.id}
            containerStyle={{ height: 180 }}
          />
        </R.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  metadataContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  infoContainer: {
    flex: 1,
  },
  replyContainer: {
    alignSelf: "flex-end",
  },
});
