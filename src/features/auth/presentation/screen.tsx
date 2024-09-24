import {
  Button,
  Card,
  DefaultSeparator,
  ScreenContainer,
  Text,
  TextInput,
  useLocale,
} from "@/core";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useAuthScreenViewModel } from "./view-model";

export const AuthScreen = () => {
  const { signIn, createHandler, isValid, isLoading } =
    useAuthScreenViewModel();
  const { locales, currentLocale } = useLocale();

  return (
    <ScreenContainer padding>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container}
      >
        <Card style={style.card}>
          <Text variant="bold" size="large">
            {locales[currentLocale].headers.signIn}
          </Text>
          <DefaultSeparator />
          <DefaultSeparator />
          <TextInput
            placeholder={locales[currentLocale].inputs.email}
            onChangeText={createHandler("email")}
            type={"email"}
          />
          <DefaultSeparator />
          <TextInput
            placeholder={locales[currentLocale].inputs.username}
            onChangeText={createHandler("username")}
          />
          <DefaultSeparator />
          <TextInput
            placeholder={locales[currentLocale].inputs.password}
            secureTextEntry
            onChangeText={createHandler("password")}
          />
          <DefaultSeparator />
          <DefaultSeparator />
          <Button
            label={locales[currentLocale].buttons.signIn}
            onPress={signIn}
            variant={isValid ? "primary" : "disabled"}
            loading={isLoading}
          />
        </Card>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const style = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
