import { StyleSheet, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";

import PrimaryButton from "../ui/Button";
import { Colors } from "../../styles/colors";
import { verifyPermission } from "../../helper/verifyPermission";
import { enumFeature } from "../../types/enums";

function LocationPicker() {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

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
    console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.prevLocation}></View>
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
});
