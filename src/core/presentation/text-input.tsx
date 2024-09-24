import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { useTheme } from "../utils";

type TextInputProps = {
  placeholder: string;
  onChangeText?: (data: string) => void;
  disabled?: boolean;
  secureTextEntry?: boolean;
  error?: string;
  multiline?: boolean;
  type?: "text" | "email" | "password";
};

export type TextInputRef = {
  reset: () => void;
};

export const TextInput = forwardRef((props: TextInputProps, ref) => {
  const { themes, currentTheme } = useTheme();
  const textInputRef = useRef<RNTextInput>(null);

  const themedStyle = useMemo(
    () => ({
      borderRadius: themes[currentTheme].input.radius,
      paddingHorizontal: themes[currentTheme].padding * 2,
      paddingVertical: themes[currentTheme].padding,
      borderColor: themes[currentTheme].text.secondary,
      color: themes[currentTheme].text.primary,
      height: props.multiline ? 100 : undefined,
      maxHeight: props.multiline ? 100 : undefined,
    }),
    [themes, currentTheme, props.multiline],
  );

  useImperativeHandle(ref, () => ({
    reset: () => textInputRef.current?.clear(),
  }));

  return (
    <RNTextInput
      ref={textInputRef}
      textContentType={props.type === "email" ? "emailAddress" : undefined}
      keyboardType={props.type === "email" ? "email-address" : undefined}
      style={[styles.container, themedStyle]}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      placeholderTextColor={themes[currentTheme].text.secondary}
      autoCapitalize={"none"}
      multiline={props.multiline}
      maxLength={255}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
  },
});
