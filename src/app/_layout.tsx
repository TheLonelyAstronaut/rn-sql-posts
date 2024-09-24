import { Stack } from "expo-router";
import { withAppBootstrap } from "@/features/bootstrap";
import { useTheme } from "@/core";

const RootLayout = withAppBootstrap(() => {
  const { themes, currentTheme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: themes[currentTheme].background.secondary,
        },
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
});

export default RootLayout;
