import {
  Button,
  Card,
  DefaultSeparator,
  ScreenContainer,
  useLocale,
  useTheme,
} from "@/core";
import { useSession } from "@/features/auth";
import { ScrollView, StyleSheet } from "react-native";

export const SettingsScreen = () => {
  const { signOut } = useSession();
  const { locales, currentLocale, changeLocale } = useLocale();
  const { changeTheme } = useTheme();

  return (
    <ScreenContainer padding scroll bounces={false} scrollable={false}>
      <DefaultSeparator />
      <Button
        label={locales[currentLocale].buttons.changeTheme}
        onPress={changeTheme}
      />
      <DefaultSeparator />
      <Button
        label={locales[currentLocale].buttons.changeLanguage}
        onPress={changeLocale}
      />
      <DefaultSeparator />
      <Button
        label={locales[currentLocale].buttons.signOut}
        onPress={signOut}
        variant="danger"
      />
      <DefaultSeparator />
    </ScreenContainer>
  );
};
