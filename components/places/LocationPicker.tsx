import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  LocationAccuracy,
  useForegroundPermissions,
} from "expo-location";
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import PrimaryButton from "../ui/Button";
import { Colors } from "../../styles/colors";
import { verifyPermission } from "../../helper/verifyPermission";
import { getMapPreview } from "../../helper/location";
import { enumFeature, RootStackParamList, TCoordinate } from "../../types";

function LocationPicker() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "newPlace">>();
  const [pickedLocation, setPickedLocation] = useState<TCoordinate>();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const coordinate = {
        latitude: route.params?.latitude,
        longitude: route.params?.longitude,
      };
      setPickedLocation(coordinate);
    }
  }, [route, isFocused]);

  async function getLocationHandler() {
    const hasPermission = await verifyPermission(
      locationPermissionInfo,
      requestPermission,
      enumFeature.LOCATION
    );
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });
    const latitude = location.coords.latitude!;
    const longitude = location.coords.longitude!;
    setPickedLocation({ latitude, longitude });
  }

  function pickOnMapHandler() {
    navigation.navigate("mapView");
  }

  let locationPrev = <Text>No location picked yet!</Text>;

  if (pickedLocation) {
    locationPrev = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.prevLocation}>{locationPrev}</View>
      <View style={styles.actions}>
        <PrimaryButton iconName="location" onPress={getLocationHandler}>
          Locate User
        </PrimaryButton>
        <PrimaryButton iconName="map" onPress={pickOnMapHandler}>
          Pick On Map
        </PrimaryButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  prevLocation: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
