import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
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
import {
  getMapPreview,
  removeStartKey,
  reverseGeoloacation,
} from "../../helper/location";
import { enumFeature, RootStackParamList, TCoordinate } from "../../types";

interface ILocationPickerProps {
  onPickLocation: (location: TCoordinate, address: string) => void;
}

function LocationPicker(props: ILocationPickerProps) {
  const { onPickLocation } = props;
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

  useEffect(() => {
    async function readebaleAddress() {
      try {
        const address = await reverseGeoloacation(pickedLocation!);
        const manipulateAddress = removeStartKey(address);
        onPickLocation(pickedLocation!, manipulateAddress);
      } catch (error) {}
    }

    if (pickedLocation) {
      readebaleAddress();
    }
  }, [pickedLocation, onPickLocation]);

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
        <PrimaryButton
          type="fit"
          iconName="location"
          onPress={getLocationHandler}
        >
          Locate User
        </PrimaryButton>
        <PrimaryButton type="fit" iconName="map" onPress={pickOnMapHandler}>
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
