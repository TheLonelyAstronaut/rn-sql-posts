import { useTheme } from "@/core";
import { useSession } from "../../utils/context";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const LogoutButton = () => {
  const { signOut } = useSession();
  const { themes, currentTheme } = useTheme();

  return (
    <Pressable onPress={signOut}>
      <MaterialIcons
        name="logout"
        size={24}
        color={themes[currentTheme].text.primary}
      />
    </Pressable>
  );
};
