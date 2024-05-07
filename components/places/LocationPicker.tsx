import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import PrimaryButton from "../ui/Button";
import { Colors } from "../../styles/colors";
import { verifyPermission } from "../../helper/verifyPermission";
import { enumFeature } from "../../types/enums";
import { getMapPreview } from "../../helper/location";
import { RootStackParamList } from "../../types/screens";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState({ lat: 0, lon: 0 });
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function getLocationHandler() {
    const hasPermission = await verifyPermission(
      locationPermissionInfo,
      requestPermission,
      enumFeature.LOCATION
    );
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("mapView", {
      ...pickedLocation,
    });
  }

  let locationPrev = <Text>No location picked yet!</Text>;

  if (pickedLocation.lat !== 0 && pickedLocation.lon !== 0) {
    locationPrev = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lon),
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
