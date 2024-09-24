import { ScreenContainer } from "@/core";
import { Text, View } from "react-native";
import { useSession } from "../utils/context";

export const AuthScreen = () => {
  const { signIn } = useSession();

  return (
    <ScreenContainer>
      <Text onPress={signIn}>Auth</Text>
    </ScreenContainer>
  );
};
