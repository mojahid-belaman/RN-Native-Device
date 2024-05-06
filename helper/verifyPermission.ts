import { Alert } from "react-native";
import { PermissionResponse, PermissionStatus } from "expo-location";
import { enumFeature } from "../types/enums";

export async function verifyPermission(
  permissionInfo: PermissionResponse | null,
  requestPermission: () => Promise<PermissionResponse>,
  feature: enumFeature
) {
  if (permissionInfo?.status === PermissionStatus.UNDETERMINED) {
    const responsePermission = await requestPermission();
    return responsePermission.granted;
  }
  if (permissionInfo?.status === PermissionStatus.DENIED) {
    Alert.alert(
      "Insufficient Permission!",
      `You need to grant ${
        feature === enumFeature.LOCATION ? "location" : "camera"
      } permission to use this app.`
    );
    return false;
  }
  return true;
}
