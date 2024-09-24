import { useMemo } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { useTheme } from "../utils";

type TextInputProps = {
  placeholder: string;
  onChangeText?: (data: string) => void;
  disabled?: boolean;
  secureTextEntry?: boolean;
  error?: string;
  type?: "text" | "email" | "password";
};

export const TextInput = (props: TextInputProps) => {
  const { themes, currentTheme } = useTheme();
  const themedStyle = useMemo(
    () => ({
      borderRadius: themes[currentTheme].input.radius,
      paddingHorizontal: themes[currentTheme].padding * 2,
      paddingVertical: themes[currentTheme].padding,
      borderColor: themes[currentTheme].text.secondary,
      color: themes[currentTheme].text.primary,
    }),
    [themes, currentTheme],
  );

  return (
    <RNTextInput
      textContentType={props.type === "email" ? "emailAddress" : undefined}
      keyboardType={props.type === "email" ? "email-address" : undefined}
      style={[styles.container, themedStyle]}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      placeholderTextColor={themes[currentTheme].text.secondary}
      autoCapitalize={"none"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
  },
});
