import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../styles/colors";
import { Place } from "../../models/place";

interface IPlaceItem {
  place: Place;
  onSelectPlace: () => void;
}

function PlaceItem(props: IPlaceItem) {
  const { place, onSelectPlace } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onSelectPlace}
    >
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.holdText}>
        <Text style={[styles.text, styles.title]}>{place.title}</Text>
        <Text style={styles.text}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 2,
  },
  image: {
    flex: 1,
    height: 100,
  },
  holdText: {
    flex: 2,
    padding: 12,
  },
  text: {
    color: Colors.gray700,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.9,
  },
});
