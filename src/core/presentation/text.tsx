import { useMemo } from "react";
import {
  TextProps as RNTextProps,
  Text as RNText,
  TextStyle,
  StyleProp,
} from "react-native";
import { useTheme } from "../utils";

type TextProps = RNTextProps & {
  variant?: "bold" | "semibold" | "regular" | "light";
  color?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
};

export const Text = ({ variant, color, size, ...props }: TextProps) => {
  const { themes, currentTheme } = useTheme();

  const style: StyleProp<TextStyle> = useMemo(
    () => ({
      fontWeight:
        variant === "bold"
          ? "bold"
          : variant === "semibold"
            ? "600"
            : variant === "light"
              ? "200"
              : "400",
      color: themes[currentTheme].text[color ?? "primary"],
      fontSize: size === "large" ? 18 : size === "small" ? 10 : 14,
    }),
    [variant, themes, currentTheme],
  );

  return <RNText {...props} style={[props.style, style]} />;
};
