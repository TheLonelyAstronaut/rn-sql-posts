import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../utils";

export const ScreenContainer = (props: PropsWithChildren) => {
  const { themes, currentTheme } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themes[currentTheme].background,
      }}
    >
      {props.children}
    </SafeAreaView>
  );
};
