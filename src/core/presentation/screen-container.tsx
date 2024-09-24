import { PropsWithChildren, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../utils";
import { ScrollView } from "react-native";

export const ScreenContainer = (
  props: PropsWithChildren<{
    padding?: boolean;
    center?: boolean;
    scroll?: boolean;
    bounces?: boolean;
    scrollable?: boolean;
  }>,
) => {
  const { themes, currentTheme } = useTheme();

  const style = useMemo(
    () =>
      ({
        height: "100%",
        justifyContent: props.center ? "center" : undefined,
        alignItems: "center",
        backgroundColor: themes[currentTheme].background.secondary,
        paddingHorizontal: !!props.padding
          ? themes[currentTheme].padding * 2
          : 0,
        paddingVertical: !!props.padding ? themes[currentTheme].padding * 2 : 0,
      }) as const,
    [props.padding, props.center, themes, currentTheme],
  );

  return props.scroll ? (
    <ScrollView
      style={{ backgroundColor: themes[currentTheme].background.secondary }}
      contentContainerStyle={style}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      bounces={props.bounces}
      scrollEnabled={props.scrollable}
    >
      {props.children}
    </ScrollView>
  ) : (
    <SafeAreaView edges={["top"]} style={style}>
      {props.children}
    </SafeAreaView>
  );
};
