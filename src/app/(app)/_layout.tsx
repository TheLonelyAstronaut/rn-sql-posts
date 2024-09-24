import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { LogoutButton, useSession } from "@/features/auth";
import { useEffect } from "react";
import { useLocale, useTheme } from "@/core";
import { SettingsButton } from "@/features/settings";

export default function AppLayout() {
  const { session } = useSession();
  const { currentLocale, locales } = useLocale();
  const { currentTheme, themes } = useTheme();

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: {
          backgroundColor: themes[currentTheme].background.primary,
        },
        headerTitleStyle: {
          color: themes[currentTheme].text.primary,
        },
        headerStyle: {
          backgroundColor: themes[currentTheme].background.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: locales[currentLocale].headers.home,
          headerRight: SettingsButton,
          headerBlurEffect: "prominent",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: locales[currentLocale].headers.settings }}
      />
    </Stack>
  );
}
