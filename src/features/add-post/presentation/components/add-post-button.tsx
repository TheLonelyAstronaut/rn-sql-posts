import { useNavigation, useTheme } from "@/core";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const AddPostButton = () => {
  const { themes, currentTheme } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.push("/add-post")}>
      <MaterialIcons
        name="add"
        size={24}
        color={themes[currentTheme].text.primary}
      />
    </Pressable>
  );
};
