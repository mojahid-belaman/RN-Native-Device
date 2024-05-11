import { FlatList, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import EmptyPlace from "./EmptyPlace";
import { useContext, useEffect } from "react";
import { PlaceContext } from "../../store/place-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

function PlacesList() {
  const { places } = useContext(PlaceContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function selectPlaceHandler(id: string) {
    const findPlace = places.find((place) => place.id === id);
    if (findPlace) {
      navigation.navigate("detailsPlace", {
        place: findPlace,
      });
    }
  }

  useEffect(() => {}, []);

  if (!places || places.length === 0) {
    return <EmptyPlace />;
  }

  return (
    <FlatList
      style={styles.lists}
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelectPlace={selectPlaceHandler.bind(null, item.id)}
        />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  lists: {
    margin: 24,
  },
});
