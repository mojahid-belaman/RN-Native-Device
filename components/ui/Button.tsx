import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../styles/colors";

interface IButtonProps {
  children: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

function PrimaryButton(props: IButtonProps) {
  const { children, iconName, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={iconName} color={Colors.primary500} size={24} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    margin: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  text: {
    fontSize: 16,
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
});
