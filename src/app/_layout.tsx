import { Stack } from "expo-router";
import { withAppBootstrap } from "@/features/bootstrap";

const RootLayout = withAppBootstrap(() => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
});

export default RootLayout;
