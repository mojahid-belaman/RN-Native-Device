import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IIconBtnProps {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress?: () => void;
}

function IconBtn(props: IIconBtnProps) {
  const { name, color, size, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}

export default IconBtn;

const styles = StyleSheet.create({
  button: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
