import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../styles/colors";

type enumTypeBtton = "fit" | "fill";

interface IButtonProps {
  children: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  type: enumTypeBtton;
  disabled?: boolean;
  onPress: () => void;
}

function PrimaryButton(props: IButtonProps) {
  const { children, iconName, onPress, type, disabled } = props;

  let styleBtn: StyleProp<ViewStyle> = [styles.container];
  let styleText: StyleProp<TextStyle> = [styles.text];

  if (type === "fill") {
    styleBtn.push(styles.fill);
    styleText.push(styles.textFill);
  }

  return (
    <Pressable
      style={({ pressed }) => [
        ...styleBtn,
        pressed && styles.pressed,
        disabled && styles.disable,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Ionicons name={iconName} color={Colors.primary500} size={24} />
      <Text style={styleText}>{children}</Text>
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
    margin: 6,
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
  fill: {
    backgroundColor: Colors.primary800,
    borderWidth: 0,
    borderRadius: 6,
    elevation: 2,
  },
  textFill: {
    color: "white",
    fontSize: 18,
  },
  disable: {
    backgroundColor: "gray",
    opacity: 0.6,
  },
});
