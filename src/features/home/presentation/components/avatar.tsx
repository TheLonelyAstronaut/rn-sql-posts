import { useTheme } from "@/core";
import { Image, StyleSheet } from "react-native";

export const Avatar = (props: { url: string }) => {
  const { themes, currentTheme } = useTheme();

  return (
    <Image
      source={{ uri: props.url }}
      style={[style.image, { borderColor: themes[currentTheme].text.primary }]}
    />
  );
};

const style = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: "contain",
    borderWidth: 1,
  },
});
