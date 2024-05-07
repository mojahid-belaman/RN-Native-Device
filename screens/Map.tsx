import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import MapView, { MapPressEvent } from "react-native-maps";
import { RootStackParamList } from "../types/screens";

function MapScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, "mapView">) {
  const initialRegion = {
    latitude: route.params.lat,
    longitude: route.params.lon,
    latitudeDelta: 0.9,
    longitudeDelta: 0.9,
  };

  function setMarkHandler(event: MapPressEvent) {
    
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={setMarkHandler}
      />
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
