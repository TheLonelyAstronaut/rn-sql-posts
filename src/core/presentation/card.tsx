import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../utils";

export const Card = (props: PropsWithChildren) => {
  const { currentTheme, themes } = useTheme();
  const themeStyle = useMemo(
    () => ({
      backgroundColor: themes[currentTheme].background,
      paddingVertical: themes[currentTheme].padding,
      paddingHorizontal: themes[currentTheme].padding * 2,
    }),
    [themes, currentTheme],
  );

  return <View style={[style.container, themeStyle]}>{props.children}</View>;
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
