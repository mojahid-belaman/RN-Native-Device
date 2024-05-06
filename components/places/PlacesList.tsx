import { FlatList } from "react-native";
import PlaceItem from "./PlaceItem";
import EmptyPlace from "./EmptyPlace";

interface IPlacesListProps {
  places: Place[];
}

function PlacesList(props: IPlacesListProps) {
  const { places } = props;

  function selectPlaceHandler() {}

  if (!places || places.length === 0) {
    return <EmptyPlace />;
  }

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelectPlace={selectPlaceHandler} />
      )}
    />
  );
}

export default PlacesList;
