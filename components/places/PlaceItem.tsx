import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/colors";

interface IPlaceItem {
  place: Place;
  onSelectPlace: () => void;
}

function PlaceItem(props: IPlaceItem) {
  const { place, onSelectPlace } = props;
  return (
    <Pressable onPress={onSelectPlace}>
      <Image source={{ uri: place.image }} width={100} height={100} />
      <View>
        <Text style={styles.text}>{place.title}</Text>
        <Text style={styles.text}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  text: {
    color: Colors.primary200,
  },
});
