import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Colors } from "../../styles/colors";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState<string>("");

  function chnageTitleHandler(value: string) {
    setEnteredTitle(value);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          selectionColor={Colors.gray700}
          value={enteredTitle}
          onChangeText={chnageTitleHandler}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: Colors.primary500,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary100,
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
});
