import { useCallback, useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Colors } from "../../styles/colors";
import PrimaryButton from "../ui/Button";
import { RootStackParamList, TCoordinate } from "../../types";
import { Place } from "../../models/place";
import { PlaceContext } from "../../store/place-context";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [takeImage, setTakeImage] = useState<string>("");
  const [pickLocation, setPickLocation] = useState<TCoordinate>();
  const [address, setAddress] = useState<string>("");
  const { addPlace } = useContext(PlaceContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function chnageTitleHandler(value: string) {
    setEnteredTitle(value);
  }

  function changeImageHandler(takenImage: string) {
    setTakeImage(takenImage);
  }

  const changeLocationHandler = useCallback(
    (pickedLocation: TCoordinate, address: string) => {
      setPickLocation(pickedLocation);
      setAddress(address);
    },
    []
  );

  async function addPlaceHandler() {
    const place = new Place(enteredTitle, takeImage, address, pickLocation!);
    addPlace(place);
    navigation.navigate("favoritePlace");
  }

  const placeIsValid =
    enteredTitle.length > 0 &&
    takeImage.length > 0 &&
    pickLocation! &&
    address.length > 0;

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
      <ImagePicker onTakeImage={changeImageHandler} />
      <LocationPicker onPickLocation={changeLocationHandler} />
      <PrimaryButton
        type="fill"
        disabled={!placeIsValid}
        onPress={addPlaceHandler}
      >
        Add Place
      </PrimaryButton>
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
