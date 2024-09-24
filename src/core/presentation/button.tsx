import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../utils";
import { useMemo } from "react";
import { Text } from "./text";

export type ButtonProps = {
  onPress: () => void;
  label: string;
  variant?: "primary" | "secondary" | "danger" | "disabled";
  loading?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { currentTheme, themes } = useTheme();

  const containerThemedStyle = useMemo(
    () => ({
      borderRadius: themes[currentTheme].button.radius,
      paddingVertical: themes[currentTheme].padding,
      paddingHorizontal: themes[currentTheme].padding * 2,
      backgroundColor: themes[currentTheme].button[props.variant ?? "primary"],
      opacity: props.variant === "disabled" ? 0.3 : 1,
      borderWidth: props.variant === "secondary" ? 1 : 0,
      borderColor: themes[currentTheme].text.secondary,
      maxHeight: 33,
    }),
    [props.variant, currentTheme, themes],
  );

  return (
    <Pressable
      onPress={
        props.variant !== "disabled" && !props.loading
          ? props.onPress
          : undefined
      }
      style={[styles.container, containerThemedStyle]}
    >
      {!!props.loading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <Text variant="semibold">{props.label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
