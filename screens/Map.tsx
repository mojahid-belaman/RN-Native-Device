import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import IconBtn from "../components/ui/IconBtn";
import { RootStackParamList, TCoordinate } from "../types";

function MapScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "mapView">) {
  const [coordinate, setCoordinate] = useState<TCoordinate>();
  const initiaLocation = route.params && {
    latitude: route.params?.latitude,
    longitude: route.params?.longitude,
  };

  const initialRegion = {
    latitude: initiaLocation ? initiaLocation.latitude : 32.01533845062779,
    longitude: initiaLocation ? initiaLocation.longitude : -6.557426233284457,
    latitudeDelta: 0.9,
    longitudeDelta: 0.8,
  };

  useEffect(() => {
    if (route.params) {
      setCoordinate({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  }, [route]);

  function setMarkHandler(event: MapPressEvent) {
    if (initiaLocation) return;
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setCoordinate({ latitude, longitude });
  }

  const saveMarkerHandler = useCallback(() => {
    if (!coordinate) {
      Alert.alert(
        "No Location Picked",
        "You have to pick a location by tapping on the map first!"
      );
      return;
    }
    navigation.navigate("newPlace", coordinate);
  }, [navigation, coordinate]);

  useLayoutEffect(() => {
    if (initiaLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconBtn
          name="save"
          color={tintColor}
          size={24}
          onPress={saveMarkerHandler}
        />
      ),
    });
  }, [navigation, saveMarkerHandler, initiaLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={setMarkHandler}
      >
        {coordinate && <Marker title="Pick Location" coordinate={coordinate} />}
      </MapView>
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
