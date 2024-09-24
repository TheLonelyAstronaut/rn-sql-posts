import { useNavigation, useTheme } from "@/core";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const SettingsButton = () => {
  const { themes, currentTheme } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.push("/settings")}>
      <MaterialIcons
        name="settings"
        size={24}
        color={themes[currentTheme].text.primary}
      />
    </Pressable>
  );
};
