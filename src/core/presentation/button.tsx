import { Pressable, Text } from "react-native";

export type ButtonProps = {
    onPress: () => void;
    label: string;
    disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
    return (
        <Pressable onPress={props.onPress}>
            <Text>{props.label}</Text>
        </Pressable>
    );
}