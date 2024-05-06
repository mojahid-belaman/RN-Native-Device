import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/colors";

function EmptyPlace() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Places Added Yet - Start Adding Some!</Text>
    </View>
  );
}

export default EmptyPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary200,
  },
});
