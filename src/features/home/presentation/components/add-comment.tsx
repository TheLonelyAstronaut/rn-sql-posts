import {
  Button,
  Card,
  DefaultSeparator,
  TextInput,
  TextInputRef,
  useLocale,
} from "@/core";
import { useSession } from "@/features/auth";
import { Avatar } from "./avatar";
import { StyleSheet, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { User } from "@/entities/user";

export type AddCommentProps = {
  onSubmit: (text: string, user: User) => void;
};

export const AddComment = (props: AddCommentProps) => {
  const { session } = useSession();
  const { locales, currentLocale } = useLocale();
  const text = useRef("");
  const [isValid, setValid] = useState(false);
  const textInputRef = useRef<TextInputRef>();

  const onChangeText = useCallback((data: string) => {
    setValid(!!data.length);

    text.current = data;
  }, []);

  const onSubmit = useCallback(() => {
    props.onSubmit(text.current, session as User);
    textInputRef.current?.reset();
    setValid(false);
  }, [props.onSubmit, session]);

  if (!session) return null;

  return (
    <Card>
      <View style={style.container}>
        <Avatar url={session.avatar} />
        <View style={style.textHolder}>
          <TextInput
            ref={textInputRef}
            onChangeText={onChangeText}
            placeholder={locales[currentLocale].buttons.enterText}
            multiline
          />
          <DefaultSeparator />
          <Button
            label={locales[currentLocale].buttons.send}
            variant={isValid ? "primary" : "disabled"}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  textHolder: {
    flex: 1,
    marginLeft: 8,
  },
});
